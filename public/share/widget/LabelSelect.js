sap.ui.define(
	["sap/ui/core/Control", "./Select", "sap/m/Label", "sap/m/Input"],
	function (BaseClass, Select, Label, Input) {
		"use strict";
		var theClass = BaseClass.extend("sap.nsme.share.widget.LabelSelect", {
			metadata: {
				properties: {
					text: {
						type: "string",
						group: "Behavior"
					},
					dataBind: { type: "string", group: "Behavior" },
					selectedKey: {
						type: "string",
						group: "Data",
						defaultValue: "",
						bindable: true
					}
				},
				defaultAggregation: "items",
				aggregations: {
					_label: { type: "sap.m.Label", multiple: false, visibility: "hidden" },
					_select: { type: "sap.m.Select", multiple: false, visibility: "hidden" },
					items: {
						type: "sap.ui.core.Item",
						multiple: true,
						singularName: "item",
						bindable: "bindable",
						forwarding: {
							getter: "getSelect",
							aggregation: "items"
						}
					}
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
			var oSelectKeyBind = null;
			if(mSettings.selectedKey) {
				oSelectKeyBind = JSON.parse(JSON.stringify(mSettings.selectedKey));
			}
			const oSelect = new Select({
				items: mSettings.items,
				id: `${this.getId()}-select`,
				width: "67%",
				selectedKey: oSelectKeyBind,
				dataBind: mSettings.dataBind
			});
			this.setAggregation("_select", oSelect);
			BaseClass.prototype.applySettings.call(this, mSettings, oScope);
		};
		theClass.prototype.getSelect = function (mSettings, oScope) {
			const rt = this.getAggregation("_select");
			return rt;
		};
		theClass.prototype.getLabel = function (mSettings, oScope) {
			const rt = this.getAggregation("_label");
			return rt;
		};
		theClass.prototype.setEditable = function (val) {
			const oInput = this.getAggregation("_select");
			oInput.setEditable(val);
			oInput.rerender();
		};
		return theClass;
	}
);
