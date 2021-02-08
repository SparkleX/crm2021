sap.ui.define(["sap/ui/core/Control", "sap/m/Label", "sap/m/Input"], function (BaseClass, Label, Input) {
	"use strict";
	var theClass = BaseClass.extend("sap.nsme.share.widget.LabelInput", {
		metadata: {
			properties: {
				text: { type: "string", group: "Behavior" },
				value: { type: "string", group: "Data" },
				editable: { type: "boolean", group: "Behavior" }
			},
			aggregations: {
				_label: { type: "sap.m.Label", multiple: false , visibility: "hidden"},
				_input: { type: "sap.m.Input", multiple: false , visibility: "hidden"}
			}
		} /*,
		constructor: function (sId, mProperties) {
			this.mId = sId;
		}*/
	});

	theClass.prototype.init = function () {
		BaseClass.prototype.init.call(this);
	};

	theClass.prototype.applySettings = function (mSettings, oScope) {
		this.oLabel = new Label({
			id: `${this.getId()}-label`,
			text: mSettings.text,
			width: "33%"
		});
		this.setAggregation("_label", this.oLabel);

		this.oInput = new Input({
			id: `${this.getId()}-input`,
			value: mSettings.value,
			//editable: mSettings.editable,
			width: "67%"
		});
		this.setAggregation("_input", this.oInput);		
		BaseClass.prototype.applySettings.call(this, mSettings, oScope);
	};

	theClass.prototype.setValue = function (val) {
		//this.setProperty("value", val);
		this.oInput.setValue(val);
	};
	theClass.prototype.getValue = function () {
		alert('error');
	};
	theClass.prototype.setText = function (val) {
		this.setProperty("text", val);
		//this.oLabel.setText(val);
	};
	theClass.prototype.setEditable = function (val) {
		//this.setProperty("editable", val);
		const oInput = this.getAggregation("_input");
		oInput.setEditable(val);
		//this.invalidate();
	};
	return theClass;
});
