sap.ui.define(["sap/m/MultiInput", "sap/m/Token"], function (BaseClass, Token) {
	"use strict";
	var theClass = BaseClass.extend("sap.nsme.crm.HelpView.widget.MultiTabularInput", {
		metadata: {}
	});

	theClass.prototype.init = function () {
		BaseClass.prototype.init.call(this);
		this.addValidator(function (args) {
			if (args.suggestionObject) {
				var key = args.suggestionObject.getCells()[0].getText();
				var text = key + "(" + args.suggestionObject.getCells()[3].getText() + ")";

				return new Token({ key: key, text: text });
			}
			return null;
		});
	};

	theClass.prototype.applySettings = function (mSettings, oScope) {
		const rt = BaseClass.prototype.applySettings.call(this, mSettings, oScope);

		return rt;
	};
	return theClass;
});
