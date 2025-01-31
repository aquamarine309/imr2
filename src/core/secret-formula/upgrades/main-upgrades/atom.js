import { DC } from "@/core/constants";

export const atom = [
  {
    id: 0,
    description: "Start with Mass upgrades unlocked.",
    cost: DC.D1
  },
  {
    id: 1,
    description: "You can automatically buy BH Condenser and upgrades. Tickspeed no longer spends Rage Powers.",
    cost: DC.E2
  },
  {
    id: 2,
    description: "[Tetr Era] Unlock Tetr.",
    cost: DC.D2_5E4
  },
  {
    id: 3,
    description: "Keep challenges 1-4 on reset. BH Condensers add Cosmic Rays Power at a reduced rate.",
    cost: DC.E10,
    effect: () => MassUpgrade.condenser.boughtAmount.pow(0.8).times(0.01),
    formatEffect: value => `+${format(value)}x`
  },
  {
    id: 4,
    description: () => `You can automatically Tetr up. Super Tier starts ${formatInt(10)} later.`,
    cost: DC.E16,
    effect: DC.E1
  },
  {
    id: 5,
    description: () => `Gain ${formatPercents(1, 0)} of Dark Matters gained from reset per second. Mass gain from Black Hole softcap starts later based on Atomic Powers.`,
    cost: DC.E18,
    effect: () => Currency.atomicPower.value.add(1).sqrt(),
    formatEffect: value => `${formatX(value)} later`
  },
  {
    id: 6,
    description: "Tickspeed boosts each particle powers gain.",
    effect: () => DC.D1_025.pow(MassUpgrade.tickspeed.boughtAmount),
    formatEffect: value => formatX(value),
    cost: DC.E25
  },
  {
    id: 7,
    description: "Atomic Powers boost Quark gain.",
    effect: () => Currency.atomicPower.value.clampMin(1).log10().add(1),
    formatEffect: value => formatX(value),
    cost: DC.E35
  },
  {
    id: 8,
    description: () => `Stronger effect softcap is ${formatPercents(0.15, 0)} weaker.`,
    effect: 1.15,
    cost: DC.D2E44
  },
  {
    id: 9,
    description: "Tier requirement is halved. Hyper Rank starts later based on Tiers you have.",
    effect: () => RankType.tier.amount.times(2).floor(),
    formatEffect: value => `+${format(value, 0)} later`,
    cost: DC.D5E47
  }
];