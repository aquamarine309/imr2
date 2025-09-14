import { DC } from "@/core/constants";

const challengeType = {
  DARK_MATTER: {
    resetKey: "enter_challenge_reset_dark_matter",
    titleKey: "dark_matter_challenges",
    reset: () => Currency.darkMatter.resetLayer(true),
    currency: () => Currency.mass.value,
    formatGoal: value => formatMass(value)
  },
  ATOM: {
    resetKey: "enter_challenge_reset_atom",
    titleKey: "atom_challenges",
    reset: () => Currency.atoms.resetLayer(true),
    currency: () => Currency.blackHole.value,
    formatGoal: value => i18n.t("X_black_hole", { value: formatMass(value) })
  },
  SUPERNOVA: {
    resetKey: "enter_challenge_reset_supernova",
    titleKey: "supernova_challenges",
    reset: () => Currency.supernova.resetLayer(true),
    currency: () => Currency.mass.value,
    formatGoal: value => formatMass(value)
  },
  DARKNESS: {
    name: "a darkness",
    title: "Darkness"
  },
  FSS: {
    name: "an FSS",
    title: "FSS"
  },
  INFINITY: {
    name: "an Infinity",
    title: "Infinity"
  }
};

export const challenges = [
  {
    id: 1,
    isUnlocked: () => true,
    description: () => `Super rank and mass upgrade scaling starts at ${formatInt(25)}. Also, Super tickspeed starts at ${formatInt(50)}.`,
    max: () => DC.E2.plusEffectOf(Challenge(7).reward),
    baseGoal: DC.D1_5E58,
    goalPow: DC.D1_3,
    goalMult: DC.D5,
    reward: {
      description: "Super Rank starts later, Super Tickspeed scales weaker based on completions.",
      effects: {
        rank: value => Softcap.mult(value, 20, 0.25).floor(),
        tickspeed: value => DC.D0_96.pow(value.sqrt())
      },
      formatEffect: effects => `+${format(effects.rank, 0)} later to Super Rank starting,
      ${formatPercents(DC.D1.minus(effects.tickspeed))} weaker to Super Tickspeed scaling`
    },
    type: challengeType.DARK_MATTER
  },
  {
    id: 2,
    isUnlocked: () => Challenge(1).completions.gte(1) || PlayerProgress.atomUnlocked(),
    description: "You cannot buy Tickspeed.",
    max: () => DC.E2.plusEffectOf(Challenge(7).reward),
    baseGoal: DC.D1_989E40,
    goalPow: DC.D1_3,
    goalMult: DC.E1,
    reward: {
      description: () => `Each completion adds +${formatPercents(0.075, 1)} to Tickspeed Power.`,
      effect: value => {
        const effect = value.times(0.075);
        if (GameElement(39).canBeApplied) return effect;
        return Softcap.power(effect.add(1), 1.3, DC.D0_5.powEffectOf(GameElement(8))).minus(1);
      },
      formatEffect: value => `+${formatPercents(value)}`,
      softcapped: value => !GameElement(39).canBeApplied && value.gte(0.3)
    },
    type: challengeType.DARK_MATTER
  },
  {
    id: 3,
    isUnlocked: () => Challenge(2).completions.gte(1) || PlayerProgress.atomUnlocked(),
    description: () => `Mass gain softcap starts ${formatInt(150)} OoMs eariler, and is stronger.`,
    effect: DC.E150,
    max: () => DC.E2.plusEffectOf(Challenge(7).reward),
    baseGoal: DC.D2_9835E49,
    goalPow: () => DC.D1_25.timesEffectOf(GameElement(10)),
    goalMult: DC.D25,
    reward: {
      description: "Mass gain is raised based on completions (doesn't apply in this challenge).",
      effect: value => overflow(Softcap.power(
        value.timesEffectOf(GameElement(64))
          .pow(DC.C2D3).times(0.01).add(1), 3, 0.25
      ), DC.E12, DC.D0_5),
      formatEffect: value => formatPow(value),
      softcapped: value => value.gte(3),
      effectCondition: () => (!Challenge(3).isRunning ||
       Challenge(10).isRunning ||
       FermionType.quarks.fermions.strange.isActive
      )
    },
    type: challengeType.DARK_MATTER
  },
  {
    id: 4,
    isUnlocked: () => Challenge(3).completions.gte(1) || PlayerProgress.atomUnlocked(),
    description: () => `Rage Power gain is rooted by ${formatInt(10)}. Additionally, mass gain softcap starts ${formatInt(100)} OoMs eariler.`,
    effect: DC.E100,
    max: () => DC.E2.plusEffectOf(Challenge(7).reward),
    baseGoal: DC.D1_736881338559743E133,
    goalPow: () => DC.D1_25.timesEffectOf(GameElement(10)),
    goalMult: DC.D30,
    reward: {
      description: "Rage Powers gain is raised by completions.",
      effect: value => overflow(Softcap.power(
        value.timesEffectOf(GameElement(64))
          .pow(DC.C2D3).times(0.01).add(1), 3, 0.25
      ), DC.E12, DC.D0_5),
      formatEffect: value => formatPow(value),
      softcapped: value => value.gte(3)
    },
    type: challengeType.DARK_MATTER
  },
  {
    id: 5,
    isUnlocked: () => PlayerProgress.atomUnlocked(),
    description: "You cannot Rank up.",
    max: () => DC.D50.plusEffectOf(GameElement(13)),
    baseGoal: DC.D1_5E136,
    goalPow: DC.D1_25,
    goalMult: DC.D50,
    noReset: () => false,
    reward: {
      description: "Rank requirement is weaker based on completions.",
      effect: value => DC.D0_97.pow(Softcap.power(value.sqrt(), DC.D5, DC.D0_5)),
      softcapped: value => value.lte(DC.D0_97.pow(DC.D5)),
      formatEffect: value => i18n.t("X_weaker", { value: formatPercents(DC.D1.minus(value)) })
    },
    type: challengeType.ATOM
  },
  {
    id: 6,
    isUnlocked: () => PlayerProgress.supernovaUnlocked() || PlayerProgress.atomUnlocked() && Challenge(5).completions.gt(0),
    description: "You cannot buy Tickspeed or BH Condenser.",
    max: () => DC.D50.plusEffectOf(GameElement(13)),
    goalPow: DC.D1_25,
    goalMult: DC.D64,
    baseGoal: DC.D1_989E38,
    reward: {
      description: () => `Every completion adds ${formatPercents(0.1, 0)} to tickspeed and BH condenser power.`,
      effect: value => {
        const effect = value.times(0.1);
        if (GameElement(39).canBeApplied) return effect;
        return Softcap.power(effect.add(1), DC.D1_5, DC.D0_5).minus(1);
      },
      softcapped: value => !GameElement(39).canBeApplied && value.gte(DC.D0_5),
      formatEffect: value => `+${format(value)}x`
    },
    type: challengeType.ATOM
  },
  {
    id: 7,
    isUnlocked: () => PlayerProgress.supernovaUnlocked() || PlayerProgress.atomUnlocked() && Challenge(6).completions.gt(0),
    description: "You cannot gain rage powers. Instead, dark matters are gained from mass at a reduced rate. Additionally, mass gain softcap is stronger.",
    effect: DC.D6,
    max: () => DC.D50.plusEffectsOf(
      GameElement(20),
      GameElement(41),
      NeutronUpgrade.chal1,
      GameElement(60),
      GameElement(65)
    ),
    goalPow: DC.D1_25,
    goalMult: DC.D64,
    baseGoal: DC.D1_25E76,
    reward: {
      description: () => `Each completion increases challenges 1-4 cap by ${formatInt(2)}.`,
      effect: value => value.times(2).timesEffectOf(GameElement(5)),
      formatEffect: value => formatPlus(value, 0)
    },
    milestones: [
      {
        id: 0,
        requirement: DC.D16,
        description: "On 16th completion, unlock Elements."
      }
    ],
    type: challengeType.ATOM
  },
  {
    id: 8,
    isUnlocked: () => PlayerProgress.supernovaUnlocked() || PlayerProgress.atomUnlocked() && Challenge(7).completions.gt(0),
    description: () => `Dark Matter & Mass from Black Hole gains are rooted by ${formatInt(8)}.`,
    effect: 0.125,
    max: () => DC.D50.plusEffectsOf(
      GameElement(33),
      NeutronUpgrade.chal1,
      GameElement(56),
      GameElement(65)
    ),
    goalPow: DC.D1_3,
    goalMult: DC.D80,
    baseGoal: DC.D1_989E38,
    reward: {
      description: "Dark Matter & Mass from Black Hole gains are raised by completions.",
      effect: value => overflow(Softcap.power(
        value.timesEffectOf(GameElement(64))
          .pow(4 / 7).times(0.02).add(1), DC.D2_3, DC.D0_25
      ), DC.E10, DC.D0_5),
      formatEffect: value => formatPow(value),
      softcapped: value => value.gte(DC.D2_3)
    },
    milestones: [
      {
        id: 0,
        requirement: DC.D1,
        description: "On first completion, unlock 3 rows of Elements"
      }
    ],
    type: challengeType.ATOM
  },
  {
    id: 9,
    isUnlocked: () => NeutronUpgrade.chal4.isBought,
    description: () => `You cannot assign quarks. Additionally, mass gains exponent is raised to ${format(0.9, 1)}th power.`,
    effect: DC.D0_9,
    max: () => DC.E2,
    goalPow: DC.D2,
    goalMult: DC.E500,
    baseGoal: DC.D1_5E99056,
    reward: {
      description: "Improve Magnesium-12.",
      effect: value => {
        let pow = value.pow(NeutronUpgrade.chal4a.effectOrDefault(DC.D0_25)).times(DC.D0_1).add(DC.D1);
        pow = Softcap.power(pow, DC.D21, DC.D0_25);
        pow = overflow(pow, DC.D5E8, DC.D0_5);
        pow = overflow(pow, DC.E12, DC.D0_15);
        return pow;
      },
      formatEffect: value => formatPow(value),
      softcapped: value => value.gte(DC.D21)
    },
    type: challengeType.SUPERNOVA
  },
  {
    id: 10,
    isUnlocked: () => NeutronUpgrade.chal5.isBought,
    description: "You are trapped in mass dilation and challenges 1-8.",
    max: () => DC.E2,
    goalPow: DC.D2,
    goalMult: DC.E1000,
    baseGoal: DC.D1_5E30056,
    reward: {
      description: "The exponent of the RP formula is multiplied by completions. (this effect doesn't work while in this challenge)",
      effect: value => value.pow(DC.C4D7).times(DC.D0_01).add(1),
      formatEffect: value => formatX(value),
      effectCondition: () => !Challenge(10).canBeApplied
    },
    milestones: [
      {
        id: 0,
        requirement: DC.D1,
        description: "On first completion, unlock Fermions!"
      }
    ],
    type: challengeType.SUPERNOVA
  }
];