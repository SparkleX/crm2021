sap.ui.define(
	["sap/ushell/library", "sap/ushell/ui/tile/TileBase", "sap/m/Input", "sap/ushell/ui/tile/StaticTileRenderer"],
	function (library, BaseClass, Input) {
		"use strict";

		var theClass = BaseClass.extend("sap.nsme.flp.ChartTile", {
			metadata: {
				aggregations: {
					content1: { type: "sap.m.Input", multiple: false, visibility: "hidden" }
				}
			}
		});

		theClass.prototype.init = function () {

			BaseClass.prototype.init.call(this);
		};

		theClass.prototype.applySettings = function (mSettings, oScope) {
			BaseClass.prototype.applySettings.call(this, mSettings, oScope);
		};
		theClass.prototype.onBeforeRendering = function () {
			BaseClass.prototype.onBeforeRendering.call(this);
			this.setAggregation(
				"content1",
				new Input()
			);
		};

		return theClass;
	}
);
