import { DC } from "./constants";

export const Bosons = {
  get areUnlocked() {
    return Supernova.times.gte(DC.E1);
  }
};