import puppeteer from 'puppeteer';
import  fs from 'fs-extra';
/**
 * @param isMobile type boolean used to generate pages only for mobile platform
 * @param isDW type boolean used to generate pages only for DW platform
 * @param channel by default we support for desktopweb
 * @param baseurl need to specify our domain in seo config file, by default it points to localhost
 * @param port optional parameter need to specify if needed
 * @param param maxiterations default points to 5, refers to max attempts for retry to capture pages
 * @param destwebappdir result folder path, by detfault points to current directory
 * @param sitemap needs to be valid path to sitemap.xml
 * @param configfile need to be valid path to Seo Config file.
 * @param cacheId in case of buildtype zip chache id need to provided
 * @param buildtype as part of implemention buildtype zip is supported
 * @param isDebug enable for console statements
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
        this.buildtype = "zip";
        this.isDebug = true;
    }
    return CommandLineArgs;
}());


var sitemapContent = null;
var urls = [];
var browser = null;
var completionflag = 0;
var captureIndex = 0, oldCacheId = 0;
var mobileUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4';
var desktopUserAgent = 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36';
var cmdLineArgs = new CommandLineArgs();
    
var isDebug  = true;

/**
 * 
 * @param {*} args any custom args need to be passed here
 * This method involes Seo Process
 */
async function startSEOProcess(args) {

    var argKeys = Object.keys(args);
    if (isDebug) console.log('Reading initial properties:- ' + JSON.stringify(cmdLineArgs));

    // Reading Command-line arguments
    if (argKeys.length > 1) {
        for (var i = 1; i < argKeys.length; i++) {
             cmdLineArgs[argKeys[i]] = args[argKeys[i]];
        }
    }

    // Highest preference goes to JSON config file.
    if (fs.existsSync(cmdLineArgs.configfile)) {
        try {
            var configStr = fs.readFileSync(cmdLineArgs.configfile);
            var ob = JSON.parse(configStr);
            if (isDebug) console.log('Properties from json config file :- ' + JSON.stringify(ob));
            for (var p in ob)
                cmdLineArgs[p] = ob[p];
        } catch (e) {
            throw new Error('Error while reading JSON file, please check the file : ' + cmdLineArgs.configfile + ' Msg: ' + e);
        }
    } else {
        throw new Error('Configfile is missing. Given configfile path is ' + cmdLineArgs.configfile);
    }

    cmdLineArgs.isMobile = /mobile/i.test(cmdLineArgs.channel) || /both/i.test(cmdLineArgs.channel);
    cmdLineArgs.isDW = /desktopweb/i.test(cmdLineArgs.channel) || /both/i.test(cmdLineArgs.channel);
    if (/spabot$/.test(cmdLineArgs.destwebappdir) === false) {
        cmdLineArgs.destwebappdir += '/temp/spabot';
    }
    console.log(cmdLineArgs.destwebappdir);

    if (!fs.existsSync(cmdLineArgs.destwebappdir)) {
        fs.mkdirSync(cmdLineArgs.destwebappdir, { recursive: true });
    }

    sitemapContent = getSitemapContent();


    browser = await puppeteer.launch({
        headless: true
    });
    var mpage = await browser.newPage();
    var dpage = await browser.newPage();
    var metapage = await browser.newPage();

    mpage.on('error', onError);
    mpage.once('response', onResponse);
    dpage.on('error', onError);
    dpage.once('response', onResponse);
    metapage.on('error', onError);
    metapage.once('response', onResponse);

    await mpage.setContent('<html><body>WELCOME TO SEO BUILD FOR SPA AND DESKTOPWEB !!!</body></html>');
    await dpage.setContent('<html><body>WELCOME TO SEO BUILD FOR SPA AND DESKTOPWEB !!!</body></html>');

    if (cmdLineArgs.buildtype === 'zip') {
        await fetchPages(true, metapage).then(fetchCacheId.bind(null, metapage)).catch(onError);
    }
    if (cmdLineArgs.isMobile) {
        await fetchPages(true, mpage).then(capture.bind(null, mpage)).catch(onError);// send mobile value as 'true' for Mobile channel
    }
    if (cmdLineArgs.isDW) {
        await fetchPages(false, dpage).then(capture.bind(null, dpage)).catch(onError);// send mobile value as 'false' for DesktopWeb channel
    }
}

function onError(errMsg, trace) {
    var msgStack = ['puppeteer ERROR: ' + errMsg];
    console.log(msgStack.join('\n'));
    console.log('Seo build generation failed due to previous error.');
    browser.close();
}

function onResponse(res) {
    if (res.ok()) {
        console.log("URL sucessfully validated status code: " + res.status());
    } else {
        browser.close();
        throw new error("Request failed for URL: " + res.url());
    }
}

