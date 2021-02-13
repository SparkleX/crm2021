sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
	"use strict";
	var theClass = {};

	theClass.get = async function (param) {
		param.method = "get";
		const rt = this.ajax(param);
		return rt;
	};	
	theClass.post = async function (param) {
		param.method = "post";
		const rt = this.ajax(param);
		return rt;
	};
	theClass.ajax = async function (param) {
		param.contentType = "application/json";
		param.processData = false;
		param.data = JSON.stringify(param.data);
		var response = await jQuery.ajax(param);
		return response;
	};
	return theClass;
});
