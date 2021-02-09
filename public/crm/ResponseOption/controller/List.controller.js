sap.ui.define(
	[
		"sap/nsme/share/controller/BaseListController",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"../model/formatter"
	],
	function (Controller, MessageToast, Fragment, JSONModel, formatter) {
		"use strict";

		var theClass = Controller.extend("sap.nsme.crm.ResponseOption.controller.List", {
		});
		theClass.prototype.formatter = formatter;

		return theClass;
	}
);
