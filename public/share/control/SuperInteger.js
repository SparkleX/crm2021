sap.ui.define(
    ["sap/m/Input", "sap/m/Text"],
    function (BaseClass, Text) {
        "use strict";
        var theClass = BaseClass.extend("sap.nsme.share.control.SuperInteger", {
            metadata: {
                properties: {
                },
                aggregations: {
                    _text: { type: "sap.ui.core.Control", multiple: false, visibility: "hidden" }
                }
            }
        });
        theClass.prototype.init = function () {
            BaseClass.prototype.init.call(this);
            var id = this.getId();
            var oText = new Text(`${id}-text`);
            this.setAggregation("_text", oText);
        };
        theClass.prototype._getTextControl = function () {
            var oText = this.getAggregation("_text");
            return oText;
        };
        return theClass;
    }
);
