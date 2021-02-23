sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/viz/ui5/format/ChartFormatter",
		"sap/viz/ui5/controls/common/feeds/FeedItem",
		"sap/nsme/share/utils/AjaxUtils",
	],
	function (Controller, MessageToast, Fragment, JSONModel, ChartFormatter, FeedItem, AjaxUtils, formatter) {
		"use strict";

		var theClass = Controller.extend("sap.nsme.crm.Calendar.controller.List", {
		});
		theClass.prototype.onInit = async function (evt) {

		};
		theClass.prototype.onPress = function (evt) {
		};
		return theClass;
	}
);
