sap.ui.define(
    ["./BaseSuperControl", "sap/m/DatePicker", "sap/m/Text"],
    function (BaseClass, DatePicker, Text) {
        "use strict";
        var theClass = BaseClass.extend("sap.nsme.share.control.SuperDatePicker", {
            metadata: {
                properties: {
                }
            }
        });
        theClass.prototype.init = function () {
            BaseClass.prototype.init.call(this);
            var id = this.getId();
            var oInput = new DatePicker(`${id}-input`, {
                valueFormat: "yyyy-MM-dd",
                change: this._onInputChange.bind(this),
                visible: true
            });
            this.setAggregation("_input", oInput);
            var oText = new Text(`${id}-text` ,{
                visible: false
            });
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
