import { MainUpgradeState } from "./main-upgrade-state";

class AtomUpgradeState extends MainUpgradeState {
  get key() {
    return "atom";
  }

  get currency() {
    return Currency.atoms;
  }
}

export const AtomUpgrade = AtomUpgradeState
  .createAccessor(GameDatabase.upgrades.main.atom);

export const AtomUpgrades = {
  all: AtomUpgrade.index,

  reset() {
    for (const upgrade of AtomUpgrades.all) {
      if (!upgrade.noReset) upgrade.reset();
    }
  }
};