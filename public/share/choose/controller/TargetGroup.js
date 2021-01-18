sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/core/Fragment", "sap/ui/model/json/JSONModel"],
	function (Controller, MessageToast, Fragment, JSONModel) {
		"use strict";
		var theClass = Controller.extend("sap.nsme.share.choose.controller.TargetGroup", {
			dataTable: "OCRD"
		});

		theClass.prototype.onOk = function (oEvent) {
			var aTokens = oEvent.getParameter("tokens");
			alert(aTokens[0].getKey());
			this._callback("VAL RETURN");
		};
		theClass.prototype.onValueHelpRequested = function () {
			alert('1');
		};
		theClass.prototype.onCancel = function () {
			this._dialog.close();
		};
		return theClass;
	}
);