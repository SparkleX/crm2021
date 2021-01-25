sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/core/Fragment", "sap/ui/model/json/JSONModel", "sap/ui/core/UIComponent"],
	function (Controller, MessageToast, Fragment, JSONModel, UIComponent) {
		"use strict";

		var theClass = Controller.extend("sap.nsme.share.controller.BaseListController", {
			metadata: {
				properties: {}
			}
		});

		theClass.prototype.getTableName = function () {
			const ns = this.getMetadata().getNamespace();
			const name = ns.split(".")[3];
			return name;
		};

		theClass.prototype.onInit = function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.getRoute("list").attachPatternMatched(this._onObjectMatched, this);
		};
		theClass.prototype._onObjectMatched = function (oEvent) {
			this.refresh();
		};	
		theClass.prototype.refresh = function (oEvent) {
			const name = this.getTableName();
			var oModel = new JSONModel(`/api/${name}`);
			this.getView().setModel(oModel);
			oModel.refresh(true);
		};

		theClass.prototype.onClickNew = function (oEvent) {
			//var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//const id = oItem.getTitle();
			oRouter.navTo("detail", {
				id: "#"
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
		theClass.prototype.onToDetail = function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			const bindingPath = oItem.getRowAction().getRow().getBindingContext().getPath();
			const object = this.getView().getModel().getObject(bindingPath);
			const id = object.id;
			oRouter.navTo("detail", {
				id: id
			});
			//oRouter.navTo("detail");
		};

		return theClass;
	}
);
