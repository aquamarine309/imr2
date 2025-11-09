export const QuantumChallenges = {
  get areUnlocked() {
    return NeutronUpgrade.unl3.canBeApplied;
  }
};