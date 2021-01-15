sap.ui.define(["sap/m/Select", "sap/ui/core/ListItem"], function (BaseClass, ListItem) {
	"use strict";
	var theClass = BaseClass.extend("sap.nsme.share.widget.Select", {
		metadata: {
			properties: {
				dataBind: { type: "string", group: "Behavior" }
			}
		}/*,
		constructor: function (sId, mProperties) {
			this.mId = sId;
		}*/
	});

	theClass.prototype.init = function () {
		BaseClass.prototype.init.call(this);
	};

	theClass.prototype.applySettings = function (mSettings, oScope) {
		const modelName = mSettings.items.model;
		mSettings.items.template = new ListItem({
			key: `{${modelName}>value}`,
			text: `{${modelName}>desc}`,
			additionalText: `{${modelName}>value}`
		});
		BaseClass.prototype.applySettings.call(this, mSettings, oScope);
		this.setWidth("100%");
		this.setShowSecondaryValues(true);
	};
	return theClass;
});
