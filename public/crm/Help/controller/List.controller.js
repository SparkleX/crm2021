sap.ui.define(
	[
		"sap/nsme/share/base/BaseListController",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
	],
	function (Controller, MessageToast, Fragment, JSONModel) {
		"use strict";

		var theClass = Controller.extend("sap.nsme.crm.Help.controller.List", {});
		theClass.prototype.onLoadData = async function () {
			var oView = this.getView();
			var oModel = oView.getModel();
			var data = [ {
				id: 1,
				col1: 1,
				col2: "Abc"
			},{
				id: 2,
				col1: 2,
				col2: "Xyz"
			},
			];
			oModel.setData(data);
			oModel.refresh();

		};
		return theClass;
	}
);
