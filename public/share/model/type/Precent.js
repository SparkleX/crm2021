sap.ui.define(["sap/ui/model/type/Float"], function (BaseClass) {
	"use strict";

	var theClass = BaseClass.extend("sap.nsme.share.model.type.Precent", {
		constructor: function () {
			BaseClass.apply(this, arguments);
			this.sName = "Precent";
		}
	});

	theClass.prototype.setFormatOptions = function (oFormatOptions) {
		//var OADM = Context.OADM;
		this.oFormatOptions = { 
			minFractionDigits: 1,
			maxFractionDigits: 1,
			groupingEnabled: true,
			groupingSeparator: ",",
			decimalSeparator: ".",
			groupingSize: 3
		};
		this._createFormats();
	};

	return theClass;
});
