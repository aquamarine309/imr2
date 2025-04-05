import { DC } from "./constants";

export const Stars = {
  get isUnlocked() {
    return GameElement(36).canBeApplied;
  },

  get boost() {
    const mult1 = GameElement(48).effectOrDefault(DC.D1);
    const rank = Softcap.power(RankType.rank.amount, DC.D2_5E6, DC.D0_25).times(mult1);
    const tier = Softcap.power(RankType.tier.amount, DC.D1_5E5, DC.D0_25).times(mult1);
    let tetr = Softcap.power(RankType.tetr.amount, DC.D3E4, DC.D0_15).times(mult1);
    tetr = Softcap.mult(tetr, DC.D5, NeutronUpgrade.s2.effectOrDefault(DC.D0_2));
    tetr = Softcap.power(tetr, DC.D9, DC.D0_3);
    const pent = DC.D0;
    let boost = Currency.stars.value.times(mult1).max(1).log10().add(1).pow(
      rank.times(tier.pow(2)).add(1).pow(tetr.add(1).pow(5 / 9).times(0.25)
        .times(pent.pow(0.85).times(0.0125).add(1))));
    boost = Softcap.dilation(boost, DC.EE15, DC.D0_95);
    boost = Softcap.dilation(boost, DC.E5E22, DC.D0_95);
    boost = Softcap.dilation(boost, DC.EE24, DC.D0_91);
    boost = Softcap.dilation(boost, DC.EE70, DC.D0_91);
    return boost;
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
    const power = DC.D1_5.timesEffectsOf(
      GameElement(50),
      NeutronUpgrade.s3
    );
    let gain = (this.tier === 4 ? DC.D0 : StarGenerator(this.tier + 1).amount).add(1).pow(power);
    if (this.tier === 4) {
      gain = gain.timesEffectsOf(
        GameElement(49),
        NeutronUpgrade.s1
      );
    }
    gain = gain.timesEffectsOf(
      DilationUpgrade.starBoost,
      GameElement(54),
      PhotonUpgrade[3]
    );
    gain = gain.times(StarBoosts.effect);
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
    const auto = NeutronUpgrade.qol4.isBought;
    if (auto) {
      while (StarGenerators.next?.canBeUnlocked) {
        StarGenerators.next.unlock();
      }
      StarBoosts.purchase(true);
    }
    for (let i = 0; i < 5; i++) {
      const generator = StarGenerator(i);
      generator.amount = generator.amount.add(generator.gainForDiff(diff));
    }
    Currency.stars.tick(diff);
  }
};

export const StarBoosts = {
  get isUnlocked() {
    return NeutronUpgrade.s4.isBought && StarGenerators.next === undefined;
  },
  
  get base() {
    return DC.D2.timesEffectOf(GameElement(57));
  },
  
  get amount() {
    return player.stars.boosts;
  },
  
  set amount(value) {
    player.stars.boosts = value;
  },
  
  get effect() {
    if (!StarBoosts.isUnlocked) return DC.D1;
    return Softcap.dilation(StarBoosts.base.pow(StarBoosts.amount), DC.E3E18, DC.D0_95);
  },
  
  get baseCost() {
    return DC.E8000;
  },
  
  get costMult() {
    return DC.E100;
  },
  
  get cost() {
    return StarBoosts.costMult.pow(StarBoosts.amount.pow(DC.D1_25)).times(StarBoosts.baseCost);
  },
  
  get bulk() {
    return Currency.quark.value.div(StarBoosts.baseCost).log(StarBoosts.costMult).clampMin(0).pow(DC.D0_8).add(1).floor();
  },
  
  get isAffordable() {
    return Currency.quark.value.gte(StarBoosts.cost);
  },
  
  purchase(auto = false) {
    if (!StarBoosts.isAffordable) return;
    if (auto) {
      StarBoosts.amount = StarBoosts.amount.max(StarBoosts.bulk);
    } else {
      StarBoosts.amount = StarBoosts.amount.add(1);
    }
  }
};