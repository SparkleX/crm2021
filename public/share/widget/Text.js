sap.ui.define(
	["sap/m/Text", "sap/nsme/share/utils/CommonUtils", "sap/nsme/share/utils/MetadataUtils"],
	function (BaseClass, CommonUtils, MetadataUtils) {
		"use strict";
		var theClass = BaseClass.extend("sap.nsme.share.widget.Text", {
			metadata: {
				properties: {
					dataBind: { type: "string", group: "Behavior" },
					codeList: { type: "string", group: "Behavior" },
					linkTo: { type: "string", group: "Behavior" }
				}
			}
		});

		theClass.prototype.init = function () {
			BaseClass.prototype.init.call(this);
		};
		theClass.prototype.formatter = function (a) {
			if(a == null) {
				return a;
			}
			const codeList = this.getCodeList();
			if(codeList) {
				var codes = MetadataUtils.getCodeListSync();
				var rt = codes[codeList].code[a];
				return rt;
			}
			return a;
		};
		theClass.prototype.applySettings = function (mSettings, oScope) {
			const rt = BaseClass.prototype.applySettings.call(this, mSettings, oScope);
			if (mSettings.text) {
				this.unbindText();
				this.bindText({
					parts: mSettings.text.parts,
					formatter: this.formatter.bind(this)
				});
			}
			if (mSettings.dataBind) {
				const dataBind = this.getDataBind();
				CommonUtils.asyncCall(this, async function () {
					const [table, field] = dataBind.split(".");
					const metadata = await MetadataUtils.getMetadata();
					const metaField = metadata.tables[table].fields[field];
					this.setCodeList(metaField.codeList);
				});
				/*if (mSettings.codeList) {
					console.warn("dataBind set, ignore codeList");
				}*/
			}
			if (false== (mSettings.dataBind || mSettings.codeList ||  mSettings.linkTo)) {
				console.warn("dataBind , codeList, linkTo undefined");
			}
			return rt;
		};
		return theClass;
	}
);
