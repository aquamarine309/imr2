import { DC } from "@/core/constants";

export const dilation = {
  doubleMass: {
    id: 0,
    description: () => `${GameElement(25).canBeApplied ? "Triple" : "Double"} dilated mass gain.`,
    cost: value => DC.E1.pow(value.add(1)),
    bulk: value => value.log10().floor(),
    effect: value => softcap(DC.D2.plusEffectOf(GameElement(25)).pow(value), DC.E1_2E4, DC.D0_96, SOFTCAP_TYPE.DILATION),
    formatEffect: value => formatX(value, 0),
    softcapped: value => value.gte(DC.E1_2E4)
  },
  massStronger: {
    id: 1,
    description: "Make dilated mass effect stronger.",
    cost: value => DC.E1.pow(value.add(2)),
    bulk: value => value.log10().minus(1).floor(),
    effect: value => (DilationUpgrade.du2Better.canBeApplied
      ? value.pow(DC.C2D3).times(0.25).add(1)
      : value.sqrt().times(0.15).add(1)
    ),
    formatEffect: value => `${formatPercents(value.minus(1))} stronger`
  },
  doubleParticle: {
    id: 2,
    description: "Double relativistic particles gain.",
    cost: value => DC.E1.pow(value.pow(DC.D1_25.powEffectOf(DilationUpgrade.du3Weaker)).add(3)),
    bulk: value => value.log10().minus(3).root(DC.D1_25.powEffectOf(DilationUpgrade.du3Weaker)).add(1).floor(),
    effect: value => softcap(DC.D2.pow(softcap(value, DC.D2_5E26, DC.D0_1, SOFTCAP_TYPE.POWER)), DC.E25, DC.D0_75, SOFTCAP_TYPE.POWER),
    softcapped: value => value.gte(DC.D2_5E26),
    formatEffect: value => formatX(value, 0)
  },
  strongerPower: {
    id: 3,
    description: "Dilated mass also boost Stronger's power.",
    cost: () => DC.D4_0475E21,
    bulk: value => (value.gte(DC.D4_0475E21) ? DC.D1 : DC.D0),
    max: DC.D1,
    effect: () => Currency.dilatedMass.value.max(1).log10().div(2).cbrt().div(8).add(1),
    formatEffect: value => formatX(value)
  },
  du3Weaker: {
    id: 4,
    description: () => `Mass Dilation upgrade 3 scales ${formatPercents(0.1, 0)} weaker.`,
    cost: value => DC.E5.pow(value).times(DC.D1_619E24),
    bulk: value => value.div(DC.D1_619E24).log(DC.D5).add(1).floor(),
    max: DC.D5,
    effect: value => DC.D1.minus(value.times(0.1)),
    formatEffect: value => `${formatPercents(DC.D1.minus(value), 0)} weaker`
  },
  rpFormula: {
    id: 5,
    description: "Increase the exponent of the Relativistic Particle formula.",
    cost: value => DC.E3.pow(value.pow(1.5)).times(DC.D1_5E73),
    bulk: value => value.div(DC.D1_5E73).log10().div(3).pow(DC.C2D3).add(1).floor(),
    effect: value => softcap(DC.D0_25.times(value).timesEffectOf(GameElement(53)), DC.E3, DC.D0_6, SOFTCAP_TYPE.POWER),
    formatEffect: value => `+${formatPow(value)}`,
    softcapped: value => value.gte(DC.E3)
  },
  quarkGain: {
    id: 6,
    description: "Dilated mass boosts quark gain.",
    max: DC.D1,
    cost: () => DC.D1_5E191,
    bulk: value => (value.gte(DC.D1_5E191) ? DC.D1 : DC.D0),
    effect: () => DC.D5.pow(Currency.dilatedMass.value.max(1).log10().sqrt()),
    formatEffect: value => formatX(value)
  },
  du2Better: {
    id: 7,
    description: "Mass Dilation upgrade 2 effect's formula is better.",
    max: DC.D1,
    cost: () => DC.D1_5E246,
    bulk: value => (value.gte(DC.D1_5E246) ? DC.D1 : DC.D0)
  },
  starBoost: {
    id: 8,
    description: "Tickspeed affects all-star resources at a reduced rate.",
    max: DC.D1,
    cost: () => DC.D1_5E296,
    bulk: value => (value.gte(DC.D1_5E296) ? DC.D1 : DC.D0),
    effect: () => MassUpgrade.tickspeed.boughtAmount.add(1).pow(DC.C2D3),
    formatEffect: value => formatX(value),
    isUnlocked: () => Stars.isUnlocked
  },
  doubleQuark: {
    id: 9,
    description: "Double quarks gain.",
    cost: value => DC.D1_5E536.times(DC.D5.pow(value)),
    bulk: value => value.div(DC.D1_5E536).log(DC.D5).add(1).floor(),
    effect: value => overflow(softcap(DC.D2.pow(value), DC.E25, DC.C2D3, SOFTCAP_TYPE.POWER), DC.EE200000, DC.D0_1),
    softcapped: value => value.gte(DC.E25),
    formatEffect: value => formatX(value),
    isUnlocked: () => Stars.isUnlocked
  }
};