sap.ui.define(
	["sap/ui/core/Fragment", "sap/ui/model/json/JSONModel", "sap/m/ColumnListItem", "sap/m/Label", "sap/m/Token"],
	function (Fragment, JSONModel, ColumnListItem, Label, Token) {
		"use strict";
		var theClass = {};
		theClass.show = function (name, view, callback) {
			const clazz = sap.ui.requireSync(`sap/nsme/share/choose/controller/${name}`);
			var controller = new clazz();
			//var oView = this.getView();
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: `${name}CFL`,
					name: `sap.nsme.share.choose.view.${name}`,
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
				var oRowModel = new JSONModel([
					{ id: 1, name: "A" },
					{ id: 2, name: "B" }
				]);
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
						oTable.bindAggregation("rows", "/");
					}

					if (oTable.bindItems) {
						oTable.bindAggregation("items", "/", function () {
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
				oToken.setKey("/id");
				oToken.setText("/name");
				oDialog.setTokens([oToken]);
				oDialog.open();
			});
		};
		return theClass;
	}
);
