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
		theClass.show = function (param) {
			//const clazz = sap.ui.requireSync(`sap/nsme/share/choose/controller/${name}`);
			var controller = new ValueSelectController();
			//var oView = this.getView();

			var oDialog = new ValueHelpDialog({
				id: "OVS",
				filterMode: true,
				title: param.object,
				ok: controller.onOk.bind(controller),
				cancel: controller.onCancel.bind(controller),
				//afterClose: ".onValueHelpAfterClose",
				key: "id",
				descriptionKey: "name",
				//onValueHelpRequested: "onValueHelpRequested",
				supportMultiselect: param.multiselect,
				tokenDisplayBehaviour: "descriptionOnly"
			});
			controller._dialog = oDialog;
			controller._callback = param.choose;

			var oRowModel = new JSONModel(`/api/ovs/data/${param.object}`);
			var oColModel = new JSONModel(`/api/ovs/metadata/${param.object}`);
			var oTable = oDialog.getTable();
			oTable.setModel(oRowModel);
			oTable.setModel(oColModel, "columns");

			if (oTable.bindRows) {
				oTable.bindAggregation("rows", "/");
			}

			/*if (oTable.bindItems) {
				oTable.bindAggregation("items", "/", function () {
					return new ColumnListItem({
						cells: aCols.map(function (column) {
							return new Label({ text: "{" + column.template + "}" });
						})
					});
				});
			}*/
			var oToken = new Token({
				key: "11eb5bbe-042b-42f0-9be9-ff4cf8ec5831",
				text: "HP"
			});
			oDialog.setTokens([oToken]);
			oDialog.open();
		};
		return theClass;
	}
);
