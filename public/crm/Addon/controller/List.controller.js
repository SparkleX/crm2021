sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/nsme/share/utils/ControllerUtils",
		"sap/ui/core/mvc/OverrideExecution"
	],
	function (Controller, MessageToast, Fragment, JSONModel, ControllerUtils, OverrideExecution) {
		"use strict";

		var theClass = Controller.extend("sap.nsme.crm.Addon.controller.List", {
			metadata: {
				stereotype: "controller",
				methods: {
					onClick: { public: true, final: false, overrideExecution: OverrideExecution.Before }
				}
			}
		});

		theClass.prototype.onInit = function (evt) {
			alert("Base:onInit");
		};
		theClass.prototype.onTest = function (evt) {};
		theClass.prototype.onClick = function (evt) {
			alert("Base:onClick");
			this.onTest();
		};
		return theClass;
	}
);
