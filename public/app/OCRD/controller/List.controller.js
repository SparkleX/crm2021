sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, Fragment, JSONModel) {
	"use strict";

	var theClass = Controller.extend("c1.app.OCRD.controller.List", {
		dataTable : "OCRD"
	});
	
	theClass.prototype.onInit=function() {
		var oData = [
			{
				_id : "World"
			}, {
			_id : "2"
			}
		];
		var oModel = new JSONModel("/api/Partner");
		this.getView().setModel(oModel);
	}
	return theClass;

});