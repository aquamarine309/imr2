import { DC } from "./constants";

export const Quantum = {
  get foamGain() {
    const mass = Currency.mass.value;
    if (mass.lt(this.requirement)) return DC.D0;
    return mass.log10().div(DC.E13).pow(DC.D1_5);
  },

  get requirement() {
    return mlt(DC.E4);
  }
};