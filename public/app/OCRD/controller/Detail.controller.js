sap.ui.define([
	"c1/core/controller/BaseDetailController",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"
], function (BaseDetailController, MessageToast, Fragment, JSONModel) {
	"use strict";
	var theClass =BaseDetailController.extend("c1.app.OCRD.controller.Detail", {
		dataTable:'OCRD'
	});

	theClass.prototype.onInit=function() {
		BaseDetailController.prototype.onInit.call(this);
	}
	

	return theClass;
});