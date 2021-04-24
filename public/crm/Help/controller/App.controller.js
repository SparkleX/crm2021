sap.ui.define(
	["sap/ui/core/mvc/Controller", 
	"sap/m/MessageToast", 
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"],
	function (Controller, MessageToast, Fragment, JSONModel) {
		"use strict";

		var theClass = Controller.extend("sap.nsme.crm.Help.controller.App", {});
		theClass.prototype.onInit = function () {
			var oView = this.getView();
			var data = {
				amount: 123.45,
				currency: "CNY"

			};
			var oModel = new JSONModel(data);
			oView.setModel(oModel);
		}
		return theClass;
	}
);
