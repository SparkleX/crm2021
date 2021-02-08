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
			alert(data);
			this.getOwnerComponent()
				.getRouter()
				.navTo(
					"campaign",
					{
						id:"11eb5bbe-022d-5010-a8ce-3131a0451010"
					},
					{
						campaign: {
							route: "detail",
							parameters: {
								id: "#",
								query: {
									targetGroup : this.dataId
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
