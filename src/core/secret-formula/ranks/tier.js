import { DC } from "@/core/constants";

export const tier = {
  id: "tier",
  isUnlocked() {
    return RankType.rank.amount.gte(3) || RankType.tier.amount.gte(1) || PlayerProgress.rageUnlocked();
  },
  get scaling() {
    return Scaling.tier;
  },
  get noReset() {
    return BHUpgrade(3).canBeApplied;
  },
  get autoUnlocked() {
    return RageUpgrade(5).canBeApplied;
  },
  requirement(amount) {
    let req = Scaling.tier.scaleEvery(amount).timesEffectOf(
      RankType.tetr.unlocks.ranksReqAndScaling.effects.tier
    );
    if (AtomUpgrade(9).canBeApplied) {
      req = req.times(DC.D0_5);
    }
    return req.add(2).pow(2).round();
  },
  bulk(currency) {
    let rank = currency.sqrt().minus(2)
      .dividedByEffectOf(RankType.tetr.unlocks.ranksReqAndScaling.effects.tier);
    if (AtomUpgrade(9).canBeApplied) {
      rank = rank.times(DC.D2);
    }
    return Scaling.tier.scaleEvery(rank, true).add(1).floor();
  },
  unlocks: [
    {
      id: "reduceRankReq",
      requirement: 1,
      description: () => `reduce rank requirements by ${formatPercents(0.2, 0)}.`,
      effect: 0.8
    },
    {
      id: "raiseMassGain",
      requirement: 2,
      description: () => `raise mass gain by ${format(1.15, 2)}.`,
      effect: 1.15
    },
    {
      id: "upgradeLessCost",
      requirement: 3,
      description: () => `reduce all mass upgrade scalings by ${formatPercents(0.2, 0)}.`,
      effect: 0.8
    },
    {
      id: "tickPowerFromTier",
      requirement: 4,
      description: () => `adds +${formatPercents(0.05, 0)} tickspeed power for every tier you have, softcaps at +${formatPercents(0.4, 0)}.`,
      effect: () => {
        const tier12 = RankType.tier.unlocks.improveTier4.canBeApplied;
        const effect = RankType.tier.amount.times(tier12 ? 0.1 : 0.05);
        if (tier12) return effect;
        return Softcap.power(effect.add(1), DC.D1_4, DC.D0_75).minus(1);
      },
      formatEffect: value => `+${formatPercents(value)}`
    },
    {
      id: "tierBoostRP",
      requirement: 6,
      description: "boost rage powers based on tiers.",
      effect: () => DC.D2.pow(RankType.tier.amount
        .timesEffectOf(RankType.tier.unlocks.tier6FromDM)),
      formatEffect: value => formatX(value)
    },
    {
      id: "tier6FromDM",
      requirement: 8,
      description: "Tier 6's reward is boosted based on dark matters.",
      effect: () => Currency.darkMatter.value.clampMin(1).log10().add(1).sqrt(),
      formatEffect: value => formatPow(value)
    },
    {
      id: "improveTier4",
      requirement: 12,
      description: "Tier 4's reward is twice as effective and the softcap is removed.",
      effect: 2
    },
    {
      id: "strongerCapWeak",
      requirement: 30,
      description: () => `stronger effect's softcap is ${formatPercents(0.1, 0)} weaker.`,
      effect: 1.1
    },
    {
      id: "tierBoostRank380",
      requirement: 55,
      description: "make rank 380's effect stronger based on tier.",
      effect: () => RankType.tier.amount.clampMin(1).log10().add(1).root(4),
      formatEffect: value => formatPow(value)
    },
    {
      id: "superTetrLater",
      requirement: 100,
      description: () => `Super Tetr scales ${formatInt(5)} later.`,
      effect: 5
    }
  ]
};