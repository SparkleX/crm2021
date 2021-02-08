sap.ui.define(
	[
		"sap/nsme/share/controller/BaseDetailController",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel"
	],
	function (Controller, MessageToast, Fragment, JSONModel) {
		"use strict";
		var theClass = Controller.extend("sap.nsme.crm.TargetGroup.controller.Detail", {});
		theClass.prototype.onCreateCampaign = function (data) {
			this.getOwnerComponent()
				.getRouter()
				.navTo(
					"campaign",
					{},
					{
						campaign: {
							route: "detail",
							parameters: {
								id: "#",
								query: {
									targetGroup: this.dataId
								}
							}
						}
					}
				);
		};
		theClass.prototype.onValueHelpRequested = function () {};
		return theClass;
	}
);