// reads site map file and get all its data
function getSitemapContent() {
    if (fs.existsSync(cmdLineArgs.sitemap)) {
        return fs.readFileSync(cmdLineArgs.sitemap, 'utf8');
    } else {
        browser.close();
        throw new Error('sitemap.xml is missing. Given sitemap path is ' + cmdLineArgs.sitemap);
    }
}

// evaluate pages for all the urls present under site map content
async function fetchPages(isMobile, page) {
    var result = await page.evaluate(await getURLs, sitemapContent, cmdLineArgs.baseurl, cmdLineArgs.port, isMobile, cmdLineArgs.contextPath, cmdLineArgs.protocol, cmdLineArgs.isDebug);
    if (cmdLineArgs.isDebug) console.log(result);
    return JSON.parse(result);
}

// get url function works to return proper url and override if any custom property passed
async function getURLs(str, newHost, port, isMobile, contextPath, protocol, isDebug) {
    if (isDebug) console.log(str);
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

// Captures all pages and create a static html content place holders
async function capture(page, urlObj) {// url
    var modifiedURL = '', useragent = '';
    if (urlObj.length > 0) {
        urlObj.captureIndex = 0;
        urlObj.maxiterations = cmdLineArgs.maxiterations;
        await page.setViewport({ width: 1280, height: 768, isMobile: urlObj[urlObj.captureIndex].isMobile })// isMobile param to be passed
        modifiedURL = urlObj[urlObj.captureIndex].href;
        console.log(modifiedURL);
        useragent = urlObj[urlObj.captureIndex].isMobile ? mobileUserAgent : desktopUserAgent;
        await page.setUserAgent
        await page.goto(modifiedURL);
        setTimeout(generateSnapshot, 1000, urlObj, page);
    }
}

//For all captured pages snapshots are generated
async function generateSnapshot(urlObj, page) {
    var currentURL = urlObj[urlObj.captureIndex++];
    if (urlObj.maxiterations === cmdLineArgs.maxiterations) {
        var msg = currentURL.isMobile ? 'Mobile' : 'DesktopWeb';
        console.log('Started capturing the URL: ' + currentURL.href + ' for ' + msg + ' Channel');
    } else {
        if (cmdLineArgs.isDebug) console.log('Retrying the above URL for proper data fetch');
    }
    urlObj.maxiterations--;
    if (urlObj.maxiterations < 0) {
        browser.close();
        throw new Error('Unable to fetch the page with proper data. Reached maximum no of iterations. \nPlease check URL - ' + currentURL.href);
    }
    var result = await page.evaluate(function () {
        if (document.body.getAttribute('data-ready'))
            return 1;
    });
    if (!result) {
        urlObj.captureIndex -= 1;
        setTimeout(generateSnapshot, 2000, urlObj, page);
        return;
    }
    await page.content().then(function (pagecontent) {
        if ("zip" === cmdLineArgs.buildtype) {
            console.log("Replacing cacheid : " + oldCacheId + " - > " + cmdLineArgs.cacheid);
            pagecontent = pagecontent.replace(new RegExp(oldCacheId, 'g'), cmdLineArgs.cacheid);
        }
        if (isDebug) console.log(cmdLineArgs.destwebappdir + '/' + urlObj[urlObj.captureIndex - 1].fsPath);
        fs.writeFileSync(cmdLineArgs.destwebappdir + '/' + urlObj[urlObj.captureIndex - 1].fsPath, pagecontent, { encoding: 'utf8', flag: 'w' });
    });
    openNextPage(urlObj, page);
}


async function openNextPage(urlObj, page) {
    urlObj.maxiterations = cmdLineArgs.maxiterations;
    if (urlObj.captureIndex === urlObj.length) {
        completionflag++;
        console.log('Completed capturing given URLs. Seo build generation Succeeded.');
        if (cmdLineArgs.channel === 'both' && completionflag === 1) {
            return;
        }
        browser.close();
        return;
    }
    await page.evaluate(function (src) {
        window.location.href = src;
    }, urlObj[urlObj.captureIndex].href);
    setTimeout(generateSnapshot, 5000, urlObj, page);
}

//fetches cache id from meta file
async function fetchCacheId(page, urlObj) {
    if (urlObj.length > 0) {
        var metaFile = 'meta.json',
            pathName = urlObj[0].pathName,
            lastChar = pathName[pathName.length - 1];
        if (lastChar !== '/') {
            metaFile = '/' + metaFile;
        }
        var metaJsonURL = urlObj[0].origin + pathName + metaFile;
        page.on('load', capturemetapage.bind(null, page));
        console.log('started capturing meta.json file to get appConfig');
        await page.goto(metaJsonURL);
    }
}

//fetches meta page for give url
async function capturemetapage(page) {
    oldCacheId = await page.evaluate(function () {
        try {
            var data = document.getElementsByTagName('pre')[0].innerHTML;
            var metaJson = JSON.parse(data);
            oldCacheId = metaJson.appconfig.cacheId;
            return oldCacheId
        } catch (err) {
            return "failed";
        }
    });
}

export {startSEOProcess};