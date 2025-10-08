import { DC } from "./constants";
import { GameMechanicState } from "./game-mechanics";

export const Radiation = {
  get isUnlocked() {
    return NeutronUpgrade.unl1.canBeApplied;
  },

  tick(diff) {
    if (!this.isUnlocked) return;
    for (let i = 0; i < RadiationType.all.length; i++) {
      RadiationType.all[i].tick(diff);
    }
    Currency.frequency.tick(diff);
  },

  get frequencyEffect() {
    if (!this.isUnlocked) return DC.D1;
    return Currency.frequency.value.add(1).cbrt();
  }
};

class RadiationBoostState extends GameMechanicState {
  constructor(config, type) {
    const configCopy = { ...config };
    const effect = configCopy.effect;
    configCopy.description = () => this.description;
    configCopy.effect = () => effect(this.amount);
    super(configCopy);
    this.type = type;
  }

  get isEffectActive() {
    return this.type.isUnlocked && !FermionType.leptons.fermions.neutTau.canBeApplied;
  }

  get amount() {
    // If id is 0, when total is 1 or 4 or 7 ... can add one boost
    // If id is 1 or 2, just "translate" it to like id 0 by subtracting its id
    // Don't worry that it may cause amount negative, that's impossible
    let base = this.type.total.minus(this.id).add(2).div(3).floor();
    if (this.type.id * 3 + this.id < 8) {
      base = base.plusEffectOf(RadiationType.infrared.boosts[2]);
    }
    if (this.type.id * 3 + this.id < 17) {
      base = base.plusEffectOf(RadiationType.xRay.boosts[2]);
    }
    base = base.plusEffectOf(Challenge(12).reward);
    return base;
  }

  get description() {
    return i18n.t(`radiation_${this.type.config.key}_boost_${this.id}_description`);
  }

  get title() {
    return i18n.t(`radiation_${this.type.config.key}_boost_${this.id}_title`);
  }
}

class RadiationTypeState extends GameMechanicState {
  constructor(config) {
    super(config);
    this.boosts = mapGameData(
      config.boosts,
      boostConfig => new RadiationBoostState(boostConfig, this)
    );
  }

  get name() {
    return i18n.t(this.config.key);
  }

  get requirement() {
    return this.config.requirement;
  }

  get isUnlocked() {
    return this.id === 0 || Currency.frequency.gte(this.requirement);
  }

  get effectValue() {
    if (!this.isUnlocked) return DC.D1;
    return this.distance.add(1).cbrt();
  }

  get isEffectActive() {
    return this.isUnlocked;
  }

  get data() {
    return player.supernova.radiation.unlocks[this.id];
  }

  get distance() {
    return this.data.distance;
  }

  set distance(value) {
    this.data.distance = value;
  }

  get amplitude() {
    return this.data.amplitude;
  }

  set amplitude(value) {
    this.data.amplitude = value;
  }

  get velocity() {
    return this.data.velocity;
  }

  set velocity(value) {
    this.data.velocity = value;
  }

  get total() {
    return this.amplitude.plus(this.velocity);
  }

  get distanceGain() {
    if (!this.isUnlocked) return DC.D0;
    let gain = DC.D1;
    if (this.id + 1 < RadiationType.all.length) {
      gain = gain.timesEffectOf(RadiationType.all[this.id + 1]);
    }
    gain = gain.timesEffectsOf(
      this.boosts[0],
      RankType.pent.unlocks.tetrBoostRadiation,
      NeutronUpgrade.rad2,
      NeutronUpgrade.rad5
    );
    if (this.id + 1 < RadiationType.all.length && RadiationType.all[this.id + 1].isUnlocked) {
      gain = gain.timesEffectOf(NeutronUpgrade.rad1);
    }
    return gain;
  }

  get cheap() {
    return Effects.product(
      NeutronUpgrade.rad3,
      FermionType.quarks.fermions.top.reward
    );
  }

  boostCost(amount, idx) {
    const order = this.id * 2 + idx;
    const base = DC.D2.add(0.5 * order);
    const pow = DC.D1_3.add(0.05 * order);
    const mult = DC.E1.times(Math.pow(0.5 * order + 1, 2));
    const cheap = this.cheap;
    return base.pow(amount.div(cheap).pow(pow)).times(mult);
  }

  boostBulk(idx) {
    const order = this.id * 2 + idx;
    const base = DC.D2.add(0.5 * order);
    const pow = DC.D1_3.add(0.05 * order);
    const mult = DC.E1.times(Math.pow(0.5 * order + 1, 2));
    const cheap = this.cheap;
    const currency = this.distance;
    if (currency.lt(mult)) return DC.D0;
    return currency.div(mult).log(base).root(pow).times(cheap).floor().add(1);
  }

  get amplitudeCost() {
    return this.boostCost(this.amplitude, 0);
  }

  get velocityCost() {
    return this.boostCost(this.velocity, 1);
  }

  get amplitudeBulk() {
    return this.boostBulk(0);
  }

  get velocityBulk() {
    return this.boostBulk(1);
  }

  purchaseAmplitude() {
    if (this.distance.lt(this.amplitudeCost)) return;
    const bulk = this.amplitudeBulk;
    this.distance = this.distance.minus(this.amplitudeCost);
    this.amplitude = bulk;
  }

  purchaseVelocity() {
    if (this.distance.lt(this.velocityCost)) return;
    const bulk = this.velocityBulk;
    this.distance = this.distance.minus(this.velocityCost);
    this.velocity = bulk;
  }

  tick(diff) {
    if (!this.isUnlocked) return;
    this.distance = this.distance.add(this.distanceGain.times(diff));
  }
}

export const RadiationType = mapGameDataToObject(
  GameDatabase.supernova.radiation,
  config => new RadiationTypeState(config)
);