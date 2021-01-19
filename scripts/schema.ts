import * as fs from "fs";
import * as path from "path";
import { compile } from "json-schema-to-typescript";
import * as jsonfile from "jsonfile";
import { default as camelCase } from "camelcase";
import * as glob from "glob";

console.log("generate schema");
const inputSchemaFolder = "resources/schema";
const outputSchemaFolder = "src/gen/schema";

export async function generateSchema(): Promise<void> {
	const files = glob.sync(`${inputSchemaFolder}/**/index.json`);
	for (const filename of files) {
		console.debug(filename);
		const pasedPath = path.parse(filename);
		try {
			await generateSchemaFile(filename);
		} catch (error) {
			console.error(filename);
			console.error(error);
			throw error;
		}
	}
}

async function generateSchemaFile(shcmeaFile: string) {
	const schemaDirname = path.dirname(shcmeaFile);
	const schema = jsonfile.readFileSync(shcmeaFile);
	const extension = path.extname(shcmeaFile);
	const basename = path.basename(shcmeaFile, extension);
	let tsFilename = basename;
	if (schema.title !== undefined) {
		tsFilename = schema.title;
	}
	tsFilename = camelCase(tsFilename, { pascalCase: true });
	const script = await compile(schema, tsFilename, {
		cwd: schemaDirname,
		bannerComment:
			"/* eslint-disable prettier/prettier */\n/* tslint:disable */\n/* Generated, DO NOT MODIFY BY HAND */\n",
		style: {
			useTabs: true
		}
	});
	fs.mkdirSync(outputSchemaFolder, { recursive: true });
	fs.writeFileSync(`${outputSchemaFolder}/${tsFilename}.ts`, script);
}
generateSchema();
