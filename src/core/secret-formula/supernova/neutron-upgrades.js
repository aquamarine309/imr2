import { DC } from "@/core/constants";

const bs2Effect = x => overflow(
  dilatedValue(x, GameElement(113).effectOrDefault(DC.D0_5), DC.D2).max(1),
  DC.EE60, DC.D0_5
);

// IDX: row-index / (amount-of-upgrade + 1)
export const neutronUpgrades = {
  c: {
    id: "c",
    branch: [],
    description: () => `Start generating ${format(0.1, 1)} Neutron Stars per second (not affected by offline production).`,
    effect: DC.D0_1,
    requirement: () => `${formatInt(1)} Supernova`,
    check: () => Currency.supernova.gte(1),
    cost: DC.D0,
    tree: 0,
    row: 0,
    idx: 1 / 2
  },
  m1: {
    id: "m1",
    branch: ["c"],
    description: "Neutron star multiplies Mass gain.",
    effect: () => Decimal.pow10(Softcap.power(Currency.neutronStars.value.add(1).log10().pow(5), DC.E3, DC.D0_25).times(DC.E2)),
    formatEffect: value => formatX(value),
    softcapped: value => value.gte(DC.EE5),
    cost: DC.E2,
    tree: 0,
    row: 1,
    idx: 2 / 6
  },
  rp1: {
    id: "rp1",
    branch: ["c"],
    description: "Neutron Stars multiplies Rage Powers gain",
    effect: () => Decimal.pow10(Softcap.power(Currency.neutronStars.value.add(1).log10().pow(5), DC.E3, DC.D0_25).times(DC.D50)),
    formatEffect: value => formatX(value),
    softcapped: value => value.gte(DC.E5E4),
    cost: DC.D200,
    tree: 0,
    row: 1,
    idx: 3 / 6
  },
  bh1: {
    id: "bh1",
    branch: ["c"],
    description: "Neutron Star multiplies Dark Matters gain.",
    effect: () => Decimal.pow10(Softcap.power(Currency.neutronStars.value.add(1).log10().pow(5), DC.E3, DC.D0_25).times(DC.D35)),
    formatEffect: value => formatX(value),
    softcapped: value => value.gte(DC.E3_5E4),
    cost: DC.D400,
    tree: 0,
    row: 1,
    idx: 4 / 6
  },
  s1: {
    id: "s1",
    branch: ["c"],
    description: "Neutron Star boosts last star gain.",
    effect: () => Currency.neutronStars.value.add(1).pow(1.4),
    formatEffect: value => formatX(value),
    cost: DC.D400,
    tree: 0,
    row: 1,
    idx: 1 / 6
  },
  sn1: {
    id: "sn1",
    branch: ["c"],
    description: "Tickspeed affects Neutron Star gain at a reduced rate.",
    effect: () => MassUpgrade.tickspeed.boughtAmount.add(1).pow(0.25),
    formatEffect: value => formatX(value),
    cost: DC.E1,
    tree: 0,
    row: 1,
    idx: 5 / 6
  },
  s2: {
    id: "s2",
    branch: ["s1"],
    description: () => `Tetr amount to Star boost’s softcap is ${formatPercents(0.5, 0)} weaker.`,
    effect: DC.C2D3,
    requirement: () => `${formatInt(3)} Supernovas`,
    check: () => Currency.supernova.gte(3),
    cost: DC.D2500,
    tree: 0,
    row: 2,
    idx: 1 / 8
  },
  m2: {
    id: "m2",
    branch: ["m1"],
    description: () => `Raise the Mass requirement for softcap^${formatInt(2)} by ${format(DC.D1_5, 1)} and an additional power based on Supernovas.`,
    effect: () => DC.D1_5.times(Supernova.times.times(0.0125).add(1)),
    formatEffect: value => `${formatPow(value)} later`,
    cost: DC.D800,
    tree: 0,
    row: 2,
    idx: 2 / 8
  },
  t1: {
    id: "t1",
    branch: ["m1", "rp1"],
    description: () => `Tickspeed Power is raised to the ${format(1.15, 2)}th.`,
    effect: 1.15,
    requirement: () => `Reach ${formatMass(DC.D1_5E1_65E6)} without buying Tickspeed in a Supernova run. You can still obtain Tickspeed from Cosmic Rays.`,
    check: () => player.checks.supernova.noTick && Currency.mass.gte(DC.D1_5E1_65E6),
    cost: DC.D1500,
    tree: 0,
    row: 2,
    idx: 3 / 8
  },
  bh2: {
    id: "bh2",
    branch: ["bh1"],
    description: () => `BH Condenser power is raised to the ${format(1.15, 2)}th.`,
    effect: 1.15,
    requirement: () => `Reach ${formatMass(DC.D1_5E1_7556E4)} of black hole without buying any BH Condenser in a Supernova run.`,
    check: () => player.checks.supernova.noCondenser && Currency.blackHole.gte(DC.D1_5E1_7556E4),
    cost: DC.D1500,
    tree: 0,
    row: 2,
    idx: 5 / 8
  },
  gr1: {
    id: "gr1",
    branch: ["bh1"],
    description: "BH Condensers power boost Cosmic Rays power.",
    effect: () => MassUpgrade.condenser.power.max(1).root(3),
    formatEffect: value => formatX(value),
    requirement: () => `${formatInt(7)} Supernovas`,
    check: () => Currency.supernova.gte(7),
    cost: DC.E6,
    tree: 0,
    row: 2,
    idx: 6 / 8
  },
  sn2: {
    id: "sn2",
    branch: ["sn1"],
    description: "Supernova boosts Neutron Star gain.",
    effect: () => {
      let supernova = Currency.supernova.value;
      supernova = Softcap.power(supernova, 15, 0.8);
      supernova = Softcap.power(supernova, 25, 0.5);
      return DC.D2.plusEffectOf(NeutronUpgrade.sn4).pow(supernova);
    },
    formatEffect: value => formatX(value),
    cost: DC.D350,
    tree: 0,
    row: 2,
    idx: 7 / 8
  },
  s3: {
    id: "s3",
    branch: ["s2"],
    description: "Star generators are stronger based on Supernova.",
    effect: () => Currency.supernova.value.pow(0.1).times(0.1).add(1),
    formatEffect: value => formatPow(value),
    requirement: () => `${formatInt(4)} Supernovas`,
    check: () => Currency.supernova.gte(4),
    cost: DC.E4,
    tree: 0,
    row: 3,
    idx: 1 / 5
  },
  m3: {
    id: "m3",
    branch: ["m2"],
    isUnlocked: () => false,
    description: () => `Mass gain softcap^${formatInt(3)} starts later based on Supernovas.`,
    effect: () => Supernova.times.times(0.0125).add(1),
    formatEffect: value => `${formatPow(value)} later`,
    cost: DC.E46,
    tree: 0,
    row: 3,
    idx: 2 / 5
  },
  sn3: {
    id: "sn3",
    branch: ["sn2"],
    description: "Blue stars boost Neutron star gain at a reduced rate.",
    effect: () => StarGenerator(4).amount.max(1).log10().add(1),
    formatEffect: value => formatX(value),
    requirement: () => `${formatInt(6)} Supernovas`,
    check: () => Currency.supernova.gte(6),
    cost: DC.D5E4,
    tree: 0,
    row: 3,
    idx: 4 / 5
  },
  s4: {
    id: "s4",
    branch: ["s3"],
    description: "After getting all 5 star types, star unlocker will transform into star boosters.",
    requirement: () => `${formatInt(6)} Supernovas`,
    check: () => Currency.supernova.gte(6),
    cost: DC.E5,
    tree: 0,
    row: 4,
    idx: 1 / 4
  },
  sn4: {
    id: "sn4",
    branch: ["sn3"],
    isUnlocked: () => Bosons.areUnlocked,
    description: "[sn2]'s effect base is increased by supernova.",
    requirement: () => `${formatInt(13)} Supernovas`,
    check: () => Currency.supernova.gte(13),
    effect: () => Softcap.power(Supernova.times.times(0.1), DC.D1_5, DC.D0_75),
    formatEffect: value => `+${format(value)}`,
    softcapped: value => value.gte(DC.D1_5),
    cost: DC.E8,
    tree: 0,
    row: 4,
    idx: 3 / 4
  },
  qol1: {
    id: "qol1",
    branch: [],
    description: "Start with Silicon-14 & Argon-18 unlocked. You can now automatically buy Elements & Atom upgrades.",
    requirement: () => `${formatInt(2)} Supernovas`,
    check: () => Currency.supernova.gte(2),
    cost: DC.D2500,
    tree: 1,
    row: 0,
    idx: 2 / 4,
    onPurchased() {
      GameElement(14).isBought = true;
      GameElement(18).isBought = true;
    }
  },
  qol2: {
    id: "qol2",
    branch: ["qol1"],
    description: "Start with Chromium-24 and Atom upgrade 6 unlocked.",
    requirement: () => `${formatInt(3)} Supernovas`,
    check: () => Currency.supernova.gte(3),
    cost: DC.D2000,
    tree: 1,
    row: 1,
    idx: 1 / 4,
    onPurchased() {
      GameElement(24).isBought = true;
      AtomUpgrade(5).isBought = true;
    }
  },
  qol3: {
    id: "qol3",
    branch: ["qol2"],
    description: "Start with technetium-43 unlocked, and it's improved. You can automatically gain Relativistic particles from mass.",
    effect: () => MassDilation.particleGainAt(dilatedValue(Currency.mass.value, MassDilation.power)),
    formatEffect: value => `+${format(value)}/sec`,
    requirement: () => `${formatInt(4)} Supernovas`,
    check: () => Currency.supernova.gte(4),
    cost: DC.E4,
    tree: 1,
    row: 1,
    idx: 2 / 4,
    onPurchased() {
      GameElement(43).isBought = true;
    },
    effectCondition: () => !MassDilation.isActive
  },
  qol4: {
    id: "qol4",
    branch: ["qol3"],
    isUnlocked: () => Bosons.areUnlocked,
    description: "You can now automatically buy Star unlockers & boosters.",
    requirement: () => `${formatInt(12)} Supernovas`,
    check: () => Currency.supernova.gte(12),
    cost: DC.E8,
    tree: 1,
    row: 1,
    idx: 3 / 4
  },
  qol5: {
    id: "qol5",
    branch: ["qol4"],
    description: "Tetr no longer resets anything.",
    requirement: () => `${formatInt(16)} Supernovas`,
    check: () => Currency.supernova.gte(16),
    cost: DC.E13,
    tree: 1,
    row: 2,
    idx: 1 / 4
  },
  qol6: {
    id: "qol6",
    branch: ["qol5"],
    description: "While in any challenge, you can now automatically complete it before exiting.",
    requirement: () => `${formatInt(17)} Supernovas`,
    check: () => Currency.supernova.gte(17),
    cost: DC.E15,
    tree: 1,
    row: 2,
    idx: 2 / 4
  },
  chal1: {
    id: "chal1",
    branch: [],
    description: () => `Add ${formatInt(100)} more C7 & C8 maximum completions.`,
    effect: DC.E2,
    requirement: () => `${formatInt(4)} Supernovas`,
    check: () => Currency.supernova.gte(4),
    cost: DC.D6000,
    tree: 2,
    row: 0,
    idx: 1 / 2
  },
  chal2: {
    id: "chal2",
    branch: ["chal1"],
    description: "Keep challenge 1-4 completions on reset.",
    requirement: () => `Reach ${formatMass(DC.E2_05E6)} of mass without challenge 1-4 completions in a Supernova run.`,
    check: () => Currency.mass.gte(DC.E2_05E6) && Challenges.all.slice(0, 4).every(chal => chal.completions.eq(0)),
    cost: DC.E4,
    tree: 2,
    row: 1,
    idx: 1 / 5
  },
  chal4a: {
    id: "chal4a",
    branch: ["chal4"],
    isUnlocked: () => Bosons.areUnlocked,
    description: "Challenge 9’s effect is better.",
    effect: DC.C2D7,
    cost: DC.E8,
    tree: 2,
    row: 1,
    idx: 2 / 5
  },
  chal3: {
    id: "chal3",
    branch: ["chal1"],
    description: "Keep challenge 5-8 completions on reset.",
    requirement: () => `Reach ${formatMass(DC.E1_75E4)} of Black Hole without challenge 5-8 completions in a Supernova run.`,
    check: () => Currency.blackHole.gte(DC.E1_75E4) && Challenges.all.slice(4, 8).every(chal => chal.completions.eq(0)),
    cost: DC.E4,
    tree: 2,
    row: 1,
    idx: 4 / 5
  },
  chal4: {
    id: "chal4",
    branch: ["chal2", "chal3"],
    description: "Unlock the 9th Challenge.",
    cost: DC.D1_5E4,
    tree: 2,
    row: 2,
    idx: 1 / 3
  },
  chal5: {
    id: "chal5",
    branch: ["chal4"],
    description: "Unlock the 10th Challenge.",
    cost: DC.E17,
    tree: 2,
    row: 3,
    idx: 1 / 5
  },
  bs1: {
    id: "bs1",
    branch: [],
    isUnlocked: () => Bosons.areUnlocked,
    description: "Tickspeed affects Higgs Boson gain at a reduced rate.",
    requirement: () => `${formatInt(15)} Supernovas`,
    check: () => Currency.supernova.gte(15),
    effect: () => MassUpgrade.tickspeed.boughtAmount.add(1).pow(0.6),
    formatEffect: value => formatX(value),
    cost: DC.E13,
    tree: 3,
    row: 0,
    idx: 2 / 7
  },
  bs2: {
    id: "bs2",
    branch: ["bs1"],
    description: "Photon, Gluon boosts each other's gain.",
    effects: {
      photon: () => bs2Effect(Boson.photon.amount),
      gluon: () => bs2Effect(Boson.gluon.amount)
    },
    formatEffect: effects => `${formatX(effects.photon)} to Photon, ${formatX(effects.gluon)} to Gluon`,
    cost: DC.E14,
    tree: 3,
    row: 1,
    idx: 1 / 7
  },
  bs3: {
    id: "bs3",
    branch: ["bs1"],
    description: "Neutrons gain is affected by Graviton's effect at a reduced rate.",
    effect: () => Softcap.dilation(Softcap.power(Boson.graviton.effectValue.add(1).sqrt(), DC.E1000, DC.C1D3), DC.EE38, DC.D0_95),
    formatEffect: value => formatX(value),
    softcapped: value => value.gte(DC.E1000),
    cost: DC.E14,
    tree: 3,
    row: 1,
    idx: 2 / 7
  }
};