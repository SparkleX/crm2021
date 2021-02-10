sap.ui.define(
	["sap/m/Text", "sap/nsme/share/utils/CommonUtils", "sap/nsme/share/utils/MetadataUtils"],
	function (BaseClass, CommonUtils, MetadataUtils) {
		"use strict";
		var theClass = BaseClass.extend("sap.nsme.share.widget.Text", {
			metadata: {
				properties: {
					dataBind: { type: "string", group: "Behavior" }
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
			var codeList = this.metaField.codeList;
			if(codeList) {
				var codes = MetadataUtils.getCodeListSync();
				var rt = codes[codeList].code[a];
				return rt;
			}
			switch(this.metaField.type) {
				case "date":
					var dateFormat = sap.ui.core.format.DateFormat.getDateInstance();   
					var date = new Date(a);
					var dateFormatted = dateFormat.format(date, false);
					return dateFormatted;
			}
			return a;
		};
		theClass.prototype.applySettings = function (mSettings, oScope) {
			const rt = BaseClass.prototype.applySettings.call(this, mSettings, oScope);
			/*if (mSettings.text) {
				this.unbindText();
				this.bindText({
					parts: mSettings.text.parts,
					formatter: this.formatter.bind(this)
				});
			}*/
			if (mSettings.text) {
				var bindInfo = this.getBindingInfo("text");
				this.bindText({
					parts: bindInfo.parts,
					formatter: this.formatter.bind(this)
				});
			}
			if (!mSettings.dataBind) {
				console.error("missing [dataBind]");
			}
			//if (mSettings.dataBind) {
				const dataBind = this.getDataBind();
				this.metaField = MetadataUtils.getTableFieldSync(dataBind);
			//}
			return rt;
		};
		return theClass;
	}
);
