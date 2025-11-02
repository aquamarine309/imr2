export const Primordium = {
  get isUnlocked() {
    return NeutronUpgrade.unl2.canBeApplied;
  }
};