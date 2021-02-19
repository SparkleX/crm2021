sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/viz/ui5/format/ChartFormatter",
		"sap/viz/ui5/controls/common/feeds/FeedItem",
		"sap/nsme/share/utils/AjaxUtils",
		"sap/nsme/crm/HelpView/model/formatter",
	],
	function (Controller, MessageToast, Fragment, JSONModel, ChartFormatter, FeedItem, AjaxUtils, formatter) {
		"use strict";

		var theClass = Controller.extend("sap.nsme.crm.HelpView.controller.List", {
			formatter: formatter
		});
		theClass.prototype.onInit = async function (evt) {
			const oModel = {
				Balance: 8,
				CreditLine: 10
			};
			this.getView().setModel(new JSONModel(oModel));
			const page = this.byId("page");
			console.debug(page);
			

			const x = await Fragment.load({
				name: "sap.nsme.crm.HelpView.view.Test",
				controller: this,
				containingView: this.getView()
			});
			page.addContent(x[0]);
			page.addContent(x[1]);
		};
		theClass.prototype.onPress = function (evt) {
			alert('1');
		};
		return theClass;
	}
);
