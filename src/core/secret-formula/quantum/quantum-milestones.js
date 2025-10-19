import { DC } from "@/core/constants";

export const quantumMilestones = {
  keepQolTree: {
    description: "You start with qol1-6, bosons, and fermions unlocked.",
    requirement: DC.D1
  },
  removeReqAndSpeedUp: {
    description: () => `Pre quantum supernova tree's requirements are removed. Pre-Quantum global speed is increased by ${formatX(10, 0)}.`,
    effect: DC.E1,
    requirement: DC.D2
  },
  keepChallengeTree: {
    description: "You start with challenges tree and qol7 unlocked.",
    requirement: DC.D3
  },
  unlockRadiation: {
    description: "You start with qol8-9, unl1, and radiation unlocked.",
    requirement: DC.D5
  },
  doubleQF: {
    description: "Double Quantum Foam gain.",
    effect: DC.D2,
    requirement: DC.D6
  },
  speedBoost: {
    description: "Pre-Quantum global speed affects Blueprint Particles and Chroma at a reduced rate.",
    requirement: DC.D8
  },
  quantizesBoostStars: {
    description: () => `Neutron Stars are boosted by Quantizes (capped at ${formatX(DC.E10, 0)}). Unlock Auto-Quantum.`,
    effect: () => {
      let effect = DC.D1_2.pow(Softcap.power(Currency.quantizes.value, DC.E17, DC.D0_1));
      effect = effect.clampMax(DC.E10);
      effect = Softcap.power(effect, DC.EE9, DC.D0_01);
      effect = Softcap.power(effect, DC.EE10, DC.D0_1);
      return effect;
    },
    formatEffect: value => formatX(value),
    requirement: DC.E1
  }
};