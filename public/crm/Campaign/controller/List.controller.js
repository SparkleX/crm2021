sap.ui.define(
	[
		"sap/nsme/share/controller/BaseListController",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
	],
	function (Controller, MessageToast, Fragment, JSONModel) {
		"use strict";

		var theClass = Controller.extend("sap.nsme.crm.Campaign.controller.List", {});

		return theClass;
	}
);
