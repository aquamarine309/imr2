import { DC } from "./constants";

export const Entropy = {
  get isUnlocked() {
    return player.unlocks.entropy;
  }
};

export function checkEntropy() {
  if (Entropy.isUnlocked || !GameUI.initialized) return;
  const req = mlt(DC.D7_5E6);
  if (Currency.mass.gte(req)) {
    player.unlocks.entropy = true;
    Modal.message.show(`<h3>Congratulations!</h3><br>You have reached ${formatMass(req)} of Mass!<br><br>Entropy is unlocked in Quantum tab!`);
  }
}