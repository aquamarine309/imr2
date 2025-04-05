import { DC } from "@/core/constants";

export const rank = {
  id: "rank",
  name: "Rank",
  isUnlocked() {
    return true;
  },
  requirement(amount) {
    return Decimal.pow10(Scaling.rank.scaleEvery(amount)
      .timesEffectsOf(
        RankType.tier.unlocks.reduceRankReq,
        Challenge(5).reward
      ).pow(1.15)
    ).times(10);
  },
  bulk(value) {
    if (value.lt(10)) return DC.D0;
    return Scaling.rank.scaleEvery(
      value.div(10).log10().root(1.15)
        .dividedByEffectsOf(
          RankType.tier.unlocks.reduceRankReq,
          Challenge(5).reward
        ), true
    ).add(1).floor();
  },
  get scaling() {
    return Scaling.rank;
  },
  get noReset() {
    return RageUpgrade(3).canBeApplied;
  },
  get autoUnlocked() {
    return RageUpgrade(4).canBeApplied;
  },
  get isDisabled() {
    return Challenge(5).canBeApplied;
  },
  unlocks: [
    {
      id: "unlockMuscler",
      requirement: 1,
      description: "Unlock mass upgrade 1."
    },
    {
      id: "unlockBooster",
      requirement: 2,
      description: () => `Unlock mass upgrade 2, reduce mass upgrade 1 scaling by ${formatPercents(0.2, 0)}.`,
      effect: 0.8
    },
    {
      id: "unlockStronger",
      requirement: 3,
      description: () => `Unlock mass upgrade 3, reduce mass upgrade 2 scaling by ${formatPercents(0.2, 0)}, and mass upgrade 1 boosts itself.`,
      effects: {
        cost: 0.8,
        boost: () => MassUpgrade.muscler.boughtAmount.div(20)
      },
      mainEffect: "boost",
      formatEffect: value => `+${format(value)}`
    },
    {
      id: "mu3cheaper",
      requirement: 4,
      description: () => `reduce mass upgrade 3 scaling by ${formatPercents(0.2, 0)}.`,
      effect: 0.8
    },
    {
      id: "mu2boost",
      requirement: 5,
      description: "mass upgrade 2 boosts itself.",
      effect: () => MassUpgrade.booster.boughtAmount.div(40),
      formatEffect: value => `+${format(value)}`
    },
    {
      id: "rankBoostsMass",
      requirement: 6,
      description: `boost mass gain by (x+${formatInt(1)})^${formatInt(2)}, where x is rank.`,
      effect: () => overflow(RankType.rank.amount.add(1)
        .pow(RankType.rank.unlocks.improveRank6.effectOrDefault(2)), DC.EE100, DC.D0_5),
      formatEffect: value => formatX(value)
    },
    {
      id: "tripleMassGain",
      requirement: 13,
      description: "triple mass gain.",
      effect: 3
    },
    {
      id: "doubleRPGain",
      requirement: 14,
      description: "double Rage Powers gain.",
      effect: 2
    },
    {
      id: "improveRank6",
      requirement: 17,
      description: () => `Rank 6 reward effect is better. [(x+${formatInt(1)})^${formatInt(2)} -> (x+${formatInt(1)})^x^${formatInt(1)}/${formatInt(3)}]`,
      effect: () => RankType.rank.amount.add(1).cbrt(),
      formatEffect: value => formatX(RankType.rank.amount.add(1).pow(value.minus(DC.D2)))
    },
    {
      id: "mu3softcap",
      requirement: 34,
      description: "mass upgrade 3 softcaps 1.2x later.",
      effect: 2
    },
    {
      id: "rankBoostTickPower",
      requirement: 40,
      description: "adds tickspeed power based on ranks.",
      effect: () => {
        const root = Effects.min(
          2,
          RankType.rank.unlocks.improveRank40,
          RankType.rank.unlocks.overpowerRank40
        );
        return RankType.rank.amount.root(root).div(100);
      },
      formatEffect: value => `+${formatPercents(value)}`
    },
    {
      id: "rankBoostRP",
      requirement: 45,
      description: "rank boosts Rage Powers gain.",
      effect: () => RankType.rank.amount.add(1).pow(1.5),
      formatEffect: value => formatX(value)
    },
    {
      id: "improveRank40",
      requirement: 90,
      description: "rank 40 reward is stronger.",
      effect: 1.6
    },
    {
      id: "massGainPower",
      requirement: 180,
      description: () => `mass gain is raised by ${format(1.025, 3)}.`,
      effect: 1.025
    },
    {
      id: "overpowerRank40",
      requirement: 220,
      description: "rank 40 reward is overpowered.",
      effect: 1
    },
    {
      id: "quarkGain",
      requirement: 300,
      description: "rank multiplies quark gain.",
      effect: () => RankType.rank.amount.add(1),
      formatEdfect: value => formatX(value)
    },
    {
      id: "massGain",
      requirement: 380,
      description: "rank multiplies mass gain.",
      effect: () => Softcap.power(RankType.rank.amount.minus(379).pow(1.5).powEffectOf(
        RankType.tier.unlocks.tierBoostRank380
      ), DC.E3, DC.D0_5).pow10(),
      formatEffect: value => formatX(value)
    },
    {
      id: "massSoftcap",
      requirement: 800,
      description: `make mass gain softcap ${formatPercents(0.0025, 2)} weaker based on rank, hardcaps at ${formatPercents(0.25, 0)}.`,
      effect: () => DC.D2.minus(Softcap.power(RankType.rank.amount.minus(799).times(0.0025).add(1), DC.D1_25, DC.D0_5)).clampMin(DC.D0_75),
      formatEffect: value => formatPercents(DC.D1.minus(value))
    }
  ]
};