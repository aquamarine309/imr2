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
    player.records.maxMass = player.records.maxMass.max(value);
  }

  get gainPerSecond() {
    let gain = DC.D1;
    gain = gain.plusEffectOf(MassUpgrade.muscler);
    gain = gain.timesEffectsOf(
      RankType.rank.unlocks.rankBoostsMass,
      RankType.rank.unlocks.tripleMassGain,
      RankType.rank.unlocks.massGain,
      MassUpgrade.tickspeed,
      BHUpgrade(9)
    );
    gain = gain.times(BlackHole.mult);
    gain = gain.times(Atom.protonMass());
    gain = gain.times(Atom.neutronMass());
    gain = gain.powEffectsOf(
      RankType.tier.unlocks.raiseMassGain,
      Challenge(3).reward,
      RankType.rank.unlocks.massGainPower
    );
    gain = softcap(
      gain,
      MassSoftcap[0].mass,
      MassSoftcap[0].effectValue,
      SOFTCAP_TYPE.POWER
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
    if (Currency.mass.lt(DC.E15) || Challenge(7).isRunning) return DC.D0;
    let gain = Currency.mass.value.div(DC.E15).cbrt();
    gain = gain.timesEffectsOf(
      RankType.rank.unlocks.doubleRPGain,
      RankType.tier.unlocks.tierBoostRP,
      RankType.rank.unlocks.rankBoostRP,
      BHUpgrade(5)
    );
    gain = gain.times(Atom.neutronRP());
    gain = gain.powEffectsOf(
      BHUpgrade(7),
      Challenge(4).reward
    );
    if (Challenge(4).isRunning) {
      gain = gain.pow(0.1);
    }
    return gain;
  }

  get canReset() {
    return Currency.mass.gte(DC.E15);
  }

  requestReset() {
    if (!this.canReset) return;
    if (ConfirmationTypes.ragePower.option) {
      Modal.confirmation.show({
        option: "ragePower",
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
    player.unlocks.ragePower = true;
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
    const c7Running = Challenge(7).isRunning;
    let gain = (c7Running
      ? Currency.mass.value.div(DC.E180)
      : Currency.ragePowers.value.div(DC.E20));
    gain = gain.root(4);
    if (c7Running) {
      gain = gain.root(6);
    }
    gain = gain.times(Atom.electronDM());
    gain = gain.powEffectsOf(
      Challenge(8),
      Challenge(8).reward
    );
    return gain.floor();
  }


  get canReset() {
    return Currency.ragePowers.gte(DC.E20);
  }

  requestReset() {
    if (!this.canReset) return;
    if (ConfirmationTypes.darkMatter.option) {
      Modal.confirmation.show({
        option: "darkMatter",
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
    Currency.blackHole.reset();
    Tutorial.blackHole.unlock();
    player.unlocks.darkMatter = true;
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
    return BlackHole.gain;
  }

  get name() {
    return "Black Hole";
  }
}();

Currency.atoms = new class extends DecimalCurrency {
  get value() {
    return player.atoms;
  }

  set value(value) {
    player.atoms = value;
  }

  get gainPerSecond() {
    const mass = BlackHole.mass;
    let gain = mass.div(DC.D1_5E156);
    if (gain.lt(1)) return DC.D0;
    gain = gain.pow(0.2);
    gain = gain.timesEffectOf(RageUpgrade(14));
    gain = gain.powEffectOf(GameElement(17));
    return gain.floor();
  }

  get canReset() {
    return BlackHole.mass.gte(DC.D1_5E136);
  }

  requestReset() {
    if (!this.canReset) return;
    if (ConfirmationTypes.atom.option) {
      Modal.confirmation.show({
        option: "atom",
        confirmFn: () => this.resetLayer()
      });
    } else {
      this.resetLayer();
    }
  }

  resetLayer(resetOnly = false) {
    if (!resetOnly) {
      this.gain();
      Currency.quark.gain();
    }
    BlackHole.reset();
    BHUpgrades.reset();
    Currency.atomicPower.reset();
    Currency.darkMatter.resetLayer(true);
    Tutorial.atom.unlock();
    player.unlocks.atom = true;
    player.challenges.current = 0;
    EventHub.dispatch(GAME_EVENT.ATOM_RESET);
  }

  get name() {
    return "Atoms";
  }
}();

Currency.quark = new class extends DecimalCurrency {
  get value() {
    return player.quark;
  }

  set value(value) {
    player.quark = value;
  }

  get gainPerSecond() {
    const atoms = Currency.atoms.gainPerSecond;
    if (atoms.lt(1)) return DC.D0;
    let gain = atoms.clampMin(1).log10();
    if (GameElement(1).canBeApplied) {
      gain = DC.D1_25.pow(gain);
    } else {
      gain = gain.pow(1.1).add(1);
    }
    gain = gain.timesEffectsOf(
      BHUpgrade(12),
      AtomUpgrade(7),
      RankType.rank.unlocks.quarkGain,
      GameElement(6)
    );
    return gain.floor();
  }

  get name() {
    return "Quark";
  }
}();

Currency.atomicPower = new class extends DecimalCurrency {
  get value() {
    return player.atomicPower;
  }

  set value(value) {
    player.atomicPower = value;
  }

  get gainPerSecond() {
    return Atom.gainedPower;
  }

  get name() {
    return "Atomic Power";
  }
}();