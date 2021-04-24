sap.ui.define(
    ["sap/ui/core/Control"],
    function (BaseClass) {
        "use strict";
        var theClass = BaseClass.extend("sap.nsme.share.control.BaseSuperControl", {
            metadata: {
                properties: {
                    editable: { type: "boolean", group: "Behavior", defaultValue: true },
                    value: { type: "string", group: "Data", defaultValue: null, bindable: "bindable" },
                },
                aggregations: {
                    _text: { type: "sap.ui.core.Control", multiple: false, visibility: "hidden" },
                    _input: { type: "sap.ui.core.Control", multiple: false, visibility: "hidden" }
                }
            }
        });
        theClass.prototype.init = function () {
            BaseClass.prototype.init.call(this);
        };
        theClass.prototype._getTextControl = function () {
            var oText = this.getAggregation("_text");
            return oText;
        };
        theClass.prototype._getInputControl = function () {
            var oInput = this.getAggregation("_input");
            return oInput;
        };
        theClass.prototype.setValue = function (val) {
            const oText = this._getTextControl();
            oText.setText(val);
            const oInput = this._getInputControl();
            oInput.setValue(val);
        };

        theClass.prototype.setEditable = function (val) {
            this.setProperty("editable", val);
            this._setVisible();
        };
        theClass.prototype.setVisible = function (val) {
            BaseClass.prototype.setVisible.call(this, val);
            this._setVisible();
        };
        theClass.prototype._setVisible = function () {
            var visible = this.getVisible()

            const oText = this._getTextControl();
            const oInput = this._getInputControl();
            if (!visible) {
                oText.setVisible(false);
                oInput.setVisible(false);
                return;
            }
            var editable = this.getEditable();
            oText.setVisible(!editable);
            oInput.setVisible(editable);
            //oText.invalidate(true);
            //oInput.invalidate(true);
        };
        return theClass;
    }
);
