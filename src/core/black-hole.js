import { DC } from "./constants";

export const BlackHole = {
  get mass() {
    return player.blackHole;
  },

  reset() {
    player.blackHole = DC.D0;
    MassUpgrade.condenser.reset();
    Currency.darkMatter.reset();
  },

  get exponent() {
    return 0.33;
  },

  get gain() {
    if (!this.isUnlocked) return DC.D0;
    let gain = Currency.blackHole.value.add(1).pow(this.exponent);
    gain = gain.timesEffectsOf(
      MassUpgrade.condenser,
      RageUpgrade(10),
      BHUpgrade(13),
      GameElement(46),
      PhotonUpgrade[0]
    );
    gain = gain.powEffectsOf(
      Challenge(8),
      Challenge(8).reward
    );
    if (MassDilation.canBeApplied) {
      gain = dilatedValue(gain, MassDilation.power);
    }
    gain = Softcap.power(gain, this.softcapStart, DC.D0_5);
    gain = Softcap.power(gain, DC.EE28, DC.C1D3);
    return gain;
  },

  get isUnlocked() {
    return PlayerProgress.blackHoleUnlocked();
  },

  get mult() {
    if (!this.isUnlocked) return DC.D1;
    return this.mass.add(1).pow(AtomUpgrade(11).effectOrDefault(DC.D0_25));
  },

  get softcapStart() {
    return DC.D1_5E156.timesEffectOf(AtomUpgrade(5));
  }
};