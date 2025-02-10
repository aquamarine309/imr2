import { DC } from "./constants";

export const Stars = {
  get isUnlocked() {
    return GameElement(36).canBeApplied;
  },

  get boost() {
    const mult1 = GameElement(48).effectOrDefault(DC.D1);
    const rank = softcap(RankType.rank.amount, DC.D2_5E6, DC.D0_25, SOFTCAP_TYPE.POWER).times(mult1);
    const tier = softcap(RankType.tier.amount, DC.D1_5E5, DC.D0_25, SOFTCAP_TYPE.POWER).times(mult1);
    let tetr = softcap(RankType.tetr.amount, DC.D3E4, DC.D0_15, SOFTCAP_TYPE.POWER).times(mult1);
    tetr = softcap(tetr, DC.D5, DC.D0_2, SOFTCAP_TYPE.MULT);
    tetr = softcap(tetr, DC.D9, DC.D0_3, SOFTCAP_TYPE.POWER);
    const pent = DC.D0;
    let boost = Currency.stars.value.times(mult1).max(1).log10().add(1).pow(
      rank.times(tier.pow(2)).add(1).pow(tetr.add(1).pow(5 / 9).times(0.25)
        .times(pent.pow(0.85).times(0.0125).add(1))));
    boost = softcap(boost, DC.EE15, DC.D0_95, SOFTCAP_TYPE.DILATION);
    boost = softcap(boost, DC.E5E22, DC.D0_95, SOFTCAP_TYPE.DILATION);
    boost = softcap(boost, DC.EE24, DC.D0_91, SOFTCAP_TYPE.DILATION);
    boost = softcap(boost, DC.EE70, DC.D0_91, SOFTCAP_TYPE.DILATION);
    return boost;
  },

  get boosts() {
    return player.stars.boosts;
  },

  set boosts(value) {
    player.stars.boosts = value;
  }
};

class StarGeneratorState {
  constructor(tier) {
    const GENERATOR_COSTS = [DC.E225, DC.E280, DC.E320, DC.E430, DC.E870];
    this._cost = GENERATOR_COSTS[tier];
    this.tier = tier;
  }

  static createAccessor() {
    const index = Array.range(0, 5).map(tier => new this(tier));
    const accessor = tier => index[tier];
    accessor.index = index;
    return accessor;
  }

  get cost() {
    return this._cost;
  }

  get amount() {
    return player.stars.generators[this.tier];
  }

  set amount(value) {
    player.stars.generators[this.tier] = value;
  }

  get isUnlocked() {
    return StarGenerators.unlocked >= this.tier;
  }

  get canBeUnlocked() {
    return !this.isUnlocked && Currency.quark.gte(this.cost);
  }

  unlock() {
    if (!this.canBeUnlocked) return;
    Currency.quark.subtract(this.cost);
    player.stars.unlocked = this.tier;
  }

  get gainPerSecond() {
    if (!this.isUnlocked) return DC.D0;
    const power = DC.D1_5.timesEffectOf(GameElement(50));
    let gain = (this.tier === 4 ? DC.D0 : StarGenerator(this.tier + 1).amount).add(1).pow(power);
    if (this.tier === 4) {
      gain = gain.timesEffectOf(GameElement(49));
    }
    gain = gain.timesEffectsOf(
      DilationUpgrade.starBoost,
      GameElement(54)
    );
    return gain;
  }

  gainForDiff(diff) {
    return this.gainPerSecond.times(diff);
  }

  reset() {
    this.amount = DC.D0;
  }
}

export const StarGenerator = StarGeneratorState.createAccessor();

export const StarGenerators = {
  all: StarGenerator.index,

  get unlocked() {
    return player.stars.unlocked;
  },

  get next() {
    return StarGenerator(StarGenerators.unlocked + 1);
  },

  tick(diff) {
    for (let i = 0; i < 5; i++) {
      const generator = StarGenerator(i);
      generator.amount = generator.amount.add(generator.gainForDiff(diff));
    }
    Currency.stars.tick(diff);
  }
};