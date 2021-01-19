sap.ui.define(
	[
		"sap/nsme/share/controller/BaseDetailController",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
	],
	function (Controller, MessageToast, Fragment, JSONModel) {
		"use strict";
		var theClass = Controller.extend("sap.nsme.crm.Campaign.controller.Detail", {
			dataTable: "OCRD"
		});
		theClass.prototype.onChoose = function (data) {
			alert(data);
		};
		theClass.prototype.onValueHelpRequested = function () {
			//alert('a');

			//var aCols = this.oColModel.getData().cols;

			/*this._oValueHelpDialog = sap.ui.xmlfragment("sap.nsme.share.choose.view.TargetGroup", this);
			this.getView().addDependent(this._oValueHelpDialog);

			this._oValueHelpDialog.getTableAsync().then(function (oTable) {*/
			/*oTable.setModel(this.oProductsModel);
				oTable.setModel(this.oColModel, "columns");

				if (oTable.bindRows) {
					oTable.bindAggregation("rows", "/ProductCollection");
				}

				if (oTable.bindItems) {
					oTable.bindAggregation("items", "/ProductCollection", function () {
						return new ColumnListItem({
							cells: aCols.map(function (column) {
								return new Label({ text: "{" + column.template + "}" });
							})
						});
					});
				}
				this._oValueHelpDialog.update();*/
			//}.bind(this));

			//this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
			//this._oValueHelpDialog.open();
			//ValueSelector.show("TargetGroup", this.getView(), this.onChoose);
			/*var controller =  new TargetGroup();
			var oView = this.getView();
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "sap.nsme.share.choose.view.TargetGroup",
					controller: controller
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					//oView.addDependent(oDialog);
					return oDialog;
				});
			}
			this.pDialog.then(function (oDialog) {
				oDialog.open();
			});*/
		};
		/*theClass.prototype.onInit = function () {
			var component = this.getOwnerComponent();
			var oRouter = component.getRouter();
			oRouter.getRoute("detail").attachMatched(function (oEvent) {
				this.dataId = oEvent.getParameter("arguments").id;
				if (this.dataId === "#") {
					//this.formMode = FormMode.addMode;
					//this.onInitData();
				} else {
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
			console.log(data);
			var json = JSON.stringify(data);
			jQuery.ajax({
				url: `/api/Partner?id=${this.dataId}`,
				method: "put",
				contentType: "application/json",
				data: json,
				success: function (data) {
					MessageToast.show("Successful");
				}
			});
		};
		theClass.prototype.onDelete = function () {
			jQuery.ajax({
				url: `/api/Partner/${this.dataId}`,
				method: "delete",
				success: function (data) {
					MessageToast.show("Deleted");
				}
			});
		};*/
		return theClass;
	}
);
