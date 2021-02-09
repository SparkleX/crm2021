sap.ui.define(["sap/m/Select", "sap/ui/core/ListItem", "sap/nsme/share/utils/MetadataUtils"], function (BaseClass, ListItem ,MetadataUtils) {
	"use strict";
	var theClass = BaseClass.extend("sap.nsme.share.widget.Select", {
		metadata: {
			properties: {
				dataBind: { type: "string", group: "Behavior" },
				selectedKey: { type: "string", group: "Data", bindable: true }
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
		if(!mSettings.width) {
			this.setWidth("100%");
		}
		if (mSettings.dataBind) {
			const [table, field] = mSettings.dataBind.split(".");
			const metadata = MetadataUtils.getMetadataSync();
			const metaField = metadata.tables[table].fields[field];
			var codes = MetadataUtils.getCodeListSync();
			var model = codes[metaField.codeList].list;
			for(var a of model ) {
				const oItem = new ListItem({
					key: a.value,
					text: a.desc,
					additionalText: a.value,
				});
				this.addItem(oItem);
			}
		}		
		/*if(!mSettings.bindingContexts) {
			const modelName = mSettings.items.model;
			mSettings.items.template = new ListItem({
				key: `{${modelName}>value}`,
				text: `{${modelName}>desc}`,
				additionalText: `{${modelName}>value}`,
			});		
		}*/
		BaseClass.prototype.applySettings.call(this, mSettings, oScope);
		this.g
		this.setShowSecondaryValues(true);
	};
	return theClass;
});
