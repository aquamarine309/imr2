import { DC } from "@/core/constants";

export const rage = [
  {
    id: 0,
    description: "Boosters add Musclers.",
    cost: DC.D1,
    effect: () => MassUpgrade.booster.totalAmount,
    formatEffect: value => `+${format(value, 0)} Musclers`,
  },
  {
    id: 1,
    description: "Strongers add Boosters.",
    cost: DC.E1,
    effect: () => MassUpgrade.stronger.totalAmount,
    formatEffect: value => `+${format(value, 0)} Boosters`
  },
  {
    id: 2,
    description: "You can automatically buy mass upgrades.",
    cost: DC.D25
  },
  {
    id: 3,
    description: "Ranks no longer reset anything.",
    cost: DC.D50
  },
  {
    id: 4,
    description: "You can automatically rank up.",
    cost: DC.E4
  },
  {
    id: 5,
    description: "You can automatically tier up.",
    cost: DC.E5
  },
  {
    id: 6,
    description: "For every 3 tickspeeds add Stronger.",
    cost: DC.E7,
    effect: () => MassUpgrade.tickspeed.boughtAmount.div(3).plusEffectOf(GameElement(38)),
    formatEffect: value => `+${format(value, 0)} Strongers`
  },
  {
    id: 7,
    description: "Super and Hyper mass upgrade scalings are weaker based on Rage Power.",
    cost: DC.E15,
    effect: () => {
      let exp = Currency.ragePowers.value.clampMin(1).log10().clampMin(1).log10().pow(1.25);
      exp = Softcap.power(exp, DC.D2_5, DC.D0_5);
      return DC.D0_9.pow(exp);
    },
    formatEffect: value => formatPercents(DC.D1.minus(value)),
    softcapped: value => value.lte(0.768433471421)
  },
  {
    id: 8,
    description: () => `Stronger power is increased by +${formatPow(0.25, 2)}.`,
    effect: DC.D0_25,
    cost: DC.E31,
    isUnlocked: () => PlayerProgress.blackHoleUnlocked
  },
  {
    id: 9,
    description: () => `Super Rank scaling is ${formatPercents(0.2, 0)} weaker.`,
    effect: DC.D0_8,
    cost: DC.E43,
    isUnlocked: () => PlayerProgress.blackHoleUnlocked
  },
  {
    id: 10,
    description: "Black Hole mass's gain is boosted by Rage Powers.",
    cost: DC.E72,
    effect: () => overflow(
      Softcap.dilation(Softcap.power(Currency.ragePowers.value.add(1).pow(0.1),
        DC.E4000, 0.1),
      DC.E1_5E31, DC.D0_95),
      DC.EE185, DC.D0_5
    ),
    formatEffect: value => formatX(value),
    softcapped: value => value.gte(DC.E4000),
    isUnlocked: () => PlayerProgress.atomUnlocked()
  },
  {
    id: 11,
    description: "OoMs of Rage powers increase stronger power at a reduced rate.",
    cost: DC.E120,
    effect: () => Softcap.power(Currency.ragePowers.value.clampMin(1).log10(), 200, 0.75).div(1000),
    formatEffect: value => `+${formatPow(value)}`,
    softcapped: value => value.gte(0.2),
    isUnlocked: () => Challenges.isUnlocked
  },
  {
    id: 12,
    description: () => `Mass gain softcap starts ${formatX(3, 0)} later for every Rank you have.`,
    cost: DC.E180,
    effect: () => DC.D3.pow(RankType.rank.amount),
    formatEffect: value => formatX(value),
    isUnlocked: () => Challenges.isUnlocked
  },
  {
    id: 13,
    description: () => `Hyper Tickspeed starts ${formatInt(50)} later.`,
    cost: DC.E320,
    effect: 50,
    isUnlocked: () => Challenges.isUnlocked
  },
  {
    id: 14,
    description: "Mass boosts Atom gain.",
    cost: DC.E480,
    effect: () => Currency.mass.value.clampMin(1).log10().pow(1.25),
    formatEffect: value => formatX(value),
    isUnlocked: () => PlayerProgress.atomUnlocked()
  }
];