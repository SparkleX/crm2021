sap.ui.define(
	["sap/ui/core/Control", "./Select", "sap/m/Label", "sap/m/DateTimePicker"],
	function (BaseClass, Select, Label, DateTimePicker) {
		"use strict";
		var theClass = BaseClass.extend("sap.nsme.share.widget.LabelDateTimePicker", {
			metadata: {
				properties: {
					text: {
						type: "string",
						group: "Behavior"
					},
					value: {
						type: "string",
						group: "Data"
					}
				},
				aggregations: {
					_label: { type: "sap.m.Label", multiple: false, visibility: "hidden" },
					_control: { type: "sap.m.DateTimePicker", multiple: false, visibility: "hidden" }
				}
			}
		});

		theClass.prototype.init = function () {
			BaseClass.prototype.init.call(this);
		};

		theClass.prototype.applySettings = function (mSettings, oScope) {
			const oLabel = new Label({
				id: `${this.getId()}-label`,
				text: mSettings.text,
				width: "33%"
			});
			this.setAggregation("_label", oLabel);
			const oControl = new DateTimePicker({
				id: `${this.getId()}-control`,
				width: "67%",
				value: JSON.parse(JSON.stringify(mSettings.value)),
				valueFormat:"yyyy-MM-ddTHH:mm:ssZ"
			});
			this.setAggregation("_control", oControl);
			BaseClass.prototype.applySettings.call(this, mSettings, oScope);
		};
		theClass.prototype.getControl = function (mSettings, oScope) {
			const rt = this.getAggregation("_control");
			return rt;
		};
		theClass.prototype.getLabel = function (mSettings, oScope) {
			const rt = this.getAggregation("_label");
			return rt;
		};
		theClass.prototype.setEditable = function (val) {
			const oControl = this.getControl();
			oControl.setEditable(val);
			oControl.rerender();
		};
		return theClass;
	}
);
