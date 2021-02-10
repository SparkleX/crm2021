sap.ui.define(["sap/nsme/share/utils/AjaxUtils"], function (AjaxUtils) {
	"use strict";
	var theClass = {};
	theClass.cache = null;
	theClass.getMetadata = async function (table, id) {
		if (theClass.cache) {
			return theClass.cache;
		}
		theClass.cache = await AjaxUtils.get({ url: "/api/metadata" });
		theClass.cache.codeList = this.normalizeCodeList(theClass.cache.codeList);
		return theClass.cache;
	};
	theClass.getCodeListSync = function () {
		return theClass.cache.codeList;
	};
	theClass.normalizeCodeList = function (codeList) {
		for (var name in codeList) {
			var codes = codeList[name];
			codes.list = [];
			for (var key of codes.order) {
				codes.list.push({
					value: key,
					desc: codes.code[key]
				});
			}
		}
		return codeList;
	};
	theClass.getMetadataSync = function () {
		return theClass.cache;
	};
	theClass.getTableFieldSync = function (tableDotField) {
		const [table, field] = tableDotField.split(".");
		const metaField = theClass.cache.tables[table].fields[field];
		return metaField;
	};
	return theClass;
});
