sap.ui.define(
	[],
	function () {
		"use strict";
		var theClass = {};

		theClass.render = function (oRm, oControl) {
			//oRm.write("<div>");
			oRm.renderControl(oControl.getAggregation("_label"));
			oRm.renderControl(oControl.getAggregation("_input"));
			//oRm.write("</div>");
		};
		return theClass;
	},
	true
);
