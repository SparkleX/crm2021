sap.ui.define(
	["sap/ushell/adapters/local/LaunchPageAdapter", "sap/ui/thirdparty/jquery"],
	function (BaseClass, jQuery) {
		"use strict";
		const theClass = function (oUnused, sParameter, oAdapterConfiguration) {
			const aConfigCatalogs = oAdapterConfiguration.config.catalogs;
			BaseClass.call(this, oUnused, sParameter, oAdapterConfiguration);

			const that = {};
			that.removeTile = this.removeTile;
			this.removeTile = function (oGroup, oTile) {
				const rt = that.removeTile.call(that, oGroup, oTile);
				alert(1);
				return rt;
			};

			this.getCatalogs = function () {
				var oDfd = jQuery.Deferred();

				window.setTimeout(function () {
					aConfigCatalogs.forEach(function (oCatalog) {
						oDfd.notify(oCatalog);
					});
				});

				return oDfd.promise();
			};
			this.getCatalogTiles = function (oCatalog) {
				var oDfd = jQuery.Deferred();
				window.setTimeout(function () {
					oDfd.resolve(oCatalog.tiles);
				});
				return oDfd.promise();
			};
		};
		theClass.prototype = Object.create(BaseClass.prototype);
		return theClass;
	},
	true
);
