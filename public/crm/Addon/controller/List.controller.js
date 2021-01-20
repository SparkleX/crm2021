sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/nsme/share/utils/ControllerUtils",
	],
	function (Controller, MessageToast, Fragment, JSONModel, ControllerUtils) {
		"use strict";

		var theClass = Controller.extend("sap.nsme.crm.Addon.controller.List", {});

		theClass.prototype.onInit = function (evt) {
	
		};

		return theClass;
	}
);
