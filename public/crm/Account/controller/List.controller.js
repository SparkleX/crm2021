sap.ui.define(
	[
		"sap/nsme/share/controller/BaseListController",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/nsme/share/utils/ControllerUtils"
	],
	function (Controller, MessageToast, Fragment, JSONModel, ControllerUtils) {
		"use strict";

		var theClass = Controller.extend("sap.nsme.crm.Account.controller.List", {});

		return theClass;
	}
);
