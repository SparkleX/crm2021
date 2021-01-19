sap.ui.define(
	["sap/ui/core/Control", "sap/m/Link", "sap/m/Input", "sap/nsme/share/ovs/ValueSelectUtils"],
	function (BaseClass, Link, Input, ValueSelectUtils) {
		"use strict";
		var theClass = BaseClass.extend("sap.nsme.share.widget.ValueSelect", {
			metadata: {
				properties: {
					editable: { type: "boolean", group: "Behavior", defaultValue: true },
					linkTo: { type: "string", group: "Behavior", defaultValue: null },
					value: { type: "string", group: "Data", defaultValue: null, bindable: "bindable" }
				},
				aggregations: {
					_link: { type: "sap.m.Link", multiple: false, visibility: "hidden" },
					_input: { type: "sap.m.Input", multiple: false, visibility: "hidden" }
				}
			}
		});

		theClass.prototype.init = function () {
			this.setAggregation(
				"_input",
				new Input({ showValueHelp: true, valueHelpRequest: this.valueHelpRequest.bind(this) })
			);
			this.setAggregation("_link", new Link({ text: "[NULL]", press: this.onLinkPress.bind(this) }));
			BaseClass.prototype.init.call(this);
		};

		theClass.prototype.applySettings = function (mSettings, oScope) {
			BaseClass.prototype.applySettings.call(this, mSettings, oScope);
		};
		theClass.prototype.getLinkControl = function () {
			const rt = this.getAggregation("_link");
			return rt;
		};
		theClass.prototype.getInputControl = function () {
			const rt = this.getAggregation("_input");
			return rt;
		};

		theClass.prototype.setEditable = function (value) {
			const oInput = this.getInputControl();
			const oLink = this.getLinkControl();
			//oInput.setVisible(value);
			//oLink.setVisible(!value);
		};

		theClass.prototype.valueHelpRequest = function (value) {
			const name = this.getLinkTo();
			ValueSelectUtils.show(name, this.onChoose.bind(this));
		};

		theClass.prototype.onChoose = function (value) {
			var oInput = this.getInputControl();
			const oLink = this.getLinkControl();
			this.setValue(value.key);
			oInput.setSelectedKey(value.key);
			oInput.setValue(value.text);
			oLink.setText(value.text);
		};
		theClass.prototype.onLinkPress = function (evt) {
			var oInput = this.getInputControl();
			alert(oInput.getSelectedKey());
		};
		theClass.prototype.setValue = function (value) {
			this.setProperty("value", value, true);
		};
		theClass.prototype.getValue = function () {
			var oInput = this.getInputControl();
			const rt = oInput.getSelectedKey();
			return rt;
		};
		return theClass;
	}
);
