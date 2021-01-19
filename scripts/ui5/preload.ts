import * as glob from "glob";
import * as fs from "fs";
import * as UglifyJS from "uglify-js";

const files = glob.sync(`public/crm/Campaign/**/*.*`);
const content = {};


for (const file of files) {
    const scripts = fs.readFileSync(file);
    const shortName = file.substr("public/".length);
    let text = scripts.toString();
    if (file.endsWith(".js")) {
        text = UglifyJS.minify(text).code;
    }
    content[`sap/nsme/${shortName}`] = text;
}

const json = {
    "version": "2.0",
    "name": "sap/nsme/crm/Campaign/Component-preload",
    "modules": content
};
const output = `jQuery.sap.registerPreloadedModules(${JSON.stringify(json)})`;

fs.writeFileSync("Component-preload.js", output);