import { DC } from "./constants";

export const BlackHole = {
  get mass() {
    return player.blackHole;
  },

  get exponent() {
    return 0.33;
  },

  get gain() {
    if (!this.isUnlocked) return DC.D0;
    let gain = Currency.blackHole.value.add(1).pow(this.exponent);
    gain = gain.timesEffectsOf(
      MassUpgrade.condenser,
      RageUpgrade(10)
    );
    return gain;
  },

  get isUnlocked() {
    return PlayerProgress.blackHoleUnlocked();
  },

  get mult() {
    if (!this.isUnlocked) return DC.D1;
    return this.mass.add(1).pow(0.25);
  }
};