sap.ui.define([
	"sap/ushell/ui/tile/StaticTileRenderer",
	"sap/ui/core/Renderer"
], function (BaseRenderer, Renderer) {
	"use strict";
	var theClass = {};//Renderer.extend(BaseRenderer);

	theClass.render = function (oRm, oControl) {
		oRm.write("<div");
		oRm.write(">");
		oRm.renderControl(oControl.getAggregation("content1"));
		oRm.write("</div>");
	};

	return theClass;
});