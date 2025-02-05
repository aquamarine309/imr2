import { SetPurchasableMechanicState } from "./game-mechanics";

class GameElementState extends SetPurchasableMechanicState {
  get currency() {
    return Currency.quark;
  }

  get set() {
    return player.elements;
  }

  get isUnlocked() {
    return this.id <= GameElements.maxId;
  }
}

export const GameElement = GameElementState.createAccessor(GameDatabase.gameElements);

export const GameElements = {
  all: GameElement.index.compact(),

  clearAll() {
    player.elements = new Set();
  },

  get isUnlocked() {
    return Challenge(7).milestones[0].canBeApplied;
  },

  get maxId() {
    let amount = 4;
    if (Challenge(8).milestones[0].canBeApplied) {
      amount += 14;
    }
    if (GameElement(18).isBought) {
      amount += 3;
    }
    return amount;
  }
};