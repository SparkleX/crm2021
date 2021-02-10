sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/UIComponent",
		"sap/base/util/deepExtend",
		"sap/nsme/share/utils/ViewApi",
		"sap/nsme/share/widget/Text",
		"sap/suite/ui/commons/MicroProcessFlowItem"
	],
	function (Controller, MessageToast, Fragment, JSONModel, UIComponent, deepExtend, ViewApi, Text, MicroProcessFlowItem) {
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

		theClass.prototype.onInit = async function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.getRoute("list").attachPatternMatched(this._onObjectMatched, this);
			const that = this;
			jQuery.ajax({
				url: "/api/codes",
				success: function (data) {
					const oCodesModel = new JSONModel(data);
					that.getView().setModel(oCodesModel, "codes");
				}
			});	
			const tableName = this.getTableName();
			var oFilterBar = this.getView().byId("sysFilterBar");
			var json = await ViewApi.getListView(tableName);
			for(var filter of json.filterItems) {
				var oFilter = new sap.ui.comp.filterbar.FilterItem(filter);
				oFilterBar.addFilterItem(oFilter);
			}
			var oTable = this.getView().byId("sysTable");
			for(var col of json.columns) {
				var column = new sap.ui.table.Column(col);
				oTable.addColumn(column);
			}
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
		theClass.prototype.onOK = async function (evt) {
			//alert(1);
			const a = this.oPersonalizationDialog.getModel().getData();
			console.debug(a);
		};
		theClass.prototype.onCancel = async function (evt) {
			evt.getSource().close();
		};
		theClass.prototype.onSettings = async function (evt) {
			var oView = this.getView();
			var oJSONModel = new JSONModel("/web/share/dialog/Personalization.json");
			var oPersonalizationDialog = await Fragment.load({
				id: oView.getId(),
				name: "sap.nsme.share.dialog.Personalization",
				controller: this
			});

			oView.addDependent(oPersonalizationDialog);
			oPersonalizationDialog.setModel(oJSONModel);
			//this.oJSONModel.setProperty("/ShowResetEnabled", this._isChangedColumnsItems());
			//this.oDataBeforeOpen = deepExtend({}, this.oJSONModel.getData());
			oPersonalizationDialog.open();
			this.oPersonalizationDialog = oPersonalizationDialog;
			/*if (!this._pPersonalizationDialog){
				this._pPersonalizationDialog = Fragment.load({
					id: oView.getId(),
					name: "sap.nsme.share.dialog.Personalization",
					controller: this
				}).then(function(oPersonalizationDialog){
					oView.addDependent(oPersonalizationDialog);
					oPersonalizationDialog.setModel(this.oJSONModel);
					return oPersonalizationDialog;
				}.bind(this));
			}
			this._pPersonalizationDialog.then(function(oPersonalizationDialog){
				//this.oJSONModel.setProperty("/ShowResetEnabled", this._isChangedColumnsItems());
				//this.oDataBeforeOpen = deepExtend({}, this.oJSONModel.getData());
				oPersonalizationDialog.open();
			}.bind(this));*/
		};
		return theClass;
	}
);
