import { BitPurchasableMechanicState } from "../game-mechanics";

export class MainUpgradeState extends BitPurchasableMechanicState {
  /** @absolute */
  get key() {
    throw new NotImplementedError();
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.mainUpgrades[this.key];
  }

  set bits(value) {
    player.mainUpgrades[this.key] = value;
  }

  get url() {
    return `images/upgrades/${this.key}/${this.id}.png`;
  }

  get noReset() {
    return false;
  }

  reset() {
    this.isBought = false;
  }
}