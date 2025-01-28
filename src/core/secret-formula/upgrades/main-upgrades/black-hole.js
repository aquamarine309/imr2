import { DC } from "@/core/constants";

export const blackHole = [
  {
    id: 0,
    description: "Mass Upgardes no longer spend mass.",
    cost: DC.D1
  },
  {
    id: 1,
    description: "Tickspeeds boost BH Condenser Power.",
    effect: () => MassUpgrade.tickspeed.boughtAmount.add(1).root(8),
    formatEffect: value => formatX(value),
    cost: DC.E1
  },
  {
    id: 2,
    description: "Super Mass Upgrade scales later based on mass of Black Hole.",
    effect: () => softcap(
      Currency.blackHole.value.max(1).log10().pow(1.5),
      DC.E2, DC.C1D3, SOFTCAP_TYPE.POWER
    ).floor(),
    formatEffect: value => `+${format(value, 0)} later`,
    softcapped: value => value.gte(DC.E2),
    cap: DC.D400,
    cost: DC.E2
  },
  {
    id: 3,
    description: "Tiers no longer reset anything.",
    cost: DC.E4
  },
  {
    id: 4,
    description: "You can automatically buy tickspeed and Rage Power upgrades.",
    cost: DC.D5E5
  },
  {
    id: 5,
    description: () => `Gain ${formatPercents(1, 0)} of Rage Power gained from reset per second. Rage Powers are boosted by mass of Black Hole.`,
    effect: () => Currency.blackHole.value.clampMin(1).log10().add(1).pow(2),
    formatEffect: value => formatX(value),
    cost: DC.D2E6
  },
  {
    id: 6,
    description: "Mass gain softcap starts later based on mass of Black Hole.",
    effect: () => BlackHole.mass.add(1).root(3),
    formatEffect: value => `${formatX(value)} later`,
    cost: DC.E13,
    isUnlocked: () => Challenges.isUnlocked
  },
  {
    id: 7,
    description: () => `Raise Rage Power gain by ${format(1.15, 2)}.`,
    effect: 1.15,
    cost: DC.E17,
    isUnlocked: () => Challenges.isUnlocked
  },
  {
    id: 8,
    description: "Stronger Effect's softcap starts later based on unspent Dark Matters.",
    effect: () => Currency.darkMatter.value.clampMin(1).log10().sqrt(),
    formatEffect: value => `+${format(value)} later`,
    cost: DC.E27,
    isUnlocked: () => Challenges.isUnlocked
  },
  {
    id: 9,
    description: "Mass gain is boosted by OoM of Dark Matters.",
    effect: () => DC.D2.pow(softcap(Currency.darkMatter.value.add(1).log10(), 11600, 0.5, SOFTCAP_TYPE.POWER)),
    formatEffect: value => formatX(value),
    softcapped: value => value.gte(11600),
    cost: DC.E33,
    isUnlocked: () => Challenges.isUnlocked
  }
];