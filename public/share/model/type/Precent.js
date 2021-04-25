sap.ui.define(["sap/ui/model/type/Float"], function (BaseClass) {
	"use strict";

	var theClass = BaseClass.extend("sap.nsme.share.model.type.Integer", {
		constructor: function () {
			BaseClass.apply(this, arguments);
			this.sName = "Integer";
		}
	});

	theClass.prototype.setFormatOptions = function (oFormatOptions) {
		this.oFormatOptions = {
			minFractionDigits: 0,
			maxFractionDigits: 0,
			groupingEnabled: false
		};
		this._createFormats();
	};

	return theClass;
});
