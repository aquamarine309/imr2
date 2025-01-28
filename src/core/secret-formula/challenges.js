import { DC } from "@/core/constants";

export const challenges = [
  {
    id: 1,
    name: "Instant Scale",
    isUnlocked: () => true,
    description: () => `Super rank and mass upgrade scaling starts at ${formatInt(25)}. Also, Super tickspeed starts at ${formatInt(50)}.`,
    max: () => DC.E2,
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
    type: CHALLENGE_TYPE.DARK_MATTER
  },
  {
    id: 2,
    name: "Anti-Tickspeed",
    isUnlocked: () => Challenge(1).completions.gte(1),
    description: "You cannot buy Tickspeed.",
    max: () => DC.E2,
    baseGoal: DC.D1_989E40,
    goalPow: DC.D1_3,
    goalMult: DC.E1,
    reward: {
      description: () => `Each completion adds +${formatPercents(0.075, 1)} to Tickspeed Power.`,
      effect: value => softcap(value.times(0.075).add(1), 1.3, 0.5, SOFTCAP_TYPE.POWER).minus(1),
      formatEffect: value => `+${formatPercents(value)}`,
      softcapped: value => value.gte(0.3)
    },
    type: CHALLENGE_TYPE.DARK_MATTER
  },
  {
    id: 3,
    name: "Melted Mass",
    isUnlocked: () => Challenge(2).completions.gte(1),
    description: () => `Mass gain softcap starts ${formatInt(150)} OoMs eariler, and is stronger.`,
    effect: DC.E150,
    max: () => DC.E2,
    baseGoal: DC.D2_9835E49,
    goalPow: DC.D1_25,
    goalMult: DC.D25,
    reward: {
      description: "Mass gain is raised based on completions (doesn't apply in this challenge).",
      effect: value => softcap(value.pow(2 / 3).times(0.01).add(1), 3, 0.25, SOFTCAP_TYPE.POWER),
      formatEffect: value => formatPow(value),
      softcapped: value => value.gte(3),
      effectCondition: () => !Challenge(3).isRunning
    },
    type: CHALLENGE_TYPE.DARK_MATTER
  },
  {
    id: 4,
    name: "Weakened Rage",
    isUnlocked: () => Challenge(3).completions.gte(1),
    description: () => `Rage Power gain is rooted by ${formatInt(10)}. Additionally, mass gain softcap starts ${formatInt(100)} OoMs eariler.`,
    effect: DC.E100,
    max: () => DC.E2,
    baseGoal: DC.D1_736881338559743E133,
    goalPow: DC.D1_25,
    goalMult: DC.D30,
    reward: {
      description: "Rage Powers gain is raised by completions.",
      effect: value => softcap(value.pow(2 / 3).times(0.01).add(1), 3, 0.25, SOFTCAP_TYPE.POWER),
      formatEffect: value => formatPow(value),
      softcapped: value => value.gte(3)
    },
    type: CHALLENGE_TYPE.DARK_MATTER
  }
];