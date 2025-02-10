import { DC } from "./constants";

export const Supernova = {
  get times() {
    return player.supernova.times;
  },

  requirementAt(value) {
    return DC.E20.pow(Scaling.supernova.scaleEvery(value).pow(DC.D1_25)).times(DC.E90);
  },

  get requirement() {
    return Supernova.requirementAt(Supernova.times);
  },

  bulkAt(value) {
    if (value.lt(DC.E90)) return DC.D0;
    return Scaling.supernova.scaleEvery(value.div(DC.E90).log10().div(DC.D20).pow(DC.D0_8), true).add(1).floor();
  },

  get bulk() {
    return Supernova.bulkAt(Currency.stars.value);
  }
};