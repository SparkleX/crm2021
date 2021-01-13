sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/nsme/share/utils/ControllerUtils"
	],
	function (Controller, MessageToast, Fragment, JSONModel, ControllerUtils) {
		"use strict";

		var theClass = Controller.extend("sap.sme.crm.CAMP.controller.List", {});

		theClass.prototype.onInit = function () {
			var oModel = new JSONModel("/api/Partner");
			this.getView().setModel(oModel);
		};
		theClass.prototype.onClickNew = function (oEvent) {
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
