sap.ui.define([],
    function () {
        "use strict";
        var theClass = {};

        theClass.render = function (oRm, oControl) {
            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.writeClasses();
            oRm.write(">");
            const oInput = oControl._getInputControl();
            const oText = oControl._getTextControl();
            oRm.renderControl(oInput);
            oRm.renderControl(oText);
            oRm.write("</div>"); // end of the complete Control

        };
        return theClass;
    });