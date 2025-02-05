import { DC } from "@/core/constants";

const challengeType = {
  DARK_MATTER: {
    name: "a dark matter",
    reset: () => Currency.darkMatter.resetLayer(true),
    currency: () => Currency.mass.value,
    formatGoal: value => formatMass(value),
    resetEvent: GAME_EVENT.ATOM_RESET
  },
  ATOM: {
    name: "an atom",
    reset: () => Currency.atoms.resetLayer(true),
    currency: () => Currency.blackHole.value,
    formatGoal: value => `${formatMass(value)} of Black hole`,
    resetEvent: GAME_EVENT.SUPERNOVA_RESET
  },
  SUPERNOVA: {
    name: "a supermova"
  },
  DARKNESS: {
    name: "a darkness"
  },
  FSS: {
    name: "an FSS"
  },
  INFINITY: {
    name: "an Infinity"
  }
};

export const challenges = [
  {
    id: 1,
    name: "Instant Scale",
    isUnlocked: () => true,
    description: () => `Super rank and mass upgrade scaling starts at ${formatInt(25)}. Also, Super tickspeed starts at ${formatInt(50)}.`,
    max: () => DC.E2.plusEffectOf(Challenge(7).reward),
    baseGoal: DC.D1_5E58,
    goalPow: DC.D1_3,
    goalMult: DC.D5,
    reward: {
      description: "Super Rank starts later, Super Tickspeed scales weaker based on completions.",
      effects: {
        rank: value => softcap(value, 20, 0.25, SOFTCAP_TYPE.MULT).floor(),
        tickspeed: value => DC.D0_96.pow(value.sqrt())
      },
      formatEffect: () => {
        const effects = Challenge(1).reward.effects;
        return `+${format(effects.rank.effectValue, 0)} later to Super Rank starting,
        ${formatPercents(DC.D1.minus(effects.tickspeed.effectValue))} weaker to Super Tickspeed scaling`;
      }
    },
    noReset: () => AtomUpgrade(3).canBeApplied,
    type: challengeType.DARK_MATTER
  },
  {
    id: 2,
    name: "Anti-Tickspeed",
    isUnlocked: () => Challenge(1).completions.gte(1) || PlayerProgress.atomUnlocked(),
    description: "You cannot buy Tickspeed.",
    max: () => DC.E2.plusEffectOf(Challenge(7).reward),
    baseGoal: DC.D1_989E40,
    goalPow: DC.D1_3,
    goalMult: DC.E1,
    noReset: () => AtomUpgrade(3).canBeApplied,
    reward: {
      description: () => `Each completion adds +${formatPercents(0.075, 1)} to Tickspeed Power.`,
      effect: value => softcap(value.times(0.075).add(1), 1.3, DC.D0_5.powEffectOf(GameElement(8)), SOFTCAP_TYPE.POWER).minus(1),
      formatEffect: value => `+${formatPercents(value)}`,
      softcapped: value => value.gte(0.3)
    },
    type: challengeType.DARK_MATTER
  },
  {
    id: 3,
    name: "Melted Mass",
    isUnlocked: () => Challenge(2).completions.gte(1) || PlayerProgress.atomUnlocked(),
    description: () => `Mass gain softcap starts ${formatInt(150)} OoMs eariler, and is stronger.`,
    effect: DC.E150,
    max: () => DC.E2.plusEffectOf(Challenge(7).reward),
    baseGoal: DC.D2_9835E49,
    goalPow: () => DC.D1_25.timesEffectOf(GameElement(10)),
    goalMult: DC.D25,
    noReset: () => AtomUpgrade(3).canBeApplied,
    reward: {
      description: "Mass gain is raised based on completions (doesn't apply in this challenge).",
      effect: value => softcap(value.pow(2 / 3).times(0.01).add(1), 3, 0.25, SOFTCAP_TYPE.POWER),
      formatEffect: value => formatPow(value),
      softcapped: value => value.gte(3),
      effectCondition: () => !Challenge(3).isRunning
    },
    type: challengeType.DARK_MATTER
  },
  {
    id: 4,
    name: "Weakened Rage",
    isUnlocked: () => Challenge(3).completions.gte(1) || PlayerProgress.atomUnlocked(),
    description: () => `Rage Power gain is rooted by ${formatInt(10)}. Additionally, mass gain softcap starts ${formatInt(100)} OoMs eariler.`,
    effect: DC.E100,
    max: () => DC.E2.plusEffectOf(Challenge(7).reward),
    baseGoal: DC.D1_736881338559743E133,
    goalPow: () => DC.D1_25.timesEffectOf(GameElement(10)),
    goalMult: DC.D30,
    noReset: () => AtomUpgrade(3).canBeApplied,
    reward: {
      description: "Rage Powers gain is raised by completions.",
      effect: value => softcap(value.pow(2 / 3).times(0.01).add(1), 3, 0.25, SOFTCAP_TYPE.POWER),
      formatEffect: value => formatPow(value),
      softcapped: value => value.gte(3)
    },
    type: challengeType.DARK_MATTER
  },
  {
    id: 5,
    name: "No Rank",
    isUnlocked: () => PlayerProgress.atomUnlocked(),
    description: "You cannot Rank up.",
    max: () => DC.D50.plusEffectOf(GameElement(13)),
    baseGoal: DC.D1_5E136,
    goalPow: DC.D1_25,
    goalMult: DC.D50,
    noReset: () => false,
    reward: {
      description: "Rank requirement is weaker based on completions.",
      effect: value => DC.D0_97.pow(softcap(value.sqrt(), DC.D5, DC.D0_5, SOFTCAP_TYPE.POWER)),
      softcapped: value => value.lte(DC.D0_97.pow(DC.D5)),
      formatEffect: value => `${formatPercents(DC.D1.minus(value))} weaker`
    },
    type: challengeType.ATOM
  },
  {
    id: 6,
    name: "No Tickspeed & Condenser",
    isUnlocked: () => PlayerProgress.atomUnlocked() && Challenge(5).completions.gt(0),
    description: "You cannot buy Tickspeed or BH Condenser.",
    max: () => DC.D50.plusEffectOf(GameElement(13)),
    goalPow: DC.D1_25,
    goalMult: DC.D64,
    baseGoal: DC.D1_989E38,
    reward: {
      description: () => `Every completion adds ${formatPercents(0.1, 0)} to tickspeed and BH condenser power.`,
      effect: value => softcap(value.times(0.1).add(1), DC.D1_5, DC.D0_5, SOFTCAP_TYPE.POWER).minus(1),
      softcapped: value => value.gte(DC.D0_5),
      formatEffect: value => `+${format(value)}x`
    },
    type: challengeType.ATOM
  },
  {
    id: 7,
    name: "No Rage Powers",
    isUnlocked: () => PlayerProgress.atomUnlocked() && Challenge(6).completions.gt(0),
    description: "You cannot gain rage powers. Instead, dark matters are gained from mass at a reduced rate. Additionally, mass gain softcap is stronger.",
    effect: DC.D6,
    max: () => DC.D50.plusEffectOf(GameElement(20)),
    goalPow: DC.D1_25,
    goalMult: DC.D64,
    baseGoal: DC.D1_25E76,
    reward: {
      description: () => `Each completion increases challenges 1-4 cap by ${formatInt(2)}.`,
      effect: value => value.times(2).timesEffectOf(GameElement(5)),
      formatEffect: value => `+${format(value, 0)}`
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
    name: "White Hole",
    isUnlocked: () => PlayerProgress.atomUnlocked() && Challenge(7).completions.gt(0),
    description: () => `Dark Matter & Mass from Black Hole gains are rooted by ${formatInt(8)}.`,
    effect: 0.125,
    max: () => DC.D50,
    goalPow: DC.D1_3,
    goalMult: DC.D80,
    baseGoal: DC.D1_989E38,
    reward: {
      description: "Dark Matter & Mass from Black Hole gains are raised by completions.",
      effect: value => softcap(value.pow(4 / 7).times(0.02).add(1), DC.D2_3, DC.D0_25, SOFTCAP_TYPE.POWER),
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
  }
];