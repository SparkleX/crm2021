sap.ui.define(["sap/nsme/share/utils/AjaxUtils"], function (AjaxUtils) {
	"use strict";
	var theClass = {};
	theClass.cache = null;
	theClass.getMetadata = async function (table, id) {
		if(theClass.cache) {
			return theClass.cache;
		}
		theClass.cache = await AjaxUtils.get({url:"/api/metadata"});
		return theClass.cache;
	};
	theClass.getCodeListSync = function (codelist) {
		return theClass.cache.codeList;
	}	
	return theClass;
});
