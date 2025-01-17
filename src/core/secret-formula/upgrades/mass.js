import { DC } from "@/core/constants";

export const mass = {
  muscler: {
    id: "muscler",
    name: "Muscler",
    get currency() {
      return Currency.mass;
    },
    get baseCost() {
      return DC.E1;
    },
    get costMult() {
      return DC.D1_5.powEffectsOf(
        RankType.rank.unlocks.unlockBooster,
        RankType.tier.unlocks.upgradeLessCost
      );
    },
    get scaling() {
      return Scaling.massUpgrade;
    },
    cost(amount) {
      const $ = MassUpgrade.muscler.config;
      return getLinearCost(
        $.scaling.scaleEvery(amount),
        $.baseCost,
        $.costMult
      );
    },
    bulk(currency) {
      const $ = MassUpgrade.muscler.config;
      return $.scaling.scaleEvery(
        getLinearBulk(currency, $.baseCost, $.costMult), true);
    },
    get freeAmount() {
      return RageUpgrade(0).effectOrDefault(DC.D0);
    },
    get isUnlocked() {
      return RankType.rank.unlocks.unlockMuscler.canBeApplied;
    },
    get forceVisible() {
      return PlayerProgress.rageUnlocked();
    },
    get autoUnlocked() {
      return RageUpgrade(2).canBeApplied;
    },
    get power() {
      let power = DC.D1;
      power = power.plusEffectOf(RankType.rank.unlocks.unlockStronger.effects.boost);
      power = power.timesEffectOf(MassUpgrade.booster);
      return power;
    },
    formatPower: value => `+${formatMass(value)}`,
    effect(amount, power) {
      return amount.times(power);
    },
    formatEffect: value => `+${formatMass(value)} to mass gain`,
    upgClass: "i-mass-upgrade-1"
  },
  booster: {
    id: "booster",
    name: "Booster",
    get currency() {
      return Currency.mass;
    },
    get baseCost() {
      return DC.E2;
    },
    get costMult() {
      return DC.D4.powEffectsOf(
        RankType.rank.unlocks.unlockStronger.effects.cost,
        RankType.tier.unlocks.upgradeLessCost
      );
    },
    get scaling() {
      return Scaling.massUpgrade;
    },
    cost(amount) {
      const $ = MassUpgrade.booster.config;
      return getLinearCost(
        $.scaling.scaleEvery(amount),
        $.baseCost,
        $.costMult
      );
    },
    bulk(currency) {
      const $ = MassUpgrade.booster.config;
      return $.scaling.scaleEvery(
        getLinearBulk(currency, $.baseCost, $.costMult), true);
    },
    get freeAmount() {
      return RageUpgrade(1).effectOrDefault(DC.D0);
    },
    get isUnlocked() {
      return RankType.rank.unlocks.unlockBooster.canBeApplied;
    },
    get forceVisible() {
      return PlayerProgress.rageUnlocked();
    },
    get autoUnlocked() {
      return RageUpgrade(2).canBeApplied;
    },
    get power() {
      let power = DC.D2;
      power = power.plusEffectOf(RankType.rank.unlocks.mu2boost);
      power = power.powEffectOf(MassUpgrade.stronger);
      return power;
    },
    formatPower: value => `+${format(value)}x`,
    effect(amount, power) {
      return amount.times(power).add(1);
    },
    formatEffect: value => `${formatX(value)} to Muscler Power`,
    upgClass: "i-mass-upgrade-2"
  },
  stronger: {
    id: "stronger",
    name: "Stronger",
    get currency() {
      return Currency.mass;
    },
    get baseCost() {
      return DC.E3;
    },
    get costMult() {
      return DC.D9.powEffectsOf(
        RankType.rank.unlocks.mu3cheaper,
        RankType.tier.unlocks.upgradeLessCost
      );
    },
    get scaling() {
      return Scaling.massUpgrade;
    },
    cost(amount) {
      const $ = MassUpgrade.stronger.config;
      return getLinearCost(
        $.scaling.scaleEvery(amount),
        $.baseCost,
        $.costMult
      );
    },
    bulk(currency) {
      const $ = MassUpgrade.stronger.config;
      return $.scaling.scaleEvery(
        getLinearBulk(currency, $.baseCost, $.costMult), true);
    },
    get freeAmount() {
      return RageUpgrade(6).effectOrDefault(DC.D0);
    },
    get isUnlocked() {
      return RankType.rank.unlocks.unlockStronger.canBeApplied;
    },
    get forceVisible() {
      return PlayerProgress.rageUnlocked();
    },
    get autoUnlocked() {
      return RageUpgrade(2).canBeApplied;
    },
    get power() {
      return DC.D1;
    },
    formatPower: value => `+${formatPow(value)}`,
    effect(amount, power) {
      let effect = amount.times(power).add(1);

      const softcaps = MassUpgradeSoftcap.stronger;
      effect = softcap(effect, softcaps[0].start, softcaps[0].scale, SOFTCAP_TYPE.POWER);
      return effect;
    },
    softcapLevel(effect) {
      const softcaps = MassUpgradeSoftcap.stronger;
      return MassUpgradeSoftcap.softcapLevel(effect, softcaps);
    },
    formatEffect: value => `${formatPow(value)} to Booster Power`,
    upgClass: "i-mass-upgrade-3"
  },
  overpower: {
    id: "overpower",
    name: "Overpower",
    get currency() {
      return Currency.mass;
    },
    get baseCost() {
      return DC.E100;
    },
    get costMult() {
      return DC.D1_5;
    },
    get scaling() {
      return Scaling.overpower;
    },
    get isUnlocked() {
      return false;
    },
    get autoUnlocked() {
      return RageUpgrade(2).canBeApplied;
    },
    cost(amount) {
      return amount;
    },
    bulk(currency) {
      return currency;
    },
    get power() {
      return DC.D1;
    },
    formatPower: () => "Unknown",
    effect(amount, power) {
      return amount.times(power).add(1);
    },
    formatEffect: () => "Unknown",
    upgClass: "i-mass-upgrade-4"
  },
  tickspeed: {
    id: "tickspeed",
    name: "Tickspeed",
    get currency() {
      return Currency.ragePowers;
    },
    get baseCost() {
      return DC.D1;
    },
    get costMult() {
      return DC.D2;
    },
    get scaling() {
      return Scaling.tickspeed;
    },
    cost(amount) {
      const $ = MassUpgrade.tickspeed.config;
      return getLinearCost(
        $.scaling.scaleEvery(amount),
        $.baseCost,
        $.costMult
      );
    },
    bulk(currency) {
      const $ = MassUpgrade.tickspeed.config;
      return $.scaling.scaleEvery(
        getLinearBulk(currency, $.baseCost, $.costMult), true);
    },
    get isUnlocked() {
      return PlayerProgress.rageUnlocked();
    },
    get power() {
      let power = DC.D1_5;
      power = power.plusEffectsOf(
        RankType.tier.unlocks.tickPowerFromTier,
        RankType.rank.unlocks.rankBoostTickPower
      );
      return power;
    },
    formatPower: value => (value.gte(10) ? formatX(value) : formatPercents(value.minus(1))),
    effect(amount, power) {
      return power.pow(amount);
    },
    formatEffect: value => `${formatX(value)} to mass gain`,
    upgClass: "i-tickspeed"
  }
};