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
		"sap/nsme/share/dialog/p13n/P13nDialog",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/m/Token",
	],
	function (Controller, MessageToast, Fragment, JSONModel, ChartFormatter, FeedItem, AjaxUtils, formatter, P13nDialog, Filter, FilterOperator,Token) {
		"use strict";

		var theClass = Controller.extend("sap.nsme.crm.HelpView.controller.List", {
			formatter: formatter
		});
		theClass.prototype.onInit = async function (evt) {
			const oJson = {
				id: 100,
				total: 1078.98,
				details: [
					{
						lineNum: 1,
						itemCode: "I001"
					},
					{
						lineNum: 2,
						itemCode: "I002"
					},
					{
						lineNum: 1,
						itemCode: "I003"
					}
				]
			};
			const oModel = new JSONModel(oJson);
			this.getView().setModel(oModel);

			//var data = await AjaxUtils.get({ url: "crm/HelpView/localService/search.json" });
			var oModelData = new JSONModel(sap.ui.require.toUrl("sap/nsme/crm/HelpView/localService/search.json"));
			//const oModelData = new JSONModel(data);
			this.getView().setModel(oModelData, "search");
			const oView = this.getView();
			var oMultiInput2 = oView.byId("input3");
			// add checkbox validator
			oMultiInput2.addValidator(function(args){
				if (args.suggestionObject){
					var key = args.suggestionObject.getCells()[0].getText();
					var text = key + "(" + args.suggestionObject.getCells()[3].getText() + ")";

					return new Token({key: key, text: text});
				}
				return null;
			});		
			
			var oTable = oView.byId("table");
			//oView.byId("column").getTemplate();
			oView.byId("AAA").addValidator(function(args){
				if (args.suggestionObject){
					var key = args.suggestionObject.getCells()[0].getText();
					var text = key + "(" + args.suggestionObject.getCells()[3].getText() + ")";

					return new Token({key: key, text: text});
				}
				return null;
			});		

		};
		theClass.prototype.onPress = function (evt) {
			const dialog = new P13nDialog();
			const oView = this.getView();
			dialog.test(oView);
			//alert('1');
		};
		theClass.prototype.onSuggest = async function (oEvent) {
			var sTerm = oEvent.getParameter("suggestValue");
			var oModelData = this.getView().getModel("search");
			var data = await AjaxUtils.get({ url: `crm/HelpView/localService/search1.json?${sTerm}` });
			oModelData.setData(data);			
			//oModelData.refresh(false);
		};
		theClass.prototype.showAll = async function (oEvent) {
			var oModelData = this.getView().getModel("search");
			var data = await AjaxUtils.get({ url: `crm/HelpView/localService/search.json` });
			oModelData.setData(data);	
		};
		
		return theClass;
	}
);
