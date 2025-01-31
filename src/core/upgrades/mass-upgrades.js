import { RebuyableMechanicState } from "@/core/game-mechanics";
import { DC } from "@/core/constants";

class MassUpgradeState extends RebuyableMechanicState {
  get cost() {
    return this.config.cost(this.boughtAmount);
  }

  get name() {
    const scaleName = this.config.scaling.getName(this.boughtAmount);
    const name = this.config.name;
    return `${scaleName}${name}`;
  }

  get boughtAmount() {
    return player.massUpgrades[this.id];
  }

  set boughtAmount(value) {
    player.massUpgrades[this.id] = value;
  }

  get freeAmount() {
    return this.config.freeAmount ?? DC.D0;
  }

  get totalAmount() {
    return this.boughtAmount.add(this.freeAmount);
  }

  get currency() {
    return this.config.currency;
  }

  get power() {
    return this.config.power;
  }

  get isCustomEffect() {
    return true;
  }

  get effectValue() {
    return this.config.effect(this.totalAmount, this.power);
  }

  get isUnlocked() {
    return this.config.isUnlocked;
  }

  get isDisabled() {
    return this.config.disabled ?? false;
  }

  get isEffectActive() {
    return this.isUnlocked;
  }

  get isAvailableForPurchase() {
    return this.isUnlocked && !this.isDisabled;
  }

  reset() {
    this.boughtAmount = DC.D0;
  }

  buyMax() {
    if (!this.canBeBought) return;
    const bulk = this.config.bulk(this.currency.value);
    if (bulk.lte(this.amount)) return;
    if (this.isFree) {
      this.boughtAmount = bulk;
      return;
    }
    this.boughtAmount = bulk.minus(1);
    this.purchase();
  }

  get softcapLevel() {
    const level = this.config.softcapLevel;
    if (level) return level(this.effectValue);
    return 0;
  }

  get autoUnlocked() {
    return this.config.autoUnlocked ?? false;
  }

  get auto() {
    return Autobuyer.massUpgrade(MassUpgrade.indexOf(this.id) + 1);
  }

  get forceVisible() {
    return this.config.forceVisible ?? false;
  }

  get isFree() {
    return this.config.isFree ?? false;
  }
}

export const MassUpgrade = mapGameDataToObject(
  GameDatabase.upgrades.mass,
  config => new MassUpgradeState(config)
);

MassUpgrade.indexOf = (function() {
  const cache = Object.values(MassUpgrade.all).reduce(
    (map, key, index) => map.set(key.id, index),
    new Map());
  return id => cache.get(id);
}());

export const MassUpgradeSoftcap = {
  stronger: [
    {
      level: 1,
      get start() {
        let start = DC.E1;
        start = start.plusEffectsOf(
          RankType.rank.unlocks.mu3softcap,
          BHUpgrade(8)
        );
        return start;
      },
      get scale() {
        return DC.D0_5.timesEffectOf(
          AtomUpgrade(8),
          RankType.tier.unlocks.strongerCapWeak
        );
      }
    }
  ],
  softcapLevel(effect, softcaps) {
    let level = 0;
    for (const softcap of softcaps) {
      if (effect.lt(softcap.start)) {
        return level;
      }
      level = softcap.level;
    }
    return level;
  }
};