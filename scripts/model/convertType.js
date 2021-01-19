module.exports = function convertType(x1) {
	if (x1 == "date") {
		return "Date";
	} else if (x1 == "number" || x1 == "string") {
		return x1;
	} else if (x1 == "text") {
		return "string";
	} else if (x1 == "decimal") {
		return "Decimal";
	} else {
		return "any";
	}
};
