sap.ui.define([
	"sap/base/Log",
	'sap/ui/core/format/NumberFormat',
	'sap/ui/model/CompositeType',
	'sap/ui/model/FormatException',
	'sap/ui/model/ParseException',
	'sap/ui/model/ValidateException',
	"sap/ui/thirdparty/jquery",
	"sap/base/util/isEmptyObject"
],
	function(
		Log,
		NumberFormat,
		CompositeType,
		FormatException,
		ParseException,
		ValidateException,
		jQuery,
		isEmptyObject
	) {
	"use strict";
	var Currency = CompositeType.extend("sap.nsme.share.model.type.Currency",  {

		constructor : function () {
			CompositeType.apply(this, arguments);
			this.sName = "Currency";
			this.bUseRawValues = true;
		}

	});

	/**
	 * Formats the given value to the given target type.
	 *
	 * @param {any[]|string} vValue
	 *   The array containing amount and currency code in case the <code>source</code> format option
	 *   is not given; otherwise, a string representation of the value which is parsed using the
	 *   source format
	 * @param {string} sTargetType
	 *   The target type; must be "string", or a type with "string" as its
	 *   {@link sap.ui.base.DataType#getPrimitiveType primitive type}
	 * @returns {string}
	 *   The formatted output value; the values <code>undefined</code> or <code>null</code> or
	 *   an amount <code>undefined</code> or <code>null</code> are formatted to <code>null</code>
	 * @throws {sap.ui.model.FormatException}
	 *   If <code>sTargetType</code> is unsupported
	 *
	 * @public
	 */
	Currency.prototype.formatValue = function(vValue, sTargetType) {
		var aValues = vValue;
		if (vValue == undefined || vValue == null) {
			return null;
		}
		if (this.oInputFormat) {
			aValues = this.oInputFormat.parse(vValue);
		}
		if (!Array.isArray(aValues)) {
			throw new FormatException("Cannot format currency: " + vValue + " has the wrong format");
		}
		if (aValues[0] == undefined || aValues[0] == null) {
			return null;
		}
		switch (this.getPrimitiveType(sTargetType)) {
			case "string":
				return this.oOutputFormat.format(aValues);
			default:
				throw new FormatException("Don't know how to format currency to " + sTargetType);
		}
	};

	/**
	 * Parses a string value.
	 *
	 * @param {string} sValue
	 *   The value to be parsed
	 * @param {string} sSourceType
	 *   The source type (the expected type of <code>sValue</code>); must be "string", or a type
	 *   with "string" as its {@link sap.ui.base.DataType#getPrimitiveType primitive type}.
	 * @param {array} aCurrentValues
	 *   The current values of all binding parts
	 * @returns {any[]|string}
	 *   If the <code>source</code> format option is not set, the method returns an array
	 *   containing amount and currency: the amount is a <code>string</code> if the format
	 *   option <code>parseAsString</code> is set and a <code>number</code> otherwise, the currency
	 *   is always a <code>string</code>.
	 *   If the <code>source</code> format option is set, the method returns a string representation
	 *   of amount and currency in the given source format.
	 * @throws {sap.ui.model.ParseException}
	 *   If <code>sSourceType</code> is unsupported or if the given string cannot be parsed
	 * @public
	 */
	Currency.prototype.parseValue = function(sValue, sSourceType) {
		var vResult, oBundle;
		switch (this.getPrimitiveType(sSourceType)) {
			case "string":
				vResult = this.oOutputFormat.parse(sValue);
				if (!Array.isArray(vResult) || isNaN(vResult[0])) {
					oBundle = sap.ui.getCore().getLibraryResourceBundle();
					throw new ParseException(oBundle.getText("Currency.Invalid", [sValue]));
				}
				break;
			default:
				throw new ParseException("Don't know how to parse Currency from " + sSourceType);
		}
		if (this.oInputFormat) {
			vResult = this.oInputFormat.format(vResult);
		}
		return vResult;
	};

	Currency.prototype.validateValue = function(vValue) {
		if (this.oConstraints) {
			var oBundle = sap.ui.getCore().getLibraryResourceBundle(),
				aViolatedConstraints = [],
				aMessages = [],
				aValues = vValue,
				iValue;
			if (this.oInputFormat) {
				aValues = this.oInputFormat.parse(vValue);
			}
			iValue = aValues[0];
			jQuery.each(this.oConstraints, function(sName, oContent) {
				switch (sName) {
					case "minimum":
						if (iValue < oContent) {
							aViolatedConstraints.push("minimum");
							aMessages.push(oBundle.getText("Currency.Minimum", [oContent]));
						}
						break;
					case "maximum":
						if (iValue > oContent) {
							aViolatedConstraints.push("maximum");
							aMessages.push(oBundle.getText("Currency.Maximum", [oContent]));
						}
						break;
					default:
						Log.warning("Unknown constraint '" + sName + "': Value is not validated.",
							null, "sap.ui.model.type.Currency");
				}
			});
			if (aViolatedConstraints.length > 0) {
				throw new ValidateException(this.combineMessages(aMessages), aViolatedConstraints);
			}
		}
	};

	Currency.prototype.setFormatOptions = function(oFormatOptions) {
		this.oFormatOptions = oFormatOptions;
		this._createFormats();
	};

	/**
	 * Called by the framework when any localization setting changed
	 * @private
	 */
	Currency.prototype._handleLocalizationChange = function() {
		this._createFormats();
	};

	/**
	 * Create formatters used by this type
	 * @private
	 */
	Currency.prototype._createFormats = function() {
		var oSourceOptions = this.oFormatOptions.source;
		this.oOutputFormat = NumberFormat.getCurrencyInstance(this.oFormatOptions);
		if (oSourceOptions) {
			if (isEmptyObject(oSourceOptions)) {
				oSourceOptions = {
					groupingEnabled: false,
					groupingSeparator: ",",
					decimalSeparator: "."
				};
			}
			this.oInputFormat = NumberFormat.getCurrencyInstance(oSourceOptions);
		}
	};

	/**
	 * Gets an array of indices that determine which parts of this type shall not propagate their
	 * model messages to the attached control. Prerequisite is that the corresponding binding
	 * supports this feature, see {@link sap.ui.model.Binding#supportsIgnoreMessages}. If the format
	 * option <code>showMeasure</code> is set to <code>false</code> and the currency value is not
	 * shown in the control, the part for the currency code shall not propagate model messages to
	 * the control.
	 *
	 * @return {number[]}
	 *   An array of indices that determine which parts of this type shall not propagate their model
	 *   messages to the attached control
	 *
	 * @public
	 * @see sap.ui.model.Binding#supportsIgnoreMessages
	 * @since 1.82.0
	 */
	// @override sap.ui.model.Binding#supportsIgnoreMessages
	Currency.prototype.getPartsIgnoringMessages = function () {
		if (this.oFormatOptions.showMeasure === false) {
			return [1];
		}
		return [];
	};

	return Currency;

});
