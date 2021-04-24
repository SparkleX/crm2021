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
            var oInput = new Select(`${id}-input`);
            this.setAggregation("_input", oInput);
            var oText = new Text(`${id}-text`);
            this.setAggregation("_text", oText);
        };
        return theClass;
    }
);
