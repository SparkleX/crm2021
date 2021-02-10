sap.ui.define(["./AjaxUtils"], function (AjaxUtils) {
	"use strict";
	var theClass = {};

	theClass.getListView = async function (viewName) {
		const param = {};
		param.url = "/api/view/list/" + viewName;
		const rt = await AjaxUtils.get(param);
		return rt;
	};	
	return theClass;
});
