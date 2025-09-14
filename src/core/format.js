import { DC } from "./constants";

function isEND() {
  return false;
}

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
  if (!GameUI.initialized) {
    throw new Error("Cannot use format before the game initializes!");
  }
  if (isEND()) return i18n.t("end");
  const decimal = Decimal.fromValue_noAlloc(value);
  if (!decimal.isFinite()) return "NaN";
  if (decimal.sign < 0) {
    return `-${format(decimal.neg(), places)}`;
  }
  if (decimal.sign === 0) {
    return (0).toFixed(places);
  }
  let exp = decimal.log10().floor();
  if (places > 1 && exp.lt(-places)) {
    let expCeil = decimal.log10().ceil();
    const mantissa = decimal.div(Decimal.pow10(expCeil));
    const be = expCeil.neg().clampMin(1).log10().gte(9);
    let formatMantissa = be ? "" : mantissa.toFixed(4);
    if (formatMantissa === "10.0000") {
      formatMantissa = "1.0000";
      expCeil = expCeil.add(1);
    }
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
  let formatMantissa = be ? "" : mantissa.toFixed(4);
  if (formatMantissa === "10.0000") {
    formatMantissa = "1.0000";
    exp = exp.add(1);
  }
  const formatExponent = format(exp, 0, layerExp);
  return `${formatMantissa}e${formatExponent}`;
};

window.formatX = function formatX(value, places = 4) {
  return `×${format(value, places)}`;
};

window.formatPlus = function formatX(value, places = 4) {
  return `+${format(value, places)}`;
};

window.formatPow = function formatPow(value, places = 4) {
  return `^${format(value, places)}`;
};

window.formatPercents = function formatPercents(value, places = 4) {
  const decimal = (value instanceof Decimal) ? value : new Decimal(value);
  return `${format(decimal.times(100), places)}%`;
};

window.formatMass = function formatMass(value) {
  return i18n.t("X_g", { value: format(value) });
};

window.formatInt = function formatInt(value) {
  if (!GameUI.initialized) {
    throw new Error("Cannot use format before the game initializes!");
  }
  if (isEND()) return i18n.t("end");
  const number = (value instanceof Decimal) ? value.toNumber() : value;
  return number.toFixed(0);
};

window.formatGain = function formatGain(amount, gain, isMass) {
  const formatType = isMass ? formatMass : format;
  const next = amount.add(gain);
  const logMult = next.max(1).log10().div(amount.max(1).log10());
  if (!isMass && logMult.gte(DC.E1) && amount.gte(DC.EE100)) {
    const ooms2 = logMult.log10().times(20);
    return `(+${format(ooms2)} ${i18n.t("ooms")}^2/${i18n.t("sec")})`;
  }
  const mult = next.div(amount);
  if (mult.gte(DC.E1) && amount.gte(DC.E100)) {
    const ooms = mult.log10().times(20);
    return `(+${format(ooms)} ${i18n.t("ooms")}/${i18n.t("sec")})`;
  }
  return `(+${formatType(gain)}/${i18n.t("sec")})`;
};

// For i18n
window.checkSingle = function checkSingle(decimal) {
  return decimal.eq(1) ? 1 : 0;
};