sap.ui.define(
	[
		"sap/nsme/share/base/BaseDetailController",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel"
	],
	function (BaseClass, MessageToast, Fragment, JSONModel) {
		"use strict";
		var theClass = BaseClass.extend("sap.nsme.crm.Help.controller.Detail", {});
		theClass.prototype.onChoose = function (data) {
			alert(data);
		};

		theClass.prototype.onInitData = function (query) {
			BaseClass.prototype.onInitData.call(this, query);
			var tgtGroup = query.targetGroup;
			var oModel = this.getView().getModel();
			oModel.getData().tgtGroup = tgtGroup;
			oModel.refresh(true);

		};
		theClass.prototype.onLoadData = function (query) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var data = {
				col1: 1,
				col2: 12345.67,
				col3: 98765.43,
				col4: "abcd",
				col5: "1",
				money1: "1",
				cur1: "CNY",
				date1: "2011-12-30",
				codes: [
					{
						value: 1,
						desc: "A"
					}, {
						value: 2,
						desc: "B"
					}
				]
			};
			oModel.setData(data);
			oModel.refresh();
		};

		return theClass;
	}
);
