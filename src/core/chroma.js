import { GameMechanicState } from "./game-mechanics";
import { DC } from "./constants";

class ChromaState extends GameMechanicState {
  constructor(config) {
    const configCopy = { ...config };
    const effect = config.effect;
    configCopy.effect = () => effect(this.amount);
    super(configCopy);
  }

  get isUnlocked() {
    return (player.quantum.chromaState & (1 << this.id)) !== 0;
  }

  get canBeUnlocked() {
    return getQuantumTheories().gt(0) && !this.isUnlocked;
  }

  unlock() {
    if (!this.canBeUnlocked) return;
    player.quantum.chromaState |= (1 << this.id);
    GameCache.chromaCount.invalidate();
  }

  get amount() {
    return player.quantum.chroma[this.id];
  }

  set amount(value) {
    player.quantum.chroma[this.id] = value;
  }

  get gain() {
    if (!this.isUnlocked) return DC.D0;
    let gain = DC.D1;
    if (QuantumMilestones.speedBoost.canBeApplied) {
      gain = gain.times(Quantum.speed.max(1).sqrt());
    }
    return gain;
  }

  tick(diff) {
    if (this.isUnlocked) {
      this.amount = this.amount.add(this.gain.times(diff));
    }
  }
}

export const Chroma = mapGameData(
  GameDatabase.quantum.chroma,
  config => new ChromaState(config)
);

export function getQuantumTheories() {
  return Currency.quantizes.value.minus(GameCache.chromaCount.value);
}