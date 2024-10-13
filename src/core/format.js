/**
 * @param {string} value
 * @param {number} index
 * @returns {String}
 */
function commaSection(value, index) {
  if (index === 0) {
    return value.slice(-3);
  }
  return value.slice(-3 * (index + 1), -3 * index);
}

/**
 * @param {string} value
 * @returns {String}
 */
function addCommas(value) {
  let string = "";
  const start = Math.ceil(value.length / 3);
  for (let i = start - 1; i >= 0; i--) {
    string += commaSection(value, i);
    if (i !== 0) string += ",";
  }
  return string;
}

/**
 * @param {String} value
 * @returns {String}
 */
function formatWithCommas(value) {
  const decimalPointSplit = value.split(".");
  decimalPointSplit[0] = decimalPointSplit[0].replace(/\w+$/gu, addCommas);
  return decimalPointSplit.join(".");
}

/**
 * @param {Decimal|number} value
 * @param {number} places
 * @param {number} layerExp
 * @returns {string}
 */
window.format = function format(value, places = 4, layerExp = 12) {
  const decimal = Decimal.fromValue_noAlloc(value);
  if (!decimal.isFinite()) return "NaN";
  if (decimal.sign < 0) {
    return `-${format(decimal.neg(), places)}`;
  }
  if (decimal.sign === 0) {
    return (0).toFixed(places);
  }
  const exp = decimal.log10().floor();
  if (places > 1 && exp.lt(-places)) {
    const expCeil = decimal.log10().ceil();
    const mantissa = decimal.div(Decimal.pow10(expCeil));
    const be = expCeil.neg().clampMin(1).log10().gte(9);
    const formatMantissa = be ? "" : mantissa.toFixed(4);
    const formatExponent = format(expCeil, 0, layerExp);
    return `${formatMantissa}e${formatExponent}`;
  }
  if (exp.lt(layerExp)) {
    const expNum = exp.toNumber();
    const fixed = expNum <= 0 ? places : Math.max(places - expNum, 0);
    return formatWithCommas(decimal.toFixed(fixed));
  }
  if (decimal.layer >= 5) {
    const layer = decimal.layer;
    const formatMag = layer < 1e9 ? decimal.mag.toFixed(4) : "";
    const formatLayer = format(layer, 0);
    return `${formatMag}F${formatLayer}`;
  }
  const mantissa = decimal.div(Decimal.pow10(exp));
  const be = exp.gt(1e9);
  const formatMantissa = be ? "" : mantissa.toFixed(4);
  const formatExponent = format(exp, 0, layerExp);
  return `${formatMantissa}e${formatExponent}`;
};

window.formatX = function formatX(value) {
  return `×${format(value)}`;
};

window.formatPow = function formatPow(value) {
  return `^${format(value)}`;
};

window.formatPercents = function formatPercents(value, places = 4) {
  const decimal = (value instanceof Decimal) ? value : new Decimal(value);
  return `${format(decimal.times(100), places)}%`;
};

window.formatMass = function formatMass(value) {
  return `${format(value)} g`;
};

window.formatInt = function formatInt(value) {
  const number = (value instanceof Decimal) ? value.toNumber() : value;
  return number.toFixed(0);
};