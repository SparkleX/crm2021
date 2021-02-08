sap.ui.define(
	[
		"sap/nsme/share/controller/BaseDetailController",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel"
	],
	function (BaseClass, MessageToast, Fragment, JSONModel) {
		"use strict";
		var theClass = BaseClass.extend("sap.nsme.crm.Campaign.controller.Detail", {});
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
		return theClass;
	}
);
