/**
* Phantom JS onError Handler config to capture the Error and exit the process.
*/
phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
    });
  }
  console.log(msgStack.join('\n'));
  console.log('Seo build generation failed due to previous error.');
  phantom.exit(1);
};
/**
* Default parameters used inside the seo engine to fetch URL capturing.
*/
var CommandLineArgs = (function () {
    function CommandLineArgs() {
        this.isMobile = false;
        this.isDW = false;
        this.channel = "desktopweb";
        this.baseurl = 'localhost';
        this.port = '';
        this.contextPath = '';
        this.protocol = '';
        this.maxiterations = 5;
        this.destwebappdir = "./temp/spabot";
        this.sitemap = "sitemap.xml";
        this.configfile = "seo.json";
        this.cacheid = 0;
        this.buildtype = "war";
        this.isDebug = false;
    }
    return CommandLineArgs;
}());

var fs = require('fs');
var sys = require('system');
var args = sys.args;

/**
* This file usage where phantom JS installed
* phantomjs.exe seo.js, phantomjs.exe seo.js baseurl=10.10.17.50 port=9090
* phantomjs.exe --remote-debugger-port=9010 seo.js mobile=yes baseurl=10.10.17.50
*
* For any given URL page should be ready with data-ready attribute for body.
*
*/
var isDebug = args.indexOf("debug")>=0?true:false;
var cmdLineArgs = new CommandLineArgs();
if(isDebug) console.log('Reading initial properties:- ' + JSON.stringify(cmdLineArgs));

// Reading Command-line arguments
if (args.length > 1) {
    for (var i = 1; i < args.length; i++) {
        var subTokens = args[i].split("=");
        if (subTokens.length == 2) {
            cmdLineArgs[subTokens[0]] = subTokens[1];
        }
    }
}
// Highest preference goes to JSON config file.
if(fs.exists(cmdLineArgs.configfile)) {
    try{
        var configStr = fs.read(cmdLineArgs.configfile);
        var ob = JSON.parse(configStr);
        if(isDebug) console.log('Properties from json config file :- ' + JSON.stringify(ob));
        for (var p in ob)
            cmdLineArgs[p] = ob[p];
    }catch(e){
        throw new Error('Error while reading JSON file, please check the file : '+cmdLineArgs.configfile+' Msg: '+e);
    }
}else{
    throw new Error('Configfile is missing. Given configfile path is '+cmdLineArgs.configfile);
}
cmdLineArgs.isMobile = /mobile/i.test(cmdLineArgs.channel) || /both/i.test(cmdLineArgs.channel);
cmdLineArgs.isDW = /desktopweb/i.test(cmdLineArgs.channel) || /both/i.test(cmdLineArgs.channel);
if (/spabot$/.test(cmdLineArgs.destwebappdir) === false)
    cmdLineArgs.destwebappdir += '/temp/spabot';

if(isDebug)console.log('Final properties used for URL fetch:- ' + JSON.stringify(cmdLineArgs));

var sitemapContent = getSitemapContent();
var urls = [];
var webPage = require('webpage');
var page;
var captureIndex = 0, oldCacheId = 0;
var maxIterations = cmdLineArgs.maxiterations;
var mobileUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4';
var desktopUserAgent = 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36';

function startSEOProcess(){
    page = require('webpage').create();
    page.content = '<html><body>WELCOME TO SEO BUILD FOR SPA AND DESKTOPWEB !!!</body></html>';
    if(cmdLineArgs.isMobile){
        urls = fetchPages(true);// send mobile value as 'true' for Mobile channel
    }
    if(cmdLineArgs.isDW){
        var tempUrls = fetchPages(false);// send mobile value as 'false' for DesktopWeb channel
        urls = urls.concat(tempUrls);
    }
    if (urls.length > 0) {
        if(isDebug)console.log('----- cmdLineArgs.buildtype -----'+cmdLineArgs.buildtype);
        if("zip" === cmdLineArgs.buildtype) {
            var metaFile = 'meta.json',
                pathName = urls[0].pathName,
                lastChar = pathName[pathName.length -1];
            // Websphere giving slash whereas tomcat not providing
            if(lastChar !== '/') {
                metaFile = '/'+metaFile;
            }
            var metaJsonURL = urls[0].origin+pathName+metaFile;
            var metaPage = webPage.create();
            metaPage.onError = function(msg, trace) {
               console.log('PHANTOM ERROR: Page Error'+ msg);
                phantom.exit();
            };
            metaPage.onResourceError = function(resourceError) {
               console.log('PHANTOM ERROR: Resource fetch failed - '+ resourceError.url + ': ' + resourceError.errorString);
                phantom.exit();
            };
            metaPage.onConsoleMessage = function(msg) {
              console.log(msg);
            }
            metaPage.open(metaJsonURL, function (status) {
                if (status !== 'success') {
                    console.log('PHANTOM ERROR: Unable to fetch Meta Json. URL:: '+ metaJsonURL);
                    phantom.exit();
                } else {
                    if(isDebug)console.log(status+'----- metaJsonURL -----'+metaJsonURL);
                }
            });
            metaPage.onLoadFinished = function(status) {
                if("fail" === status ) {
                    console.log('PHANTOM ERROR: Failed to load Meta.json');
                    phantom.exit();
                }
                var result = metaPage.evaluate(function () {
                    try{
                        return document.getElementsByTagName('pre')[0].innerHTML;
                    }catch(err){
                        return "failed";
                    }
                });
                if("failed" === result){
                    console.log('PHANTOM ERROR: Failed to load Meta.json');
                    phantom.exit();
                }
                var metaJson = JSON.parse(result);
                oldCacheId = metaJson.appconfig.cacheId;
                metaPage.close();
                console.log('----- Started fecthing given URLS -----');
                capture(urls[captureIndex++]);
            };
        } else {
            console.log('----- Started fecthing given URLS -----');
            capture(urls[captureIndex++]);
        }
    }
    else {
        throw new Error('Exit without capturing, please check sitemap.xml for given urls or config file for channel property.');
    }
}
startSEOProcess();

