sap.ui.define([
    'sap/ui/core/XMLComposite'], 
    function( XMLComposite ) {
    "use strict";
    var SimpleText = XMLComposite.extend("sap.nsme.share.widget.LabelSelect3", {
        metadata: {
            properties: {
                text: { type: "string", defaultValue: "Default Text"}
			},
			defaultAggregation: "items",
			aggregations: {
				items: {
					type: "sap.ui.core.Item",
					multiple: true,
					forwarding: {
						idSuffix: "--select",
						aggregation: "items"
					}
				}
			}			
        }
    });
    return SimpleText;
}, /* bExport= */true);