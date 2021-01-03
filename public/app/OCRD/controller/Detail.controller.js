
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",

], function (Controller, MessageToast, Fragment, JSONModel) {
	"use strict";
	var theClass = Controller.extend("c1.app.OCRD.controller.Detail", {
		dataTable: 'OCRD'
	});

	theClass.prototype.onInit = function () {
		var component = this.getOwnerComponent();
		var oRouter = component.getRouter();
		oRouter.getRoute("detail").attachMatched(function (oEvent) {
			this.dataId = oEvent.getParameter("arguments").id
			if (this.dataId === "#") {
				//this.formMode = FormMode.addMode;
				//this.onInitData();
			}
			else {
				//this.formMode = FormMode.viewMode;
				this.onLoadData(this.dataId);
			}
		}, this);


	};
	theClass.prototype.onLoadData = function (id) {
		var oModel = new JSONModel(`/api/Partner?id=${id}`);
		this.getView().setModel(oModel);
		this.getView().invalidate();
	};
	theClass.prototype.onSave = function () {
		var model = this.getView().getModel();
		var data = model.getData();
		console.log(data)
		var json = JSON.stringify(data)
		jQuery.ajax({
			url: `/api/Partner?id=${this.dataId}`,
			method: 'put',
			contentType: 'application/json',
			data: json,
			success: function (data) {
				MessageToast.show("Successful");
			}
		});
	};
	theClass.prototype.onDelete = function () {
		jQuery.ajax({
			url: `/api/Partner/${this.dataId}`,
			method: 'delete',
			success: function (data) {
				MessageToast.show("Deleted");
			}
		});
	}
	return theClass;
});