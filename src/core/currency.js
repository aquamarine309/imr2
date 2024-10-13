import { DC } from "./constants";

/**
 * @abstract
 */
class MathOperations {
  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  add(left, right) { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  subtract(left, right) { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  multiply(left, right) { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  divide(left, right) { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  max(left, right) { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  min(left, right) { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  eq(left, right) { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  gt(left, right) { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  gte(left, right) { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  lt(left, right) { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  lte(left, right) { throw new NotImplementedError(); }
}

MathOperations.number = new class NumberMathOperations extends MathOperations {
  add(left, right) { return left + right; }
  subtract(left, right) { return left - right; }
  multiply(left, right) { return left * right; }
  divide(left, right) { return left / right; }
  max(left, right) { return Math.max(left, right); }
  min(left, right) { return Math.min(left, right); }
  eq(left, right) { return left === right; }
  gt(left, right) { return left > right; }
  gte(left, right) { return left >= right; }
  lt(left, right) { return left < right; }
  lte(left, right) { return left <= right; }
}();

MathOperations.decimal = new class DecimalMathOperations extends MathOperations {
  add(left, right) { return Decimal.add(left, right); }
  subtract(left, right) { return Decimal.subtract(left, right); }
  multiply(left, right) { return Decimal.multiply(left, right); }
  divide(left, right) { return Decimal.divide(left, right); }
  max(left, right) { return Decimal.max(left, right); }
  min(left, right) { return Decimal.min(left, right); }
  eq(left, right) { return Decimal.eq(left, right); }
  gt(left, right) { return Decimal.gt(left, right); }
  gte(left, right) { return Decimal.gte(left, right); }
  lt(left, right) { return Decimal.lt(left, right); }
  lte(left, right) { return Decimal.lte(left, right); }
}();

/**
 * @abstract
 */
export class Currency {
  /**
   * @abstract
   */
  get value() { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  set value(value) { throw new NotImplementedError(); }

  /**
   * @abstract
   * @type {MathOperations}
   */
  get operations() { throw new NotImplementedError(); }

  add(amount) {
    this.value = this.operations.add(this.value, amount);
  }

  subtract(amount) {
    this.value = this.operations.max(this.operations.subtract(this.value, amount), 0);
  }

  multiply(amount) {
    this.value = this.operations.multiply(this.value, amount);
  }

  divide(amount) {
    this.value = this.operations.divide(this.value, amount);
  }

  eq(amount) {
    return this.operations.eq(this.value, amount);
  }

  gt(amount) {
    return this.operations.gt(this.value, amount);
  }

  gte(amount) {
    return this.operations.gte(this.value, amount);
  }

  lt(amount) {
    return this.operations.lt(this.value, amount);
  }

  lte(amount) {
    return this.operations.lte(this.value, amount);
  }

  purchase(cost) {
    if (!this.gte(cost)) return false;
    this.subtract(cost);
    return true;
  }

  bumpTo(value) {
    this.value = this.operations.max(this.value, value);
  }

  dropTo(value) {
    this.value = this.operations.min(this.value, value);
  }

  get startingValue() { throw new NotImplementedError(); }

  get gainPerSecond() { throw new NotImplementedError(); }

  reset() {
    this.value = this.startingValue;
  }

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  tick(diff) { throw new NotImplementedError(); }

  gain() {
    this.add(this.gainPerSecond);
  }
}

/**
 * @abstract
 */
// eslint-disable-next-line no-unused-vars
class NumberCurrency extends Currency {
  get operations() { return MathOperations.number; }
  get startingValue() { return 0; }
  tick(diff) {
    this.add(this.gainPerSecond * diff);
  }
}

/**
 * @abstract
 */
class DecimalCurrency extends Currency {
  get operations() { return MathOperations.decimal; }
  get sign() { return this.value.sign; }
  get layer() { return this.value.layer; }
  get mag() { return this.value.mag; }
  get startingValue() { return DC.D0; }
  get gainPerSecond() { throw new NotImplementedError(); }
  tick(diff) {
    this.add(this.gainPerSecond.times(diff));
  }
}

window.DecimalCurrency = DecimalCurrency;

Currency.mass = new class extends DecimalCurrency {
  get value() {
    return player.mass;
  }

  set value(value) {
    player.mass = value;
  }

  get gainPerSecond() {
    let gain = DC.D1;
    gain = gain.plusEffectOf(MassUpgrade.muscler);
    gain = gain.timesEffectsOf(
      RankType.rank.unlocks.rankBoostsMass,
      RankType.rank.unlocks.tripleMassGain,
      MassUpgrade.tickspeed
    );
    gain = gain.powEffectOf(
      RankType.tier.unlocks.raiseMassGain
    );
    return gain;
  }

  get name() {
    return "Mass";
  }
}();

Currency.ragePowers = new class extends DecimalCurrency {
  get value() {
    return player.ragePowers;
  }

  set value(value) {
    player.ragePowers = value;
  }

  get gainPerSecond() {
    if (Currency.mass.lt(DC.E15)) return DC.D0;
    let gain = Currency.mass.value.div(DC.E15).cbrt();
    gain = gain.timesEffectsOf(
      RankType.rank.unlocks.doubleRPGain,
      RankType.tier.unlocks.tierBoostRP,
      RankType.rank.unlocks.rankBoostRP
    );
    return gain;
  }

  get canReset() {
    return Currency.mass.gte(DC.E15);
  }

  requestReset() {
    if (!this.canReset) return;
    if (ConfirmationTypes.ragePower.option) {
      Modal.confirmation.show({
        options: "ragePower",
        confirmFn: () => this.resetLayer()
      });
    } else {
      this.resetLayer();
    }
  }

  resetLayer(resetOnly = false) {
    if (!resetOnly) {
      this.gain();
    }
    const maxRank = RankType.all.last();
    maxRank.amount = DC.D0;
    maxRank.reset(true);
    Tutorial.ragePower.unlock();
  }

  get name() {
    return "Rage Power";
  }
}();

Currency.darkMatter = new class extends DecimalCurrency {
  get value() {
    return player.darkMatter;
  }

  set value(value) {
    player.darkMatter = value;
  }

  get gainPerSecond() {
    return Currency.ragePowers.value.div(DC.E20).root(4).floor();
  }


  get canReset() {
    return Currency.ragePowers.gte(DC.E20);
  }

  requestReset() {
    if (!this.canReset) return;
    if (ConfirmationTypes.darkMatter.option) {
      Modal.confirmation.show({
        options: "darkMatter",
        confirmFn: () => this.resetLayer()
      });
    } else {
      this.resetLayer();
    }
  }

  resetLayer(resetOnly = false) {
    if (!resetOnly) {
      this.gain();
    }
    RageUpgrades.reset();
    MassUpgrade.tickspeed.reset();
    Currency.ragePowers.reset();
    Currency.ragePowers.resetLayer(true);
    Tutorial.blackHole.unlock();
  }

  get name() {
    return "Dark Matter";
  }
}();

Currency.blackHole = new class extends DecimalCurrency {
  get value() {
    return player.blackHole;
  }

  set value(value) {
    player.blackHole = value;
  }

  get gainPerSecond() {
    return DC.D1;
  }

  get name() {
    return "Black Hole";
  }
}();