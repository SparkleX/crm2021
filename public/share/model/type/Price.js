sap.ui.define(["sap/ui/model/type/Float"], function (BaseClass) {
    "use strict";

    var theClass = BaseClass.extend("sap.nsme.share.model.type.Price", {
        constructor: function () {
            BaseClass.apply(this, arguments);
            this.sName = "Price";
        }
    });

    theClass.prototype.setFormatOptions = function (oFormatOptions) {
       // var OADM = Context.OADM;
        this.oFormatOptions = {
            minFractionDigits: 3,
            maxFractionDigits: 3,
            groupingEnabled: true,
            groupingSeparator: ".",
            decimalSeparator: ",",
            groupingSize: 3
        };
        this._createFormats();
    };

    return theClass;
});