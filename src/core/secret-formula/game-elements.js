import { DC } from "@/core/constants";

export const gameElements = [
  {
    id: 1,
    name: "H",
    fullName: "Hydrogen",
    description: "Quark gain formula is better.",
    cost: DC.D5E8,
    position: [0, 0]
  },
  {
    id: 2,
    name: "He",
    fullName: "Helium",
    description: () => `Hardened Challenge scaling is ${formatPercents(0.25, 0)} weaker.`,
    effect: 0.75,
    cost: DC.D2_5E12,
    position: [0, 17],
  },
  {
    id: 3,
    name: "Li",
    fullName: "Lithium",
    description: "Electron Powers boost Atomic Powers gain.",
    effect: () => overflow(Softcap.dilation(Particles.electron.power.add(1).sqrt(), DC.EE4, DC.D0_9), DC.EE100, DC.D0_25),
    formatEffect: value => formatX(value),
    cost: DC.E15,
    position: [1, 0]
  },
  {
    id: 4,
    name: "Be",
    fullName: "Beryllium",
    description: "Stronger's power is stronger based on Proton Powers.",
    effect: () => Softcap.power(Particles.proton.power.max(1).log10().pow(0.8).div(50).add(1), DC.E45, DC.D0_1),
    formatEffect: value => `${formatX(value)} stronger`,
    cost: DC.D2_5E16,
    position: [1, 1],
  },
  {
    id: 5,
    name: "B",
    fullName: "Boron",
    description: "The 7th challenge's effect is twice as effective.",
    effect: DC.D2,
    cost: DC.E18,
    position: [1, 12],
  },
  {
    id: 6,
    name: "C",
    fullName: "Carbon",
    description: () => `Gain ${formatPercents(0.01, 0)} more quarks for each challenge completion.`,
    effect: () => {
      let total = DC.D0;
      for (const challenge of Challenges.all) {
        total = total.add(challenge.completions.times(challenge.id > 4 ? 2 : 1));
      }
      total = total.timesEffectOf(GameElement(7));
      return total.div(100).add(1);
    },
    formatEffect: value => formatX(value),
    cost: DC.D5E18,
    position: [1, 13],
  },
  {
    id: 7,
    name: "N",
    fullName: "Nitrogen",
    description: "Carbon's effect is now multiplied by the number of elements bought.",
    effect: () => player.elements.size.toDecimal().powEffectOf(GameElement(11)),
    formatEffect: value => formatX(value),
    cost: DC.E20,
    position: [1, 14],
  },
  {
    id: 8,
    name: "O",
    fullName: "Oxygen",
    description: () => `C2's reward's softcap is ${formatPercents(0.75, 0)} weaker.`,
    effect: DC.D0_25,
    cost: DC.E21,
    position: [1, 15],
  },
  {
    id: 9,
    name: "F",
    fullName: "Fluorine",
    description: () => `Tetr's requirement is ${formatPercents(0.15, 0)} weaker.`,
    effect: 0.85,
    cost: DC.D6_5E21,
    position: [1, 16],
  },
  {
    id: 10,
    name: "Ne",
    fullName: "Neon",
    description: "3rd & 4th challenges' scalings are weaker.",
    cost: DC.E24,
    effect: 0.95,
    position: [1, 17],
  },
  {
    id: 11,
    name: "Na",
    fullName: "Sodium",
    description: "Nitrogen's multiplier is squared.",
    effect: 2,
    cost: DC.E27,
    position: [2, 0],
  },
  {
    id: 12,
    name: "Mg",
    fullName: "Magnesium",
    description: "Power's gain from each particle formula is better.",
    cost: DC.E29,
    position: [2, 1],
  },
  {
    id: 13,
    name: "Al",
    fullName: "Aluminium",
    description: () => `For every c7 completion, increase c5 and c6 cap by ${formatInt(2)}.`,
    effect: () => Challenge(7).completions.times(2),
    formatEffect: value => `+${format(value, 0)}`,
    cost: DC.D2_5E30,
    position: [2, 12],
  },
  {
    id: 14,
    name: "Si",
    fullName: "Silicon",
    description: () => `Passively gain ${formatPercents(0.05, 0)} of the quarks you would get from resetting each second.`,
    cost: DC.E33,
    position: [2, 13],
  },
  {
    id: 15,
    name: "P",
    fullName: "Phosphorus",
    description: () => `Super BH Condenser & Cosmic Ray scale ${formatPercents(0.2, 0)} weaker.`,
    effect: 0.8,
    cost: DC.E34,
    position: [2, 14],
  },
  {
    id: 16,
    name: "S",
    fullName: "Sulfur",
    description: () => `Silicon's effect is +${formatPercents(0.02, 0)} better for each element bought.`,
    effect: () => player.elements.size * 0.02,
    formatEffect: value => `+${formatPercents(value, 0)}`,
    cost: DC.D5E38,
    position: [2, 15],
  },
  {
    id: 17,
    name: "Cl",
    fullName: "Chlorine",
    description: () => `Raise Atom gain by ${format(1.1, 1)}.`,
    effect: 1.1,
    cost: DC.E40,
    position: [2, 16],
  },
  {
    id: 18,
    name: "Ar",
    fullName: "Argon",
    description: "You can now automatically buy Cosmic Rays. Cosmic Ray raises tickspeed effect at an extremely reduced rate.",
    effect: () => MassUpgrade.cosmicRay.boughtAmount.pow(0.35).times(0.01).add(1),
    formatEffect: value => formatPow(value),
    cost: DC.E44,
    position: [2, 17],
  },
  {
    id: 19,
    name: "K",
    fullName: "Potassium",
    description: "2nd Neutron's effect is better.",
    effect: 2.75,
    cost: DC.E50,
    position: [3, 0],
  },
  {
    id: 20,
    name: "Ca",
    fullName: "Calcium",
    description: () => `Increase C7 cap by ${formatInt(50)}.`,
    effect: 50,
    cost: DC.E53,
    position: [3, 1],
  },
  {
    id: 21,
    name: "Sc",
    fullName: "Scandium",
    description: "Unlock Mass Dilation.",
    cost: DC.E56,
    position: [3, 2],
  },
  {
    id: 22,
    name: "Ti",
    fullName: "Titanium",
    description: "Dilated mass gain is increased by tickspeed at a reduced rate.",
    effect: () => DC.D1_25.pow(MassUpgrade.tickspeed.boughtAmount.pow(0.55)),
    formatEffect: value => formatX(value),
    cost: DC.E61,
    position: [3, 3],
  },
  {
    id: 23,
    name: "V",
    fullName: "Vanadium",
    description: "Atomic power's effects are better",
    effect: DC.D1_5,
    cost: DC.E65,
    position: [3, 4],
  },
  {
    id: 24,
    name: "Cr",
    fullName: "Chromium",
    description: () => `Passively gain ${formatPercents(1, 0)} of the atoms you would get from resetting each second. Atomic Power boost Relativistic particles gain at a reduced rate.`,
    effect: () => Currency.atomicPower.value.max(1).log10().add(1).pow(0.4),
    formatEffect: value => formatX(value),
    cost: DC.E75,
    position: [3, 5],
  },
  {
    id: 25,
    name: "Mn",
    fullName: "Manganese",
    description: () => `Increases first Mass Dilation upgrade's base by ${formatInt(1)}.`,
    effect: DC.D1,
    cost: DC.E80,
    position: [3, 6],
  },
  {
    id: 26,
    name: "Fe",
    fullName: "Iron",
    description: "Hardened challenge scaling is weaker for each element bought.",
    effect: () => DC.D0_99.pow(Softcap.power(player.elements.size.toDecimal(), DC.D30, DC.C2D3)),
    formatEffect: value => `${formatPercents(DC.D1.minus(value))} weaker`,
    cost: DC.E85,
    position: [3, 7],
  },
  {
    id: 27,
    name: "Co",
    fullName: "Cobalt",
    description: () => `Hyper/Ultra Rank & Tickspeed scales ${formatPercents(0.25, 0)} weaker.`,
    effect: 0.75,
    cost: DC.E90,
    position: [3, 8],
  },
  {
    id: 28,
    name: "Ni",
    fullName: "Nickel",
    description: () => `Mass gain is raised to ${format(1.5, 1)} while in mass dilation.`,
    effect: 1.5,
    cost: DC.E97,
    position: [3, 9],
  },
  {
    id: 29,
    name: "Cu",
    fullName: "Copper",
    description: "Proton power's effects are better.",
    cost: DC.E100,
    position: [3, 10],
  },
  {
    id: 30,
    name: "Zn",
    fullName: "Zinc",
    description: () => `Electron power's effects are better. Passively gain ${formatPercents(0.1, 0)} of each particle you would assign quarks.`,
    cost: DC.E107,
    position: [3, 11],
  },
  {
    id: 31,
    name: "Ga",
    fullName: "Gallium",
    description: "Dilated mass boosts Relativistic particles gain.",
    effect: () => Softcap.dilation(Currency.dilatedMass.value.add(1).pow(0.0125), DC.EE27, DC.D0_95),
    formatEffect: value => formatX(value),
    cost: DC.E130,
    position: [3, 12],
  },
  {
    id: 32,
    name: "Ge",
    fullName: "Germanium",
    description: () => `Increase dilated mass gain exponent by ${formatPercents(0.05, 0)}.`,
    effect: 1.05,
    cost: DC.E140,
    position: [3, 13],
  },
  {
    id: 33,
    name: "As",
    fullName: "Arsenic",
    description: () => `Add ${formatInt(50)} more C8 maximum completions.`,
    effect: DC.D50,
    cost: DC.E150,
    position: [3, 14],
  },
  {
    id: 34,
    name: "Se",
    fullName: "Selenium",
    description: "Rage power boosts Relativistic particles gain.",
    effect: () => Currency.ragePowers.value.max(1).log10().add(1).pow(DC.D0_75),
    formatEffect: value => formatX(value),
    cost: DC.E175,
    position: [3, 15],
  },
  {
    id: 35,
    name: "Br",
    fullName: "Bromine",
    description: "Mass from Black Hole boosts dilated mass gain.",
    effect: () => BlackHole.mass.max(1).log10().add(1).pow(DC.D0_8),
    formatEffect: value => formatX(value),
    cost: DC.E210,
    position: [3, 16],
  },
  {
    id: 36,
    name: "Kr",
    fullName: "Krypton",
    description: "Unlock Stars.",
    cost: DC.E225,
    position: [3, 17],
  },
  {
    id: 37,
    name: "Rb",
    fullName: "Rubidium",
    description: "Super Tier scales weaker based on Tetr.",
    effect: () => DC.D0_9.pow(Softcap.power(RankType.tetr.amount, DC.D6, DC.D0_5)),
    formatEffect: value => `${formatPercents(DC.D1.minus(value))} weaker`,
    cost: DC.E245,
    position: [4, 0],
  },
  {
    id: 38,
    name: "Sr",
    fullName: "Strontium",
    description: "Cosmic Ray's free tickspeeds now add to RU7.",
    effect: () => MassUpgrade.tickspeed.freeAmount.div(6).floor(),
    formatEffect: value => `+${format(value, 0)} to Rage Power Upgrade 7`,
    cost: DC.E260,
    position: [4, 1],
  },
  {
    id: 39,
    name: "Y",
    fullName: "Yttrium",
    description: "Remove softcap from C2 & C6 effects.",
    cost: DC.E285,
    position: [4, 2],
  },
  {
    id: 40,
    name: "Zr",
    fullName: "Zirconium",
    description: "Collapsed star boosts dilated mass gain.",
    effect: () => Softcap.dilation(Currency.stars.value.add(1).sqrt(), DC.E4E66, DC.D0_95),
    formatEffect: value => formatX(value),
    cost: DC.E303,
    position: [4, 3],
  },
  {
    id: 41,
    name: "Nb",
    fullName: "Niobium",
    description: () => `Add ${formatInt(50)} more C7 maximum completions.`,
    effect: DC.D50,
    cost: DC.E315,
    position: [4, 4],
  },
  {
    id: 42,
    name: "Mo",
    fullName: "Molybdenum",
    description: "Collapsed stars boost quark gain.",
    effect: () => overflow(overflow(Currency.stars.value.add(1).cbrt(), DC.E112, DC.D0_5), DC.E5E4, DC.D0_1),
    formatEffect: value => formatX(value),
    cost: DC.E325,
    position: [4, 5],
  },
  {
    id: 43,
    name: "Tc",
    fullName: "Technetium",
    description: "You automatically buy mass dilation upgrades if you purchased them first. They no longer spend dilated mass.",
    cost: DC.E360,
    position: [4, 6],
  },
  {
    id: 44,
    name: "Ru",
    fullName: "Ruthenium",
    description: "The Tetr requirement is broken.",
    effect: DC.D1_75,
    cost: DC.E380,
    position: [4, 7],
  },
  {
    id: 45,
    name: "Rh",
    fullName: "Rhodium",
    description: "Collapsed star boosts relativistic particles gain.",
    effect: () => Currency.stars.value.add(1).pow(0.15).clampMax(DC.E20),
    cap: DC.E20,
    formatEffect: value => formatX(value),
    cost: DC.E420,
    position: [4, 8],
  },
  {
    id: 46,
    name: "Pd",
    fullName: "Palladium",
    description: "Collapsed star's effect boosts mass of black hole gain at a reduced rate.",
    effect: () => Stars.boost.add(1).pow(0.02),
    formatEffect: value => formatX(value),
    cost: DC.E510,
    position: [4, 9],
  },
  {
    id: 47,
    name: "Ag",
    fullName: "Silver",
    description: () => `Quarks gain is raised to the ${format(1.05, 2)}th power.`,
    effect: 1.1,
    cost: DC.E610,
    position: [4, 10],
  },
  {
    id: 48,
    name: "Cd",
    fullName: "Cadmium",
    description: () => `Collapsed stars effect is ${formatPercents(0.1, 0)} stronger.`,
    effect: 1.1,
    cost: DC.E800,
    position: [4, 11],
  },
  {
    id: 49,
    name: "In",
    fullName: "Iodine",
    description: "Collapsed star boosts the last type of stars.",
    effect: () => Currency.stars.value.add(1).log10().add(1).pow(1.1),
    formatEffect: value => formatX(value),
    cost: DC.E1000,
    position: [4, 12],
  },
  {
    id: 50,
    name: "Sn",
    fullName: "Tin",
    description: () => `Star generator is now ${formatPow(1.05, 2)} stronger.`,
    effect: 1.05,
    cost: DC.E1750,
    position: [4, 13],
  },
  {
    id: 51,
    name: "Sb",
    fullName: "Antimony",
    description: () => `Mass gain softcap^2 is ${formatPercents(0.1, 0)} weaker.`,
    effect: 0.9,
    cost: DC.E2400,
    position: [4, 14],
  },
  {
    id: 52,
    name: "Te",
    fullName: "Tellurium",
    description: "Mass of black hole boosts atomic powers gain at a reduced rate.",
    effect: () => dilatedValue(BlackHole.mass.add(1), DC.D0_6),
    formatEffect: value => formatX(value),
    cost: DC.E2800,
    position: [4, 15],
  },
  {
    id: 53,
    name: "I",
    fullName: "Iodine",
    description: () => `Mass Dilation upgrade 6 is ${formatPercents(0.75, 0)} stronger.`,
    effect: 1.75,
    cost: DC.E4600,
    position: [4, 16],
  },
  {
    id: 54,
    name: "Xe",
    fullName: "Xenon",
    description: "Normal mass boosts all-star resources at a reduced rate.",
    effect: () => Currency.mass.value.add(1).log10().sqrt(),
    formatEffect: value => formatX(value),
    cost: DC.E5200,
    position: [4, 17],
  },
  {
    id: 55,
    name: "Cs",
    fullName: "Caesium",
    description: () => `Hyper/Ultra BH Condenser & Cosmic Ray scale ${formatPercents(0.25, 0)} weaker.`,
    effect: DC.D0_75,
    cost: DC.E1_6E4,
    position: [5, 0],
  },
  {
    id: 56,
    name: "Ba",
    fullName: "Barium",
    description: () => `Add ${formatInt(200)} more C8 maximum completions.`,
    effect: DC.D200,
    cost: DC.E2_2E4,
    position: [5, 1],
  },
  {
    id: 57,
    name: "La",
    fullName: "Lanthanum",
    description: "Tickspeed power boosts base of Star Booster at a reduced rate.",
    effect: () => MassUpgrade.tickspeed.power.max(1).log10().div(10).max(1),
    formatEffect: value => formatX(value),
    cost: DC.E3_6E4,
    position: [8, 2],
  },
  {
    id: 58,
    name: "Ce",
    position: [8, 3],
  },
  {
    id: 59,
    name: "Pr",
    position: [8, 4],
  },
  {
    id: 60,
    name: "Nd",
    position: [8, 5],
  },
  {
    id: 61,
    name: "Pm",
    position: [8, 6],
  },
  {
    id: 62,
    name: "Sm",
    position: [8, 7],
  },
  {
    id: 63,
    name: "Eu",
    position: [8, 8],
  },
  {
    id: 64,
    name: "Gd",
    position: [8, 9],
  },
  {
    id: 65,
    name: "Tb",
    position: [8, 10],
  },
  {
    id: 66,
    name: "Dy",
    position: [8, 11],
  },
  {
    id: 67,
    name: "Ho",
    position: [8, 12],
  },
  {
    id: 68,
    name: "Er",
    position: [8, 13],
  },
  {
    id: 69,
    name: "Tm",
    position: [8, 14],
  },
  {
    id: 70,
    name: "Yb",
    position: [8, 15],
  },
  {
    id: 71,
    name: "Lu",
    position: [8, 16],
  },
  {
    id: 72,
    name: "Hf",
    position: [5, 3],
  },
  {
    id: 73,
    name: "Ta",
    position: [5, 4],
  },
  {
    id: 74,
    name: "W",
    position: [5, 5],
  },
  {
    id: 75,
    name: "Re",
    position: [5, 6],
  },
  {
    id: 76,
    name: "Os",
    position: [5, 7],
  },
  {
    id: 77,
    name: "Ir",
    position: [5, 8],
  },
  {
    id: 78,
    name: "Pt",
    position: [5, 9],
  },
  {
    id: 79,
    name: "Au",
    position: [5, 10],
  },
  {
    id: 80,
    name: "Hg",
    position: [5, 11],
  },
  {
    id: 81,
    name: "Tl",
    position: [5, 12],
  },
  {
    id: 82,
    name: "Pb",
    position: [5, 13],
  },
  {
    id: 83,
    name: "Bi",
    position: [5, 14],
  },
  {
    id: 84,
    name: "Po",
    position: [5, 15],
  },
  {
    id: 85,
    name: "At",
    position: [5, 16],
  },
  {
    id: 86,
    name: "Rn",
    position: [5, 17],
  },
  {
    id: 87,
    name: "Fr",
    position: [6, 0],
  },
  {
    id: 88,
    name: "Ra",
    position: [6, 1],
  },
  {
    id: 89,
    name: "Ac",
    position: [9, 2],
  },
  {
    id: 90,
    name: "Th",
    position: [9, 3],
  },
  {
    id: 91,
    name: "Pa",
    position: [9, 4],
  },
  {
    id: 92,
    name: "U",
    position: [9, 5],
  },
  {
    id: 93,
    name: "Np",
    position: [9, 6],
  },
  {
    id: 94,
    name: "Pu",
    position: [9, 7],
  },
  {
    id: 95,
    name: "Am",
    position: [9, 8],
  },
  {
    id: 96,
    name: "Cm",
    position: [9, 9],
  },
  {
    id: 97,
    name: "Bk",
    position: [9, 10],
  },
  {
    id: 98,
    name: "Cf",
    position: [9, 11],
  },
  {
    id: 99,
    name: "Es",
    position: [9, 12],
  },
  {
    id: 100,
    name: "Fm",
    position: [9, 13],
  },
  {
    id: 101,
    name: "Md",
    position: [9, 14],
  },
  {
    id: 102,
    name: "No",
    position: [9, 15],
  },
  {
    id: 103,
    name: "Lr",
    position: [9, 16],
  },
  {
    id: 104,
    name: "Rf",
    position: [6, 3],
  },
  {
    id: 105,
    name: "Db",
    position: [6, 4],
  },
  {
    id: 106,
    name: "Sg",
    position: [6, 5],
  },
  {
    id: 107,
    name: "Bh",
    position: [6, 6],
  },
  {
    id: 108,
    name: "Hs",
    position: [6, 7],
  },
  {
    id: 109,
    name: "Mt",
    position: [6, 8],
  },
  {
    id: 110,
    name: "Ds",
    position: [6, 9],
  },
  {
    id: 111,
    name: "Rg",
    position: [6, 10],
  },
  {
    id: 112,
    name: "Cn",
    position: [6, 11],
  },
  {
    id: 113,
    name: "Nh",
    position: [6, 12],
    effect: DC.D0_95
  },
  {
    id: 114,
    name: "Fl",
    position: [6, 13],
  },
  {
    id: 115,
    name: "Mc",
    position: [6, 14],
  },
  {
    id: 116,
    name: "Lv",
    position: [6, 15],
  },
  {
    id: 117,
    name: "Ts",
    position: [6, 16],
  },
  {
    id: 118,
    name: "Og",
    position: [6, 17],
  },
];