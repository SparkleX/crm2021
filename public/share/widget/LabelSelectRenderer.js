/*sap.ui.define([
	"sap/m/SelectRenderer",
	"sap/ui/core/Renderer",
	"sap/m/LabelRenderer",
], function (SelectRenderer, Renderer, LabelRenderer) {
	"use strict";
	var theClass = {};
	theClass.render = function (oRm, oControl) {
	//var theClass = Renderer.extend("sap.nsme.share.widget.LabelSelectRenderer", {
	//	render :function (oRm, oControl) {
		//oRm.write("<div>");
		//oRm.renderControl(oControl.getAggregation("_label"));
		const oLabel = oControl.getAggregation("_label");
		//oRm.openStart("div", oLabel);
		LabelRenderer.render(oRm, oLabel);
		SelectRenderer.render(oRm, oControl);
		//oRm.openEnd("div");
	};	
	return theClass;
});*/


sap.ui.define(
	[],
	function () {
		"use strict";
		var theClass = {};

		theClass.render = function (oRm, oControl) {
			//oRm.write("<div>");
			oRm.renderControl(oControl.getAggregation("_label"));
			oRm.renderControl(oControl.getAggregation("_select"));
			//oRm.write("</div>");
		};
		return theClass;
	},
	true
);
