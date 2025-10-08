import { DC } from "./constants";

// It was used to calculate bulk before, but now it will never be used
// because of scalings.
// - aquamarine
/**
 * LinearCostScaling is a helper class for costs that scale linearly. If we
 * know the available resources, initial cost, and cost multiplier, we can
 * figure out the maximum amount of purchases, and also the resulting total
 * cost and cost multiplier.
 *
 * i = initial cost
 * m = cost multiplier
 * p = purchases
 * t = total cost
 *
 * t = i * (1 - m^p) / (1 - m)
 * p = floor(log(1 + t * (m - 1) / i) / log(m))
 */
window.LinearCostScaling = class LinearCostScaling {
  /**
   * @param {Decimal} resourcesAvailable amount of available resources
   * @param {Decimal} initialCost current cost
   * @param {Decimal} costMultiplier current cost multiplier
   * @param {Decimal} maxPurchases max amount of purchases
   * @param {Boolean} free signifies if the purchase is free -> if we only need to consider the last cost
   */
  constructor(resourcesAvailable, initialCost, costMultiplier, maxPurchases = Decimal.dNumberMax, free = false) {
    if (free) {
      this._purchases =
        resourcesAvailable.div(initialCost).log10().div(Math.log10(costMultiplier).add(1)).floor().min(maxPurchases);
    } else {
      this._purchases =
        resourcesAvailable.mul(costMultiplier.sub(1)).div(initialCost).add(1).log10()
          .div(costMultiplier.log10()).floor().min(maxPurchases);
    }
    this._totalCostMultiplier = Decimal.pow(costMultiplier, this._purchases);
    if (free) {
      this._totalCost = initialCost.mul(costMultiplier.pow(this._purchases.sub(1)));
    } else {
      this._totalCost = initialCost.mul(DC.D1.minus(this._totalCostMultiplier)).div(DC.D1.sub(costMultiplier));
    }
  }

  get purchases() {
    return this._purchases;
  }

  get totalCostMultiplier() {
    return this._totalCostMultiplier;
  }

  get totalCost() {
    return this._totalCost;
  }
};

window.getLinearCost = function getLinearCost(amount, baseCost, costMult) {
  return baseCost.times(costMult.pow(amount));
};

window.getLinearBulk = function getLinearCost(currency, baseCost, costMult) {
  return currency.div(baseCost).clampMin(1).log(costMult);
};

// I didn't want to add these two functions.
// But it was added because Mrredshark was used too often
// So you might find some ugly constants in the constants.js.
// That was a stopgap measure before I added uni.
window.mlt = function(x) {
  return DC.D1_5E1000000056.pow(x);
};

window.uni = function(x) {
  return DC.D1_5E56.times(x);
};