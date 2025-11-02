import { DC } from "@/core/constants";

const bs2Effect = x => overflow(
  dilatedValue(x, GameElement(113).effectOrDefault(DC.D0_5), DC.D2).max(1),
  DC.EE60, DC.D0_5
);

export const neutronTrees = [
  {
    id: 0,
    key: "neutron_tree_main",
    isUnlocked: () => true,
    layout: [
      ["c"],
      ["s1", "m1", "rp1", "bh1", "sn1"],
      ["s2", "m2", "t1", "d1", "bh2", "gr1", "sn2"],
      ["s3", "m3", "gr2", "sn3"],
      ["s4", "sn5", "sn4"]
    ]
  },
  {
    id: 1,
    key: "neutron_tree_qol",
    isUnlocked: () => true,
    layout: [
      ["qol1", null, null, null, "quQol1", null],
      ["qol2", "qol3", "qol4", "quQol2", "quQol3", "quQol4", "quQol5", "quQol6"],
      ["qol5", "qol6", "qol7", null, null, "quQol7", null, null],
      ["qol9", "unl1", "qol8", "unl2", null, null, null, null]
    ]
  },
  {
    id: 2,
    key: "neutron_tree_challenge",
    isUnlocked: () => true,
    layout: [
      ["chal1"],
      ["chal2", "chal4a", "chal4b", "chal3"],
      ["chal4", null],
      ["chal5", "chal6", "chal7", null]
    ]
  },
  {
    id: 3,
    key: "neutron_tree_post_supernova",
    isUnlocked: () => Bosons.areUnlocked,
    layout: [
      ["bs4", "bs1", null, "qf1", null, "rad1"],
      [null, "bs2", "fn1", "bs3", "qf2", null, "rad2", "rad3"],
      ["fn4", "fn3", "fn9", "fn2", "fn5", null, "rad4", "rad5"],
      ["fn12", "fn11", "fn6", "fn10", "rad6", null],
      [null, "fn7", "fn8", null]
    ]
  },
  {
    id: 4,
    key: "quantum",
    isUnlocked: () => PlayerProgress.quantumUnlocked(),
    layout: [
      ["qu0"],
      ["qu1", "qu2", "qu3"],
      [null, "prim2", "prim1", "qu4", null, null, null],
      [null, "qu5", null]
    ]
  }
];