/**
* Return sitemap content by reading the given sitemap.xml file.
*/
function getSitemapContent(){
    if (fs.exists(cmdLineArgs.sitemap)) {
        return fs.read(cmdLineArgs.sitemap);
    } else {
        throw new Error('sitemap.xml is missing. Given sitemap path is '+cmdLineArgs.sitemap);
    }
}

function fetchPages(isMobile){
    var result = page.evaluate(getURLs, sitemapContent, cmdLineArgs.baseurl, cmdLineArgs.port, isMobile, cmdLineArgs.contextPath,cmdLineArgs.protocol, cmdLineArgs.isDebug);
    if(cmdLineArgs.isDebug) console.log(result);
    return JSON.parse(result);
}

function getURLs(str, newHost, port, isMobile, contextPath, protocol, isDebug) {
    if(isDebug) console.log(str);
    var d = document.createElement('div');
    d.innerHTML = str;
    var loc = d.querySelectorAll('loc');
    var r = '';
    var ar = [];
    var a = document.createElement('a');
    for (var i = 0; i < loc.length; i++) {
        a.href = loc[i].textContent;
        if (!/undefined/.test(newHost))
            a.hostname = newHost;
        if (!/undefined/.test(port) && port != '')
            a.port = port;
        if (!/undefined/.test(contextPath) && contextPath != '')
            a.pathname = contextPath;
        if (!/undefined/.test(protocol) && protocol != '')
            a.protocol = protocol;
        var relativePath;
        if (a.search)
            relativePath = a.search.replace(/[&, ,=]/g, '_').substr(1);
        else
            relativePath = a.hash.substr(2);
        if (isMobile)
            relativePath = 'mobile_' + relativePath;
        else
            relativePath = 'desktop_' + relativePath;
        relativePath += '.html';
        var ob = {
            host: a.host,
            port: a.port,
            hostName: a.hostname,
            pathName: a.pathname,
            protocol: a.protocol,
            search: a.search,
            href: a.href,
            origin: a.origin,
            fsPath: relativePath,
            isMobile: isMobile
        };
        ar.push(ob);
    }
    return JSON.stringify(ar);
}

function capture(url, isMobile) {
    if(isDebug) console.log('CAPTURE STARTED');
    page.viewportSize = { width: 1280, height: 768 };
    var modifiedURL = url.href;
    console.log(modifiedURL);
    page.settings.userAgent = url.isMobile ? mobileUserAgent : desktopUserAgent;
    page.open(modifiedURL, function (status) {
        if (status !== 'success') {
           throw new Error('Unable to fetch the url '+ modifiedURL);
        }
        else {
            setTimeout(onTimer, 1000, page);
        }
    });
};

function onTimer(page) {
    var currentURL = urls[captureIndex - 1];
    if(maxIterations == cmdLineArgs.maxiterations){
        var msg = currentURL.isMobile?'Mobile':'DesktopWeb';
        console.log('Started capturing the URL: ' + currentURL.href +' for '+msg+' Channel');
    }else{
        if(cmdLineArgs.isDebug) console.log('Retrying the above URL for proper data fetch');
    }
    maxIterations--;
    if (maxIterations < 0) {
        throw new Error('Unable to fetch the page with proper data. Reached maximum no of iterations. \nPlease check URL - '+currentURL.href);
    }
    var result = page.evaluate(function () {
        if (document.body.getAttribute('data-ready'))
            return 1;
    });
    if (!result) {
        setTimeout(onTimer, 2000, page);
        return;
    }
    var pagecontent = page.content;
    if("zip" === cmdLineArgs.buildtype){
        console.log("Replacing cacheid : " +  oldCacheId +" - > "+cmdLineArgs.cacheid);
        pagecontent = pagecontent.replace(new RegExp(oldCacheId ,'g'), cmdLineArgs.cacheid);
    }
    if(isDebug) console.log(cmdLineArgs.destwebappdir + '/' + urls[captureIndex - 1].fsPath );
    fs.write(cmdLineArgs.destwebappdir + '/' + urls[captureIndex - 1].fsPath, pagecontent , 'w');
    if (captureIndex === urls.length) {
        console.log('Completed capturing given URLs. Seo build generation Succeeded.');
        phantom.exit(0);
        return;
    }
    openNextPage(page, urls[captureIndex++]);
}

function openNextPage(page, url) {
    maxIterations = cmdLineArgs.maxiterations;
    page.evaluate(function (src) {
        window.location.href = src;
    }, url.href);
    setTimeout(onTimer, 5000, page);
};