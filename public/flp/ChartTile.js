sap.ui.define(
	["sap/m/GenericTile"],
	function (BaseClass, Input) {
		"use strict";

		var theClass = BaseClass.extend("sap.nsme.flp.ChartTile", {
			metadata: {
				properties: {
					targetURL: { type: "string", group: "Behavior" }
				}
			}
		});

		theClass.prototype.init = function () {
			BaseClass.prototype.init.call(this);
		};

		theClass.prototype.applySettings = function (mSettings, oScope) {
			BaseClass.prototype.applySettings.call(this, mSettings, oScope);
			//this.attachPress(this.onPress)
		};
		theClass.prototype.onBeforeRendering = function () {
			BaseClass.prototype.onBeforeRendering.call(this);
		};
		/*theClass.prototype.onPress = function () {
			//alert(this.getTargetURL());
		};*/
		return theClass;
	}
);
