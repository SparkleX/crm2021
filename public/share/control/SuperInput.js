sap.ui.define(
    ["./BaseSuperControl", "sap/m/Input", "sap/m/Text"],
    function (BaseClass, Input, Text) {
        "use strict";
        var theClass = BaseClass.extend("sap.nsme.share.control.SuperInput", {
            metadata: {
                properties: {
                }
            }
        });
        theClass.prototype.init = function () {
            BaseClass.prototype.init.call(this);
            var id = this.getId();
            var oInput = new Input(`${id}-input`, {
                change: this._onInputChange.bind(this)
            });
            this.setAggregation("_input", oInput);
            var oText = new Text(`${id}-text`);
            this.setAggregation("_text", oText);
        };
        theClass.prototype._onInputChange = function (oEvent) {
            //that.setProperty("oldValue", this.getProperty("oldValue"));
            this.setProperty("value", oEvent.getParameter("value"), true);
            this.fireChange(oEvent);
        };
        return theClass;
    }
);
