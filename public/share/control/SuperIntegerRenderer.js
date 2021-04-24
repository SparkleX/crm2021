sap.ui.define([
    "sap/m/InputRenderer",
    "sap/ui/core/Renderer"
], function (InputRenderer, Renderer) {
    "use strict";
    var theClass = Renderer.extend(InputRenderer);

    theClass.render = function (oRm, oControl) {
        oRm.write("<div");
        oRm.writeControlData(oControl);
        oRm.writeClasses();
        oRm.write(">");
        //const oInput = oControl._getInputControl();
        const oText = oControl._getTextControl();
        //oRm.renderControl(oInput);
        InputRenderer.render(oRm, oControl);
        oRm.renderControl(oText);
        oRm.write("</div>"); // end of the complete Control

    };

    return theClass;
});