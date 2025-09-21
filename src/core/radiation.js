export const Radiation = {
  get isUnlocked() {
    return NeutronUpgrade.unl1.canBeApplied;
  }
}