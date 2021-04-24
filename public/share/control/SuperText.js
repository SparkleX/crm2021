sap.ui.define(
    ["sap/m/Text", "sap/nsme/share/utils/CommonUtils", "sap/nsme/share/utils/MetadataUtils"],
    function (BaseClass, CommonUtils, MetadataUtils) {
        "use strict";
        var theClass = BaseClass.extend("sap.nsme.share.control.SuperText", {
            metadata: {
                properties: {
                    dataFormat: { type: "string", group: "Behavior" }
                }
            }
        });

        theClass.prototype.init = function () {
            BaseClass.prototype.init.call(this);
        };
        theClass.prototype.applySettings = function (mSettings, oScope) {
            const rt = BaseClass.prototype.applySettings.call(this, mSettings, oScope);
            return rt;
        };
        return theClass;
    }
);
