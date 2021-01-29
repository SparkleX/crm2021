sap.ui.define(
	["sap/m/Select", "sap/m/Label", "sap/m/Input", "sap/m/SelectRenderer", "sap/m/LabelRenderer"],
	function (BaseClass, Label, Input, SelectRenderer, LabelRenderer) {
		"use strict";
		var theClass = BaseClass.extend("sap.nsme.share.widget.LabelSelect2", {
			metadata: {
				properties: {
					text: { type: "string", group: "Behavior" },
					editable: { type: "boolean", group: "Behavior" }
				},
				aggregations: {
					_label: { type: "sap.m.Label", multiple: false /*, visibility: "hidden"*/ }
				}
			},
			renderer: function (oRm, oControl) {
				const oLabel = oControl.getAggregation("_label");
				LabelRenderer.render(oRm, oLabel);
				SelectRenderer.render(oRm, oControl);
			}
		});

		theClass.prototype.init = function () {
			BaseClass.prototype.init.call(this);
		};

		theClass.prototype.applySettings = function (mSettings, oScope) {
			const oLabel = new Label({
				//id: `${this.getId()}-label`,
				text: mSettings.text,
				width: "33%"
			});
			this.setAggregation("_label", oLabel);
			//oLabel.addDependent(this);
			mSettings.width = "67%";
			BaseClass.prototype.applySettings.call(this, mSettings, oScope);
		};
		theClass.prototype.setEditable = function (val) {
			BaseClass.prototype.setEditable.call(this, val);
			//const oInput = this.getAggregation("_select");
			//oInput.setEditable(val);
			this.getParent().rerender();
		};
		return theClass;
	}
);
