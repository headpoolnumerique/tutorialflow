const path = require('path')
const metadataParser = require('markdown-yaml-metadata-parser')
const fs = require('fs');
const mdFolder = '../tutorials_md/';
let results = [];

function writeContent(callback) {
    console.log(results)
    fs.writeFile("out.json", "[" + results + "]", (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log(fs.readFileSync("out.json", "utf8"));
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