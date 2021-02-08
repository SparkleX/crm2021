sap.ui.define(
	[],
	function () {
		"use strict";
		var theClass = {};
		theClass.render = function (oRm, oControl) {
			oRm.renderControl(oControl.getAggregation("_label"));
			oRm.renderControl(oControl.getAggregation("_control"));
		};
		return theClass;
	},
	true
);
