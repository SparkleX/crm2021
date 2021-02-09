sap.ui.define(
	[
		"sap/nsme/share/controller/BaseDetailController",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel"
	],
	function (Controller, MessageToast, Fragment, JSONModel) {
		"use strict";
		var theClass = Controller.extend("sap.nsme.crm.ResponseOption.controller.Detail", {
			dataTable: "OCRD"
		});
		theClass.prototype.onChoose = function (data) {
			console.debug("1");
		};
		return theClass;
	}
);
