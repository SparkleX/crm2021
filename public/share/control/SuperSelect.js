sap.ui.define(
    ["./BaseSuperControl", "sap/m/Select", "sap/m/Text"],
    function (BaseClass, Select, Text) {
        "use strict";
        var theClass = BaseClass.extend("sap.nsme.share.control.SuperSelect", {
            metadata: {
                properties: {
                },
                defaultAggregation : "items",
                aggregations: {
					items: {
						type: "sap.ui.core.Item",
						multiple: true,
						singularName: "item",
						bindable: "bindable",
						forwarding: {
                            idSuffix: "-input",
							//getter: "getList",
							aggregation: "items"
						}
					}
                }
            }
        });
        theClass.prototype.init = function () {
            BaseClass.prototype.init.call(this);
            var id = this.getId();
            var oInput = new Select(`${id}-input`, {
                width:"100%",
                visible: true,
                change: this._onInputChange.bind(this)
            });
            this.setAggregation("_input", oInput);
            var oText = new Text(`${id}-text`, {
                visible: false
            });
            this.setAggregation("_text", oText);
        };
        theClass.prototype._onInputChange = function (oEvent) {
            var oParams = oEvent.getParameters();
            var value = oParams.selectedItem.getKey();
            this.setValue(value);
           // this.setProperty("value", oEvent.getParameter("value"), true);
            this.fireChange(oEvent);
        };
        theClass.prototype.setValue = function (val) {
            this.setProperty("value", val, true);
            const oText = this._getTextControl();
            oText.setText(val);
            const oInput = this._getInputControl();
            oInput.setSelectedKey(val);
        };
        return theClass;
    }
);
