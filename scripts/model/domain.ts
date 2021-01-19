import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import * as jsonfile from "jsonfile";
import { default as convertType } from "./convertType";
const template = require("./domain.handlebars");

const jsonTableFolder = "resources/table";
const outputFolder = "src/gen/model";

export function start(): void {
	//const source = fs.readFileSync(`${__dirname}/domain.handlebars`, "utf8");
	//const template = handlebars.compile(source);
	handlebars.registerHelper("convertType", convertType);

	const files = glob.sync(`${jsonTableFolder}/*.table.json`);
	fs.mkdirSync(outputFolder, { recursive: true });
	for (const file of files) {
		const json = jsonfile.readFileSync(file);
		const outputFile = `${outputFolder}/${json.name}Model.ts`;
		/*const masterTable = oMasterTemplate.getMasterTable(json.name);
		if (masterTable) {
			continue;
		}*/
		console.debug(`${file} ==> ${outputFile}`);
		//json.templates = oMasterTemplate.getTemplateTables(json.name);

		const sourceCode = template(json);
		fs.writeFileSync(outputFile, sourceCode);
	}
}
