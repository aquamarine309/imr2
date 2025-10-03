import { DC } from "./constants";
import { SetPurchasableMechanicState } from "./game-mechanics";

export const Supernova = {
  get times() {
    return player.supernova.times;
  },

  requirementAt(value) {
    return DC.E20.pow(Scaling.supernova.scaleEvery(value).dividedByEffectOf(GluonUpgrade[3]).pow(DC.D1_25)).times(DC.E90);
  },

  get requirement() {
    return Supernova.requirementAt(Supernova.times);
  },

  bulkAt(value) {
    if (value.lt(DC.E90)) return DC.D0;
    return Scaling.supernova.scaleEvery(value.div(DC.E90).log10().div(DC.D20).pow(DC.D0_8).timesEffectOf(GluonUpgrade[3]), true).add(1).floor();
  },

  get bulk() {
    const bulk = Supernova.bulkAt(Currency.stars.value);
    if (Supernova.times.lt(this.tutorialCount)) return bulk.clampMax(this.times.add(1));
    return bulk;
  },

  get tutorialCount() {
    return DC.E1;
  },

  startingAutoCheck() {
    if (Supernova.times.gte(DC.D1) && Supernova.times.lt(this.tutorialCount) && Currency.supernova.canReset) {
      Currency.supernova.resetLayer();
      Tab.main.mass.show();
      GameUI.notify.supernova("You have become Supernova!");
      if (Supernova.times.eq(this.tutorialCount)) {
        Modal.message.show(`<h3>Congratulations!</h3><br>You have become ${formatInt(10)} Supernovas!<br>And you can manually supernova!<br><br>Bosons are unlocked in Supernova tab!`);
      }
    }
  }
};

class NeutronUpgradeState extends SetPurchasableMechanicState {
  get currency() {
    return Currency.neutronStars;
  }

  get set() {
    return player.supernova.tree;
  }

  get isUnlocked() {
    return this.config.isUnlocked?.() ?? true;
  }

  get isSatisfied() {
    return this.config.check?.() ?? true;
  }

  get isAvailableForPurchase() {
    return this.isSatisfied && this.branchBought;
  }

  get branchBought() {
    return this.isUnlocked && this.config.branch.every(x => NeutronUpgrade[x].isBought);
  }

  onPurchased() {
    this.config.onPurchased?.();
  }
}

export const NeutronUpgrade = mapGameDataToObject(
  GameDatabase.supernova.neutronUpgrades,
  config => new NeutronUpgradeState(config)
);

export const NeutronUpgradeConnections = NeutronUpgrade.all.filter(x => x.config.branch)
  .reduce((arr, x) => arr.concat(x.config.branch.map(id => [NeutronUpgrade[id], x])), []);