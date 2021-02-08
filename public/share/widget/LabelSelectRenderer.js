sap.ui.define(
	[],
	function () {
		"use strict";
		var theClass = {};
		theClass.render = function (oRm, oControl) {
			oRm.renderControl(oControl.getAggregation("_label"));
			oRm.renderControl(oControl.getAggregation("_select"));
		};
		return theClass;
	},
	true
);
