sap.ui.define(
	["sap/m/SelectRenderer", "sap/m/LinkRenderer", "sap/ui/core/Renderer"],
	function (SelectRenderer, LinkRenderer, Renderer) {
		"use strict";
		var theClass = {};

		theClass.render = function (oRm, oControl) {
			oRm.write("<div");
			oRm.write(">");
			oRm.renderControl(oControl.getAggregation("_link"));
			oRm.write("<br>");
			oRm.renderControl(oControl.getAggregation("_input"));
			oRm.write("</div>");
		};
		return theClass;
	},
	true
);
