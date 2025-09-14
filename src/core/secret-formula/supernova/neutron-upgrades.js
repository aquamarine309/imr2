import { DC } from "@/core/constants";

const bs2Effect = x => overflow(
  dilatedValue(x, GameElement(113).effectOrDefault(DC.D0_5), DC.D2).max(1),
  DC.EE60, DC.D0_5
);

// Tree 0 (Main):
//           c
//  s1 m1 rp1 bh1 sn1
// s2 m2 t1 d1 bh2 gr1 sn2
//   s3  m3   gl2  sn3
//    s4         sn4

// Tree 1 (QoLs):
//         qol1
//  qol2   qol3   qol4
//  qol5   qol6   qol7
//         unl1

// Tree 2 (Challenges):
//           chal1
//  chal2  chal4a      chal3
//      chal4
//  chal5

// Tree 3 (Post-Supernova):
//    bs4    bs1
//        bs2  fn1  bs3
// fn4  fn3  fn9  fn2 fn5
//   fn6      fn12

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
    requirement: () => i18n.t("X_supernova", { value: formatInt(3) }),
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
  d1: {
    id: "d1",
    branch: ["rp1"],
    isUnlocked: () => NeutronUpgrade.fn6.isBought,
    description: () => `Generating Relativistic particles outside Mass dilation is ${formatPercents(0.25, 0)} stronger.`,
    effect: DC.D1_25,
    effectCondition: () => !MassDilation.isActive,
    cost: DC.E51,
    tree: 0,
    row: 2,
    idx: 4 / 8
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
    requirement: () => i18n.t("X_supernova", { value: formatInt(7) }),
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
    requirement: () => i18n.t("X_supernova", { value: formatInt(4) }),
    check: () => Currency.supernova.gte(4),
    cost: DC.E4,
    tree: 0,
    row: 3,
    idx: 1 / 5
  },
  m3: {
    id: "m3",
    branch: ["m2"],
    isUnlocked: () => Fermions.areUnlocked,
    description: () => `Mass gain softcap^${formatInt(3)} starts later based on Supernovas.`,
    effect: () => Supernova.times.times(0.0125).add(1),
    formatEffect: value => `${formatPow(value)} later`,
    cost: DC.E46,
    tree: 0,
    row: 3,
    idx: 2 / 5
  },
  gr2: {
    id: "gr2",
    branch: ["gr1"],
    isUnlocked: () => Fermions.areUnlocked,
    description: () => `Cosmic Rays Power is raised to ${format(DC.D1_25, 2)}th power.`,
    effect: DC.D1_25,
    cost: DC.E20,
    tree: 0,
    row: 3,
    idx: 3 / 5
  },
  sn3: {
    id: "sn3",
    branch: ["sn2"],
    description: "Blue stars boost Neutron star gain at a reduced rate.",
    effect: () => StarGenerator(4).amount.max(1).log10().add(1),
    formatEffect: value => formatX(value),
    requirement: () => i18n.t("X_supernova", { value: formatInt(6) }),
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
    requirement: () => i18n.t("X_supernova", { value: formatInt(6) }),
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
    requirement: () => i18n.t("X_supernova", { value: formatInt(13) }),
    check: () => Currency.supernova.gte(13),
    effect: () => Softcap.power(Supernova.times.times(0.1), DC.D1_5, DC.D0_75),
    formatEffect: value => formatPlus(value),
    softcapped: value => value.gte(DC.D1_5),
    cost: DC.E8,
    tree: 0,
    row: 4,
    idx: 3 / 4
  },
  qol1: {
    id: "qol1",
    branch: [],
    description: () => i18n.t("neutron_upgrade_qol1"),
    requirement: () => i18n.t("X_supernova", { value: formatInt(2) }),
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
    description: () => i18n.t("neutron_upgrade_qol2"),
    requirement: () => i18n.t("X_supernova", { value: formatInt(3) }),
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
    description: () => i18n.t("neutron_upgrade_qol3"),
    effect: () => MassDilation.particleGainAt(dilatedValue(Currency.mass.value, MassDilation.power)),
    formatEffect: value => `+${format(value)}/${i18n.t("sec")}`,
    requirement: () => i18n.t("X_supernova", { value: formatInt(4) }),
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
    description: () => i18n.t("neutron_upgrade_qol4"),
    requirement: () => i18n.t("X_supernova", { value: formatInt(12) }),
    check: () => Currency.supernova.gte(12),
    cost: DC.E8,
    tree: 1,
    row: 1,
    idx: 3 / 4
  },
  qol5: {
    id: "qol5",
    branch: ["qol4"],
    description: () => i18n.t("neutron_upgrade_qol5"),
    requirement: () => i18n.t("X_supernova", { value: formatInt(16) }),
    check: () => Currency.supernova.gte(16),
    cost: DC.E13,
    tree: 1,
    row: 2,
    idx: 1 / 4
  },
  qol6: {
    id: "qol6",
    branch: ["qol5"],
    description: () => i18n.t("neutron_upgrade_qol6"),
    requirement: () => i18n.t("X_supernova", { value: formatInt(17) }),
    check: () => Currency.supernova.gte(17),
    cost: DC.E15,
    tree: 1,
    row: 2,
    idx: 2 / 4
  },
  qol7: {
    id: "qol7",
    branch: ["qol6"],
    isUnlocked: () => Fermions.areUnlocked && NeutronUpgrade.fn2.isBought,
    description: "You can now automatically buy Photon and Gluon Upgrades, they no longer spent their amount.",
    requirement: () => i18n.t("X_supernova", { value: formatInt(40) }),
    check: () => Currency.supernova.gte(40),
    cost: DC.E48,
    tree: 1,
    row: 2,
    idx: 3 / 4
  },
  unl1: {
    id: "unl1",
    branch: ["qol7"],
    description: "Unlock Radiation.",
    requirement: () => i18n.t("X_supernova", { value: formatInt(44) }),
    check: () => Currency.supernova.gte(44),
    cost: DC.E52,
    onPurchased() {
      Tutorial.radiation.unlock();
    },
    tree: 1,
    row: 3,
    idx: 2 / 6
  },
  chal1: {
    id: "chal1",
    branch: [],
    description: () => `Add ${formatInt(100)} more C7 & C8 maximum completions.`,
    effect: DC.E2,
    requirement: () => i18n.t("X_supernova", { value: formatInt(4) }),
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
  bs4: {
    id: "bs4",
    branch: ["bs2"],
    isUnlocked: () => Fermions.areUnlocked,
    description: () => `Raise Z Bosons gain to the ${format(DC.D1_5, 1)}th power.`,
    effect: DC.D1_5,
    cost: DC.E24,
    tree: 3,
    row: 0,
    idx: 1 / 4
  },
  bs1: {
    id: "bs1",
    branch: [],
    isUnlocked: () => Bosons.areUnlocked,
    description: "Tickspeed affects Higgs Boson gain at a reduced rate.",
    requirement: () => i18n.t("X_supernova", { value: formatInt(15) }),
    check: () => Currency.supernova.gte(15),
    effect: () => MassUpgrade.tickspeed.boughtAmount.add(1).pow(0.6),
    formatEffect: value => formatX(value),
    cost: DC.E13,
    tree: 3,
    row: 0,
    idx: 2 / 4
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
    idx: 2 / 5
  },
  fn1: {
    id: "fn1",
    branch: ["bs1"],
    isUnlocked: () => Fermions.areUnlocked,
    description: "Tickspeed affects Fermions gain at a reduced rate.",
    effect: () => DC.D1_25.pow(Softcap.dilation(MassUpgrade.tickspeed.boughtAmount, DC.E24, DC.D0_5).pow(DC.D0_4)),
    formatEffect: value => formatX(value),
    cost: DC.E27,
    tree: 3,
    row: 1,
    idx: 3 / 5
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
    idx: 4 / 5
  },
  fn4: {
    id: "fn4",
    branch: ["fn1"],
    isUnlocked: () => NeutronUpgrade.fn2.isBought,
    description: "The second Photon and Gluon Upgrades are slightly stronger.",
    effect: DC.D2,
    cost: DC.E39,
    tree: 3,
    row: 2,
    idx: 1 / 6
  },
  fn3: {
    id: "fn3",
    branch: ["fn1"],
    description: () => `Super Fermion scaling is ${formatPercents(0.075, 1)} weaker.`,
    effect: 0.925,
    requirement: () => `Reach ${format(DC.E7)} of any Fermions.`,
    check: () => Currency.uQuarks.value.max(Currency.uLeptons.value).gte(DC.E7),
    cost: DC.E31,
    tree: 3,
    row: 2,
    idx: 2 / 6
  },
  fn9: {
    id: "fn9",
    branch: ["fn1"],
    description: () => `Fermions [Strange] and [Neutrino] max tier is increased by ${formatInt(2)}.`,
    effect: DC.D2,
    cost: DC.E166,
    tree: 3,
    row: 2,
    idx: 3 / 6
  },
  fn2: {
    id: "fn2",
    branch: ["fn1"],
    description: "Unlock two more types of U-Quark and U-Fermion.",
    requirement: () => `Reach ${formatMass(DC.D1_5E1000056)} of mass while dilating mass in Fermion [Down].`,
    check: () => (FermionType.quarks.fermions.down.isActive &&
      MassDilation.isActive &&
      Currency.mass.gte(DC.D1_5E1000056)
    ),
    cost: DC.E33,
    tree: 3,
    row: 2,
    idx: 4 / 6
  },
  fn5: {
    id: "fn5",
    branch: ["fn1"],
    isUnlocked: () => NeutronUpgrade.fn2.isBought,
    description: () => `[Electron] maximum tier is increased by ${formatInt(35)}. Its effect softcap is weaker.`,
    effect: DC.D35,
    requirement: () => `Reach ${format(DC.E1_25E4)} quarks while in [Electron]`,
    check: () => (
      FermionType.leptons.fermions.electron.isActive &&
      Currency.quark.gte(DC.E1_25E4)
    ),
    cost: DC.E42,
    tree: 3,
    row: 2,
    idx: 5 / 6
  },
  fn12: {
    id: "fn12",
    branch: ["fn3"],
    description: () => `Pre-meta fermion scalings are ${formatPercents(0.9, 0)} weaker.`,
    effect: DC.D0_1,
    cost: DC.E960,
    tree: 3,
    row: 3,
    idx: 1 / 5
  },
  fn11: {
    id: "fn11",
    branch: ["fn9"],
    description: () => `[Strange], [Top], [Bottom], [Neutrino], [Neut-Muon] maximum tiers are increased by ${formatInt(5)}.`,
    effect: DC.D5,
    cost: DC.E680,
    tree: 3,
    row: 3,
    idx: 2 / 5
  },
  fn6: {
    id: "fn6",
    branch: ["fn2"],
    description: "Unlock two more types of U-Quark and U-Fermion.",
    requirement: () => `Reach ${formatMass(DC.D1_5E40056)} while in [Charm] and Challenge 5.`,
    check: () => (FermionType.quarks.fermions.charm.isActive &&
      Challenge(5).isRunning &&
      Currency.mass.gte(DC.D1_5E40056)
    ),
    cost: DC.E48,
    tree: 3,
    row: 3,
    idx: 3 / 5
  },
  fn10: {
    id: "fn10",
    branch: ["fn5"],
    isUnlocked: () => false,
    description: "Uncap [Electron] tier, its effect is overpowered.",
    requirement: () => `Reach ${format(DC.E1_5E8)} atoms while in [Electron] and 9th Challenge.`,
    check: () => (FermionType.leptons.fermions.electron.isActive &&
      Challenge(9).isRunning &&
      Currency.atoms.gte(DC.E1_5E8)
    ),
    cost: DC.E600,
    tree: 3,
    row: 3,
    idx: 4 / 5
  }
};