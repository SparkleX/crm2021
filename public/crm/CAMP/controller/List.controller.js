sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/core/Fragment", "sap/ui/model/json/JSONModel"],
	function (Controller, MessageToast, Fragment, JSONModel) {
		"use strict";

		var theClass = Controller.extend("sap.sme.crm.CAMP.controller.List", {
			dataTable: "OCRD"
		});

		theClass.prototype.onInit = function () {
			var oModel = new JSONModel("/api/Partner");
			this.getView().setModel(oModel);
		};
		theClass.prototype.onNew = function (oEvent) {
			//var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//const id = oItem.getTitle();
			oRouter.navTo("detail", {
				id: "NULL"
			});
		};		
		theClass.prototype.onListItemPress = function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			const id = oItem.getTitle();
			oRouter.navTo("detail", {
				id: id
			});
			//oRouter.navTo("detail");
		};

		return theClass;
	}
);
