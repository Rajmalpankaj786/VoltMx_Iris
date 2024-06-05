#!/usr/bin/env node

if (process.argv.length != 4) {
    console.log("Usage: node IEJSTransform.js <INFILE> <OUTFILE>");
    process.exit(-1);
}

var fs = require('fs');

fs.readFile(process.argv[2], 'utf8', function (err, data) {
    if (err) throw err;

    //data = data.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, '');

    var jsp = require('./parse-js'), pro = require('./process');

    //console.log(JSON.stringify(jsp.parse(data, false, true), {beautify: true}));
    var out = pro.gen_code(jsp.parse(data, false, true), {beautify: true});
    fs.writeFile(process.argv[3], out, function (err) {
        if (err) throw err;
    });
});