export const neutronUpgrades = {
  c: {
    id: "c",
    branch: [],
    description: () => `Start generating ${format(0.1, 1)} Neutron Stars per second (not affected by offline production).`,
    effect: DC.D0_1,
    requirement: () => `${formatInt(1)} Supernova`,
    check: () => Currency.supernova.gte(1),
    cost: DC.D0
  },
  s1: {
    id: "s1",
    branch: ["c"],
    description: "Neutron Star boosts last star gain.",
    effect: () => Currency.neutronStars.value.add(1).pow(1.4),
    formatEffect: value => formatX(value),
    cost: DC.D400
  },
  m1: {
    id: "m1",
    branch: ["c"],
    description: "Neutron star multiplies Mass gain.",
    effect: () => Decimal.pow10(Softcap.power(Currency.neutronStars.value.add(1).log10().pow(5), DC.E3, DC.D0_25).times(DC.E2)),
    formatEffect: value => formatX(value),
    softcapped: value => value.gte(DC.EE5),
    cost: DC.E2
  },
  rp1: {
    id: "rp1",
    branch: ["c"],
    description: "Neutron Stars multiplies Rage Powers gain",
    effect: () => Decimal.pow10(Softcap.power(Currency.neutronStars.value.add(1).log10().pow(5), DC.E3, DC.D0_25).times(DC.D50)),
    formatEffect: value => formatX(value),
    softcapped: value => value.gte(DC.E5E4),
    cost: DC.D200
  },
  bh1: {
    id: "bh1",
    branch: ["c"],
    description: "Neutron Star multiplies Dark Matters gain.",
    effect: () => Decimal.pow10(Softcap.power(Currency.neutronStars.value.add(1).log10().pow(5), DC.E3, DC.D0_25).times(DC.D35)),
    formatEffect: value => formatX(value),
    softcapped: value => value.gte(DC.E3_5E4),
    cost: DC.D400
  },
  sn1: {
    id: "sn1",
    branch: ["c"],
    description: "Tickspeed affects Neutron Star gain at a reduced rate.",
    effect: () => MassUpgrade.tickspeed.boughtAmount.add(1).pow(0.25),
    formatEffect: value => formatX(value),
    cost: DC.E1
  },
  s2: {
    id: "s2",
    branch: ["s1"],
    description: () => `Tetr amount to Star boost’s softcap is ${formatPercents(0.5, 0)} weaker.`,
    effect: DC.C2D3,
    requirement: () => i18n.t("X_supernova", { value: formatInt(3) }),
    check: () => Currency.supernova.gte(3),
    cost: DC.D2500
  },
  m2: {
    id: "m2",
    branch: ["m1"],
    description: () => `Raise the Mass requirement for softcap^${formatInt(2)} by ${format(DC.D1_5, 1)} and an additional power based on Supernovas.`,
    effect: () => DC.D1_5.times(Supernova.times.times(0.0125).add(1)),
    formatEffect: value => `${formatPow(value)} later`,
    cost: DC.D800
  },
  t1: {
    id: "t1",
    branch: ["m1", "rp1"],
    description: () => `Tickspeed Power is raised to the ${format(1.15, 2)}th.`,
    effect: 1.15,
    requirement: () => `Reach ${formatMass(DC.D1_5E1_65E6)} without buying Tickspeed in a Supernova run. You can still obtain Tickspeed from Cosmic Rays.`,
    check: () => player.checks.supernova.noTick && Currency.mass.gte(DC.D1_5E1_65E6),
    cost: DC.D1500
  },
  d1: {
    id: "d1",
    branch: ["rp1"],
    isUnlocked: () => NeutronUpgrade.fn6.isBought,
    description: () => `Generating Relativistic particles outside Mass dilation is ${formatPercents(0.25, 0)} stronger.`,
    effect: DC.D1_25,
    effectCondition: () => !MassDilation.isActive,
    cost: DC.E51
  },
  bh2: {
    id: "bh2",
    branch: ["bh1"],
    description: () => `BH Condenser power is raised to the ${format(1.15, 2)}th.`,
    effect: 1.15,
    requirement: () => `Reach ${formatMass(DC.D1_5E1_7556E4)} of black hole without buying any BH Condenser in a Supernova run.`,
    check: () => player.checks.supernova.noCondenser && Currency.blackHole.gte(DC.D1_5E1_7556E4),
    cost: DC.D1500
  },
  gr1: {
    id: "gr1",
    branch: ["bh1"],
    description: "BH Condensers power boost Cosmic Rays power.",
    effect: () => MassUpgrade.condenser.power.max(1).root(3),
    formatEffect: value => formatX(value),
    requirement: () => i18n.t("X_supernova", { value: formatInt(7) }),
    check: () => Currency.supernova.gte(7),
    cost: DC.E6
  },
  sn2: {
    id: "sn2",
    branch: ["sn1"],
    description: "Supernova boosts Neutron Star gain.",
    effect: () => {
      let supernova = Currency.supernova.value;
      if (!NeutronUpgrade.qu4.canBeApplied) {
        supernova = Softcap.power(supernova, 15, 0.8);
        supernova = Softcap.power(supernova, 25, 0.5);
      }
      return DC.D2.plusEffectOf(NeutronUpgrade.sn4).pow(supernova);
    },
    formatEffect: value => formatX(value),
    cost: DC.D350
  },
  s3: {
    id: "s3",
    branch: ["s2"],
    description: "Star generators are stronger based on Supernova.",
    effect: () => Currency.supernova.value.pow(0.1).times(0.1).add(1),
    formatEffect: value => formatPow(value),
    requirement: () => i18n.t("X_supernova", { value: formatInt(4) }),
    check: () => Currency.supernova.gte(4),
    cost: DC.E4
  },
  m3: {
    id: "m3",
    branch: ["m2"],
    isUnlocked: () => Fermions.areUnlocked,
    description: () => `Mass gain softcap^${formatInt(3)} starts later based on Supernovas.`,
    effect: () => Supernova.times.times(0.0125).add(1),
    formatEffect: value => `${formatPow(value)} later`,
    cost: DC.E46
  },
  gr2: {
    id: "gr2",
    branch: ["gr1"],
    isUnlocked: () => Fermions.areUnlocked,
    description: () => `Cosmic Rays Power is raised to ${format(DC.D1_25, 2)}th power.`,
    effect: DC.D1_25,
    cost: DC.E20
  },
  sn3: {
    id: "sn3",
    branch: ["sn2"],
    description: "Blue stars boost Neutron star gain at a reduced rate.",
    effect: () => StarGenerator(4).amount.max(1).log10().add(1),
    formatEffect: value => formatX(value),
    requirement: () => i18n.t("X_supernova", { value: formatInt(6) }),
    check: () => Currency.supernova.gte(6),
    cost: DC.D5E4
  },
  s4: {
    id: "s4",
    branch: ["s3"],
    description: "After getting all 5 star types, star unlocker will transform into star boosters.",
    requirement: () => i18n.t("X_supernova", { value: formatInt(6) }),
    check: () => Currency.supernova.gte(6),
    cost: DC.E5
  },
  sn5: {
    id: "sn5",
    branch: ["sn4"],
    isUnlocked: () => PlayerProgress.quantumUnlocked(),
    description: "Mass boosts Neutron Stars gain.",
    effect: () => Currency.mass.value.add(1).log10().add(1).pow(2),
    formatEffect: value => formatX(value),
    cost: DC.E450
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
    cost: DC.E8
  },
  qol1: {
    id: "qol1",
    branch: [],
    description: () => i18n.t("neutron_upgrade_qol1"),
    requirement: () => i18n.t("X_supernova", { value: formatInt(2) }),
    check: () => Currency.supernova.gte(2),
    cost: DC.D2500,
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
    cost: DC.E8
  },
  qol5: {
    id: "qol5",
    branch: ["qol4"],
    description: () => i18n.t("neutron_upgrade_qol5"),
    requirement: () => i18n.t("X_supernova", { value: formatInt(16) }),
    check: () => Currency.supernova.gte(16),
    cost: DC.E13
  },
  qol6: {
    id: "qol6",
    branch: ["qol5"],
    description: () => i18n.t("neutron_upgrade_qol6"),
    requirement: () => i18n.t("X_supernova", { value: formatInt(17) }),
    check: () => Currency.supernova.gte(17),
    cost: DC.E15
  },
  qol7: {
    id: "qol7",
    branch: ["qol6"],
    isUnlocked: () => Fermions.areUnlocked && NeutronUpgrade.fn2.isBought || PlayerProgress.quantumUnlocked(),
    description: "You can now automatically buy Photon and Gluon Upgrades, they no longer spent their amount.",
    requirement: () => i18n.t("X_supernova", { value: formatInt(40) }),
    check: () => Currency.supernova.gte(40),
    cost: DC.E48
  },
  qol9: {
    id: "qol9",
    branch: ["unl1"],
    description: "You can now automatically buy Radiation Boosters, they no longer spent Radiation.",
    requirement: () => i18n.t("X_supernova", { value: formatInt(78) }),
    check: () => Currency.supernova.gte(78),
    cost: DC.E111
  },
  qol8: {
    id: "qol8",
    branch: ["unl1"],
    description: "You can now automatically Pent up, Pent no longer resets anything.",
    requirement: () => i18n.t("X_supernova", { value: formatInt(60) }),
    check: () => Currency.supernova.gte(60),
    cost: DC.E78
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
    }
  },
  unl2: {
    id: "unl2",
    branch: ["quQol7"],
    requirement: () => `Quantize ${formatInt(20)} times.`,
    check: () => Currency.quantizes.gte(DC.D20),
    description: "Unlock Primordium.",
    cost: DC.D50,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  quQol1: {
    id: "quQol1",
    isUnlocked: () => PlayerProgress.quantumUnlocked(),
    branch: [],
    description: "You now automatically purchase supernova tree upgrades as long as they don't cost quantum foam.",
    cost: DC.D3,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  quQol2: {
    id: "quQol2",
    branch: ["quQol1"],
    requirement: () => `Become ${formatInt(81)} Supernovas without getting tiers from U-Quark in Quantum run.`,
    check: () => Currency.supernova.gte(81) && FermionType.quarks.fermions.all.every(x => x.tier.eq(0)),
    description: "Keep U-Quark Tiers on going Quantum.",
    cost: DC.D4,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  quQol3: {
    id: "quQol3",
    branch: ["quQol1"],
    requirement: () => `Reach ${formatMass(mlt(DC.E4))} of mass without completing Challenges 1-4 in Quantum run.`,
    check: () => Currency.mass.gte(mlt(DC.E4)) && [1, 2, 3, 4].every(x => Challenge(x).completions.eq(0)),
    description: "You can now automatically complete Challenges 1-4.",
    cost: DC.D4,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  quQol4: {
    id: "quQol4",
    branch: ["quQol1"],
    description: "You can now automatically become a supernova, it no longer resets anything.",
    cost: DC.D4,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  quQol5: {
    id: "quQol5",
    branch: ["quQol1"],
    requirement: () => `Reach ${formatMass(mlt(DC.D1_35E4))} of mass without completing Challenges 5, 6 & 8 in Quantum run.`,
    check: () => Currency.mass.gte(mlt(DC.D1_35E4)) && [5, 6, 8].every(x => Challenge(x).completions.eq(0)),
    description: "You can now automatically complete Challenges 5-8.",
    cost: DC.D4,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  quQol6: {
    id: "quQol6",
    branch: ["quQol1"],
    requirement: () => `Become ${formatInt(42)} Supernovas without getting tiers from U-Lepton in Quantum run.`,
    check: () => Currency.supernova.gte(42) && FermionType.leptons.fermions.all.every(x => x.tier.eq(0)),
    description: "Keep U-Lepton Tiers on going Quantum.",
    cost: DC.D4,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  quQol7: {
    id: "quQol7",
    branch: ["quQol3", "quQol5"],
    requirement: () => `Reach ${formatMass(mlt(DC.D5000))} of mass without completing Challenges 9-12 in Quantum run, while in [Bottom].`,
    check: () => Currency.mass.gte(mlt(DC.D5000)) && [9, 10, 11, 12].every(x => Challenge(x).completions.eq(0)) && FermionType.quarks.fermions.bottom.isActive,
    description: "Keep challenge 9-12 completions on going Quantum.",
    cost: DC.D25,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  chal1: {
    id: "chal1",
    branch: [],
    description: () => `Add ${formatInt(100)} more C7 & C8 maximum completions.`,
    effect: DC.E2,
    requirement: () => i18n.t("X_supernova", { value: formatInt(4) }),
    check: () => Currency.supernova.gte(4),
    cost: DC.D6000
  },
  chal2: {
    id: "chal2",
    branch: ["chal1"],
    description: "Keep challenge 1-4 completions on reset.",
    requirement: () => `Reach ${formatMass(DC.E2_05E6)} of mass without challenge 1-4 completions in a Supernova run.`,
    check: () => Currency.mass.gte(DC.E2_05E6) && Challenges.all.slice(0, 4).every(chal => chal.completions.eq(0)),
    cost: DC.E4
  },
  chal4a: {
    id: "chal4a",
    branch: ["chal4"],
    isUnlocked: () => Bosons.areUnlocked,
    description: "Challenge 9’s effect is better.",
    effect: DC.C2D7,
    cost: DC.E8
  },
  chal4b: {
    id: "chal4b",
    branch: ["chal4"],
    isUnlocked: () => PlayerProgress.quantumUnlocked(),
    description: () => `Add ${formatInt(100)} more C9 completions.`,
    effect: DC.E2,
    cost: DC.E480
  },
  chal3: {
    id: "chal3",
    branch: ["chal1"],
    description: "Keep challenge 5-8 completions on reset.",
    requirement: () => `Reach ${formatMass(DC.E1_75E4)} of Black Hole without challenge 5-8 completions in a Supernova run.`,
    check: () => Currency.blackHole.gte(DC.E1_75E4) && Challenges.all.slice(4, 8).every(chal => chal.completions.eq(0)),
    cost: DC.E4
  },
  chal4: {
    id: "chal4",
    branch: ["chal2", "chal3"],
    description: "Unlock the 9th Challenge.",
    cost: DC.D1_5E4
  },
  chal5: {
    id: "chal5",
    branch: ["chal4"],
    description: "Unlock the 10th Challenge.",
    cost: DC.E17
  },
  chal6: {
    id: "chal6",
    branch: ["chal5"],
    isUnlocked: () => Radiation.isUnlocked,
    description: "Unlock the 11th Challenge.",
    cost: DC.E88
  },
  chal7: {
    id: "chal7",
    branch: ["chal6"],
    description: "Unlock the 12th Challenge.",
    cost: DC.E200
  },
  bs4: {
    id: "bs4",
    branch: ["bs2"],
    isUnlocked: () => Fermions.areUnlocked,
    description: () => `Raise Z Bosons gain to the ${format(DC.D1_5, 1)}th power.`,
    effect: DC.D1_5,
    cost: DC.E24
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
    cost: DC.E13
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
    cost: DC.E14
  },
  fn1: {
    id: "fn1",
    branch: ["bs1"],
    isUnlocked: () => Fermions.areUnlocked,
    description: "Tickspeed affects Fermions gain at a reduced rate.",
    effect: () => DC.D1_25.pow(Softcap.dilation(MassUpgrade.tickspeed.boughtAmount, DC.E24, DC.D0_5).pow(DC.D0_4)),
    formatEffect: value => formatX(value),
    cost: DC.E27
  },
  bs3: {
    id: "bs3",
    branch: ["bs1"],
    description: "Neutrons gain is affected by Graviton's effect at a reduced rate.",
    effect: () => Softcap.dilation(Softcap.power(Boson.graviton.effectValue.add(1).sqrt(), DC.E1000, DC.C1D3), DC.EE38, DC.D0_95),
    formatEffect: value => formatX(value),
    softcapped: value => value.gte(DC.E1000),
    cost: DC.E14
  },
  fn4: {
    id: "fn4",
    branch: ["fn1"],
    isUnlocked: () => NeutronUpgrade.fn2.isBought,
    description: "The second Photon and Gluon Upgrades are slightly stronger.",
    effect: DC.D2,
    cost: DC.E39
  },
  fn3: {
    id: "fn3",
    branch: ["fn1"],
    description: () => `Super Fermion scaling is ${formatPercents(0.075, 1)} weaker.`,
    effect: 0.925,
    requirement: () => `Reach ${format(DC.E7)} of any Fermions.`,
    check: () => Currency.uQuarks.value.max(Currency.uLeptons.value).gte(DC.E7),
    cost: DC.E31
  },
  fn9: {
    id: "fn9",
    branch: ["fn1"],
    description: () => `Fermions [Strange] and [Neutrino] max tier is increased by ${formatInt(2)}.`,
    effect: DC.D2,
    cost: DC.E166
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
    cost: DC.E33
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
    cost: DC.E42
  },
  fn12: {
    id: "fn12",
    branch: ["fn3"],
    description: () => `Pre-meta fermion scalings are ${formatPercents(0.9, 0)} weaker.`,
    effect: DC.D0_1,
    cost: DC.E960
  },
  fn11: {
    id: "fn11",
    isUnlocked: () => Primordium.isUnlocked,
    branch: ["fn9"],
    description: () => `[Strange], [Top], [Bottom], [Neutrino], [Neut-Muon] maximum tiers are increased by ${formatInt(5)}.`,
    effect: DC.D5,
    cost: DC.E680
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
    cost: DC.E48
  },
  fn10: {
    id: "fn10",
    branch: ["fn5"],
    isUnlocked: () => Primordium.isUnlocked,
    description: "Uncap [Electron] tier, its effect is overpowered.",
    requirement: () => `Reach ${format(DC.E1_5E8)} atoms while in [Electron] and 9th Challenge.`,
    check: () => (FermionType.leptons.fermions.electron.isActive &&
      Challenge(9).isRunning &&
      Currency.atoms.gte(DC.E1_5E8)
    ),
    cost: DC.E600
  },
  fn7: {
    id: "fn7",
    branch: ["fn6"],
    description: "Unlock two more types of U-Quark & U-Fermion.",
    cost: DC.E90
  },
  fn8: {
    id: "fn8",
    branch: ["fn7"],
    description: "Unlock two final types of U-Quark & U-Fermion.",
    cost: DC.E159
  },
  rad1: {
    id: "rad1",
    branch: [],
    isUnlocked: () => Radiation.isUnlocked,
    description: "Gain more frequency based on Supernova, it will also multiply Radiations that is not the last available types.",
    effect: () => Currency.supernova.value.add(1),
    formatEffect: value => formatX(value),
    cost: DC.E54
  },
  rad2: {
    id: "rad2",
    branch: ["rad1"],
    description: () => `Gain ${formatX(DC.E1, 0)} more all radiation types.`,
    effect: DC.E1,
    cost: DC.E72
  },
  rad3: {
    id: "rad3",
    branch: ["rad1"],
    description: () => `Radiation Boosts are ${formatX(1.1, 1)} cheaper.`,
    effect: 1.1,
    cost: DC.E86
  },
  rad4: {
    id: "rad4",
    branch: ["rad2"],
    description: "All Meta-Boosts are twice as effective.",
    effect: DC.D2,
    cost: DC.E118
  },
  rad5: {
    id: "rad5",
    branch: ["rad3"],
    description: () => `All Radiation gains are increased by ${formatPercents(0.1, 0)} for every Supernova you have become.`,
    effect: () => DC.D1_1.pow(Currency.supernova.value),
    formatEffect: value => formatX(value),
    cost: DC.E170
  },
  rad6: {
    id: "rad6",
    branch: ["rad4"],
    isUnlocked: () => Primordium.isUnlocked,
    description: "Bonus radiation boosts are stronger based on radiation type.",
    cost: DC.E490
  },
  qf1: {
    id: "qf1",
    isUnlocked: () => PlayerProgress.quantumUnlocked(),
    branch: [],
    description: () => `Gain more Quantum Foams based on Supernovas.`,
    effect: () => Currency.supernova.value.sqrt().div(10).add(1),
    formatEffect: value => formatX(value),
    cost: DC.E290
  },
  qf2: {
    id: "qf2",
    isUnlocked: () => Primordium.isUnlocked,
    branch: ["qf1"],
    description: "Quantum Foams are boosted by Neutron Stars.",
    effect: () => Currency.supernova.value.add(1).log10().add(1).pow(DC.C1D3),
    formatEffect: value => formatX(value),
    cost: DC.E735
  },
  qu0: {
    id: "qu0",
    isUnlocked: () => PlayerProgress.quantumUnlocked(),
    branch: [],
    description: "Good luck with the new era!",
    cost: DC.D0,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  qu1: {
    id: "qu1",
    branch: ["qu0"],
    description: () => `Fermion requirements are decreased by ${formatPercents(0.2, 0)}.`,
    effect: DC.C1D1_2,
    cost: DC.D1,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  qu2: {
    id: "qu2",
    branch: ["qu0"],
    description: () => `W+ Boson's 1st effect is overpowered.`,
    cost: DC.D1,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  qu3: {
    id: "qu3",
    branch: ["qu0"],
    description: () => `BH formula's softcap is ${formatPercents(0.3, 0)} weaker.`,
    effect: DC.D0_7,
    cost: DC.D1,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  qu4: {
    id: "qu4",
    branch: ["qu1", "qu2", "qu3"],
    description: () => `Remove softcaps from [sn2]'s effect.`,
    cost: DC.D35,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  qu5: {
    id: "qu5",
    branch: ["qu4"],
    description: "Blueprint Particles & Chromas are affected by Tickspeed Effect at a reduced rate.",
    effect: () => overflow(MassUpgrade.tickspeed.effectValue.add(1).log10().add(1).log10().add(1).pow(3), DC.D5E8, DC.D0_1),
    formatEffect: value => formatX(value),
    cost: DC.E2,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  prim1: {
    id: "prim1",
    branch: ["qu5"],
    description: () => `Primordium Theorem’s base requirement is reduced by ${formatInt(1)}.`,
    effect: DC.D1,
    cost: DC.D200,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  },
  prim2: {
    id: "prim2",
    branch: ["prim1"],
    description: "Theta Particle’s second effect is now added.",
    cost: DC.D500,
    type: NEUTRON_UPGRADE_TYPE.QUANTUM
  }
};