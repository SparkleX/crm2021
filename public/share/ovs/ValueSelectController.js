sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/core/Fragment", "sap/ui/model/json/JSONModel"],
	function (Controller, MessageToast, Fragment, JSONModel) {
		"use strict";
		var theClass = Controller.extend("sap.nsme.share.choose.ValueSelectController", {});

		theClass.prototype.onOk = function (oEvent) {
			var aTokens = oEvent.getParameter("tokens");
			//var token = aTokens[0];
			//var ret = { key: token.getKey(), text: token.getText() };
			this._callback(aTokens);
			this._dialog.close();
			this._dialog.destroy();
		};
		theClass.prototype.onCancel = function () {
			this._dialog.close();
			this._dialog.destroy();
		};
		return theClass;
	}
);
