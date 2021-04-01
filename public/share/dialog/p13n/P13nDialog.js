sap.ui.define(
	[
		"sap/ui/base/Object",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/base/util/deepClone"
	],
	function (BaseClass, MessageToast, Fragment, JSONModel, deepClone) {
		"use strict";
		var theClass = BaseClass.extend("sap.nsme.share.dialog.p13n.P13nDialog", {});

		theClass.prototype.open = async function (settings) {
			var oView = settings.view;
			this.settings = settings;
			this.settings.dataCopy = deepClone(this.settings.data);
			const oJSON = new JSONModel(settings.data);
			if (!this.oDialog) {
				this.oDialog = await Fragment.load({
					id: oView.getId(),
					name: "sap.nsme.share.dialog.p13n.view.Personalization",
					controller: this
				});
				this.oDialog.setModel(oJSON);
				oView.addDependent(this.oDialog);
				//this.oJSONModel.setProperty("/ShowResetEnabled", this._isChangedColumnsItems());
				//this.oDataBeforeOpen = deepExtend({}, this.oJSONModel.getData());
				this.oDialog.open();
			}
		};
		theClass.prototype.onOK = function (oEvent) {
			const oModel = this.oDialog.getModel();
			const json = oModel.getData();
			console.debug(json);
			this.settings.onOk(json);
			this.oDialog.close();
		};
		theClass.prototype.onCancel = function (oEvent) {
			this.oDialog.close();
		};
		theClass.prototype.onReset = function (oEvent) {
			const oModel = this.oDialog.getModel();
			this.settings.data = deepClone(this.settings.dataCopy);
			this.settings.data.showResetEnabled = false;
			oModel.setProperty("/", this.settings.data);
		};
		theClass.prototype.onChangeColumnsItems = function (oEvent) {
			//this.oJSONModel.setProperty("/ColumnsItems", oEvent.getParameter("items"));
			//this.oJSONModel.setProperty("/ShowResetEnabled", this._isChangedColumnsItems());
		};
		theClass.prototype.test = async function (view, onOk) {
			const json = {
				showResetEnabled: true,
				items: [
					{
						columnKey: "productId",
						text: "Product ID"
					},
					{
						columnKey: "name",
						text: "Name"
					},
					{
						columnKey: "category",
						text: "Category"
					},
					{
						columnKey: "supplierName",
						text: "Supplier Name"
					}
				],
				// Runtime data
				columnsItems: [
					{
						columnKey: "name",
						visible: true,
						index: 0
					},
					{
						columnKey: "category",
						visible: true,
						index: 1
					},
					{
						columnKey: "productId",
						visible: false
					},
					{
						columnKey: "supplierName",
						visible: false
					}
				]
			};
			const settings = {};
			settings.view = view;
			settings.data = json;
			this.open(settings);
		};

		return theClass;
	}
);
