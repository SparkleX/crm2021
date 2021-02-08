sap.ui.define(
	[
		"sap/ui/core/Control",
		"sap/m/Link",
		"sap/m/Input",
		"sap/nsme/share/ovs/ValueSelectUtils",
		"sap/nsme/share/quick/QuickViewUtils",
		"sap/ui/core/Icon",
		"sap/nsme/share/widget/DescUtils"
	],
	function (BaseClass, Link, Input, ValueSelectUtils, QuickViewUtils, Icon, DescUtils) {
		"use strict";
		var theClass = BaseClass.extend("sap.nsme.share.widget.ValueSelect", {
			metadata: {
				properties: {
					editable: { type: "boolean", group: "Behavior", defaultValue: true },
					linkTo: { type: "string", group: "Behavior", defaultValue: null },
					value: { type: "string", group: "Data", defaultValue: null, bindable: "bindable" },
					//desc: { type: "string", group: "Data", defaultValue: null, bindable: "bindable" },
					multiselect: { type: "boolean", group: "Data", defaultValue: false, bindable: "bindable" }
				},
				aggregations: {
					_icon: { type: "sap.ui.core.Icon", multiple: false, visibility: "hidden" },
					_link: { type: "sap.m.Link", multiple: false, visibility: "hidden" },
					_input: { type: "sap.m.Input", multiple: false, visibility: "hidden" }
				}
			}
		});

		theClass.prototype.init = function () {
			this.setAggregation(
				"_input",
				new Input({ showValueHelp: true, valueHelpRequest: this.valueHelpRequest.bind(this), visible: false })
			);
			this.setAggregation("_link", new Link({ text: "[NULL]", press: this.onLinkPress.bind(this) }));
			this.setAggregation(
				"_icon",
				new Icon({
					width: "20px",
					//src: "sap-icon://navigation-right-arrow",
					src: "sap-icon://SAP-icons-TNT/data-output-arrow",
					size: "1rem",
					color: "Critical"
				})
			);

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
		theClass.prototype.getIconControl = function () {
			const rt = this.getAggregation("_icon");
			return rt;
		};
		theClass.prototype.setEditable = function (value) {
			const oInput = this.getInputControl();
			const oLink = this.getLinkControl();
			const oIcon = this.getIconControl();
			//oInput.setVisible(true /*value*/);
			//oLink.setVisible(true /*!value*/);
			//oIcon.setVisible(true /*!value*/);
			oInput.setVisible(value);
			oLink.setVisible(!value);
			oIcon.setVisible(!value);
		};

		theClass.prototype.valueHelpRequest = function (value) {
			const name = this.getLinkTo();
			const param = {
				object: name,
				multiselect: this.getMultiselect(),
				choose: this.onChoose.bind(this)
			};
			ValueSelectUtils.show(param);
		};

		theClass.prototype.onChoose = function (token) {
			const value = token[0];
			//var oInput = this.getInputControl();
			//const oLink = this.getLinkControl();
			this.setValue(value.getKey());
			//this.setDesc(value.getText());
			//oInput.setSelectedKey(value.key);
			//oInput.setValue(value.text);
			//oLink.setText(value.text);
		};
		theClass.prototype.onLinkPress = function (evt) {
			var oInput = this.getInputControl();
			//alert(oInput.getSelectedKey());
			const oLink = this.getLinkControl();

			const params = {
				id: this.getValue(), //oInput.getSelectedKey(),
				object: this.getLinkTo(),
				parent: oLink
			};
			QuickViewUtils.show(params);
		};
		theClass.prototype.setValue = function (value) {
			this.setProperty("value", value, true);
			var oInput = this.getInputControl();
			const oLink = this.getLinkControl();
			oInput.setValue("...");
			oLink.setText("...");
			var table = this.getLinkTo();
			DescUtils.getDescById(table, value, this.onDesc.bind(this));
			//oInput.setSelectedKey(value);
			//oInput.setValue(value);
			//oLink.setText(value);
		};

		theClass.prototype.onDesc = function (value) {
			var oInput = this.getInputControl();
			const oLink = this.getLinkControl();
			oInput.setValue(value);
			oLink.setText(value);
		};
		theClass.prototype.getValue = function () {
			//var oInput = this.getInputControl();
			//const rt = oInput.getSelectedKey();
			const rt = this.getProperty("value");
			return rt;
		};
		/*theClass.prototype.setDesc = function (value) {
			this.setProperty("desc", value, true);
			var oInput = this.getInputControl();
			const oLink = this.getLinkControl();
			oInput.setValue(value);
			oLink.setText(value);
		};*/
		theClass.prototype.getDesc = function () {
			const rt = this.getProperty("desc");
			return rt;
		};
		return theClass;
	}
);
