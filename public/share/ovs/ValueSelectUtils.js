sap.ui.define(
	[
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/m/ColumnListItem",
		"sap/m/Label",
		"sap/m/Token",
		"sap/nsme/share/ovs/ValueSelectController",
		"sap/ui/comp/valuehelpdialog/ValueHelpDialog"
	],
	function (Fragment, JSONModel, ColumnListItem, Label, Token, ValueSelectController, ValueHelpDialog) {
		"use strict";
		var theClass = {};
		theClass.show = function (name, callback) {
			//const clazz = sap.ui.requireSync(`sap/nsme/share/choose/controller/${name}`);
			var controller = new ValueSelectController();
			//var oView = this.getView();

			var oDialog = new ValueHelpDialog({
				id :"OVS",
				filterMode :true,
				title: "Product",
				ok : controller.onOk.bind(controller),
				cancel: controller.onCancel.bind(controller),
				//afterClose: ".onValueHelpAfterClose",
				key :"id",
				descriptionKey : "name" ,
				//onValueHelpRequested: "onValueHelpRequested",
				supportMultiselect: false
			});
			controller._dialog = oDialog;
			controller._callback = callback;			
			console.debug(oDialog);

			var oRowModel = new JSONModel({
				data: [
					{ id: 1, name: "A" },
					{ id: 2, name: "B" }
				]
			});
			var oColModel = new JSONModel({
				cols: [
					{
						label: "ProductId",
						template: "id"
					},
					{
						label: "Product Name",
						template: "name"
					},
					{
						label: "Category",
						template: "id"
					}
				]
			});
			//var oTable = oDialog.getTable();
			oDialog.getTableAsync().then(function (oTable) {
				oTable.setModel(oRowModel);
				oTable.setModel(oColModel, "columns");

				if (oTable.bindRows) {
					oTable.bindAggregation("rows", "/data");
				}

				if (oTable.bindItems) {
					oTable.bindAggregation("items", "/data", function () {
						return new ColumnListItem({
							cells: aCols.map(function (column) {
								return new Label({ text: "{" + column.template + "}" });
							})
						});
					});
				}
				oDialog.update();
			});
			var oToken = new Token();
			oDialog.setTokens([oToken]);

			oDialog.open();

			/*if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: `OVS${name}`,
					name: `sap.nsme.share.ovs.ValueSelect`,
					controller: controller
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					//oView.addDependent(oDialog);
					controller._dialog = oDialog;
					controller._callback = callback;
					return oDialog;
				});
			}
			this.pDialog.then(function (oDialog) {
				var oRowModel = new JSONModel({
					data: [
						{ id: 1, name: "A" },
						{ id: 2, name: "B" }
					]
				});
				var oColModel = new JSONModel({
					cols: [
						{
							label: "ProductId",
							template: "id"
						},
						{
							label: "Product Name",
							template: "name"
						},
						{
							label: "Category",
							template: "id"
						}
					]
				});
				//var oTable = oDialog.getTable();
				oDialog.getTableAsync().then(function (oTable) {
					oTable.setModel(oRowModel);
					oTable.setModel(oColModel, "columns");

					if (oTable.bindRows) {
						oTable.bindAggregation("rows", "/data");
					}

					if (oTable.bindItems) {
						oTable.bindAggregation("items", "/data", function () {
							return new ColumnListItem({
								cells: aCols.map(function (column) {
									return new Label({ text: "{" + column.template + "}" });
								})
							});
						});
					}
					oDialog.update();
				});
				var oToken = new Token();
				oDialog.setTokens([oToken]);
				oDialog.open();
			});*/
		};
		return theClass;
	}
);
