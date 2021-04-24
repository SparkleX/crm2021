sap.ui.define([
    'sap/ui/model/CompositeType',
    'sap/ui/core/format/NumberFormat',
    'sap/ui/model/FormatException',
    'sap/ui/model/ParseException',
    'sap/ui/model/ValidateException',
    "sap/ui/thirdparty/jquery",
    "sap/base/util/isEmptyObject",
],
    function (
        CompositeType,
        NumberFormat,
        FormatException,
        ParseException,
        ValidateException
    ) {
        "use strict";
        var Currency = CompositeType.extend("sap.nsme.share.model.type.Currency", {

            constructor: function () {
                CompositeType.apply(this, arguments);
                this.sName = "Currency";
                this.oNumberFormat = NumberFormat.getFloatInstance({
                    maxFractionDigits: 5,
                    groupingEnabled: true,
                    groupingSeparator: ",",
                    decimalSeparator: "."
                });
            }
        });

        Currency.prototype.formatValue = function (vValue, sTargetType) {
            var number = vValue[0];
            var currency = vValue[1];
            var fValue = this.oNumberFormat.format(number);
            return `${fValue} ${currency}`;

        };

        Currency.prototype.parseValue = function (sValue, sSourceType) {
            var vValue = sValue.split(' ');
            var number = vValue[0];
            var currency = vValue[1];
            var fValue = this.oNumberFormat.parse(number);
            return [fValue, currency];
        };

        Currency.prototype.validateValue = function (vValue) {
        };

        Currency.prototype.setFormatOptions = function (oFormatOptions) {
            this.oFormatOptions = oFormatOptions;
        };


        Currency.prototype.getPartsIgnoringMessages = function () {
            return [];
        };

        return Currency;

    });
