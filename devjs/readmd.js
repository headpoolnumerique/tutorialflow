const path = require('path')
const metadataParser = require('markdown-yaml-metadata-parser')
const fs = require('fs');
const mdFolder = './tutorials_md/';
const outputFolder = './tutorials_md/';
const outputFilename = "tuto_list.json";

let results = [];

function writeContent(callback) {
    console.log(results)
    fs.writeFile(outputFolder + outputFilename, "[" + results + "]", (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log(fs.readFileSync(outputFolder + outputFilename, "utf8"));
        }
    });
}

function readContent(callback) {
    fs.readdir(mdFolder, (err, files) => {
        files.forEach(file => {
            let content = fs.readFileSync(mdFolder + file, 'utf-8')
            const result = metadataParser(content);
            result.metadata.filename = file;
            results.push(JSON.stringify(result.metadata));
        })
        writeContent();
    });
}

readContent(function (err, content) {
    console.log(content)
})