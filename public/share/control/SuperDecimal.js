sap.ui.define(
    ["./BaseSuperControl", "sap/m/Input", "sap/m/Text"],
    function (BaseClass, Input, Text) {
        "use strict";
        var theClass = BaseClass.extend("sap.nsme.share.control.SuperDecimal", {
            metadata: {
                properties: {
                }
            }
        });
        theClass.prototype.init = function () {
            BaseClass.prototype.init.call(this);
            var id = this.getId();
            var oInput = new Input(`${id}-input`);
            this.setAggregation("_input", oInput);
            var oText = new Text(`${id}-text`);
            this.setAggregation("_text", oText);
        };
        return theClass;
    }
);
