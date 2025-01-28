import { GameMechanicState } from "./game-mechanics";
import { DC } from "./constants";

class RankUnlockState extends GameMechanicState {
  constructor(config, type) {
    super(config);
    this.type = type;
  }

  get requirement() {
    return this.config.requirement;
  }

  get isUnlocked() {
    return this.type.amount.gte(this.requirement);
  }

  get isEffectActive() {
    return this.isUnlocked;
  }

  get description() {
    const desc = this.config.description;
    return typeof desc === "function" ? desc() : desc;
  }
}

class RankTypeState extends GameMechanicState {
  constructor(config) {
    super(config);
    this.unlocks = config.unlocks.mapToObject(
      x => x.id,
      unlockConfig => new RankUnlockState(unlockConfig, this)
    );
    this.nextUnlock = new Lazy(() => Object.values(this.unlocks).find(rank => !rank.isUnlocked));
    this.cachedRequirement = new Lazy(() => this.config.requirement(this.amount));
  }

  get isUnlocked() {
    return this.config.isUnlocked();
  }

  get amount() {
    return player.ranks[this.id];
  }

  set amount(value) {
    player.ranks[this.id] = value;
    this.nextUnlock.invalidate();
    this.cachedRequirement.invalidate();
  }

  get fullName() {
    const name = this.name;
    const scaling = this.config.scaling.getName(this.amount);
    return `${scaling}${name}`;
  }

  get name() {
    return this.config.name;
  }

  get previous() {
    return RankTypes.previous(this.id);
  }

  get noReset() {
    return this.config.noReset ?? false;
  }

  get description() {
    const resets = this.isRank
      ? "mass and upgrades"
      : this.previous.name;
    const rankUp = `${this.name} up.`;
    if (this.noReset) return rankUp;
    return `Reset ${resets}, but ${rankUp}`;
  }

  get reward() {
    const next = this.nextUnlock.value;
    if (next === undefined) return "No rewards available...";
    return `At ${this.name} ${format(next.requirement, 0)} - ${next.description}`;
  }

  get requirement() {
    return this.cachedRequirement.value;
  }

  get canReset() {
    const currencyAmount = this.isRank
      ? Currency.mass.value
      : this.previous.amount;
    return currencyAmount.gte(this.requirement);
  }

  get isRank() {
    return this.id === "rank";
  }

  reset(resetOnly = false) {
    if (!this.canReset && !resetOnly) return;
    if (!resetOnly) {
      this.amount = this.amount.add(1);
      if (this.noReset) return;
    }
    if (this.isRank) {
      Currency.mass.reset();
      MassUpgrade.muscler.reset();
      MassUpgrade.booster.reset();
      MassUpgrade.stronger.reset();
      MassUpgrade.overpower.reset();
      Tutorial.firstRank.unlock();
    } else {
      this.previous.amount = DC.D0;
      this.previous.reset(true);
    }
  }

  bulk() {
    if (!this.canReset) return;
    const currencyAmount = this.isRank
      ? Currency.mass.value
      : this.previous.amount;
    const bulk = this.config.bulk(currencyAmount);
    if (bulk.lte(this.amount)) return;
    if (this.noReset) {
      this.amount = bulk;
      return;
    }
    this.amount = bulk.minus(1);
    this.reset();
  }

  get autoUnlocked() {
    return this.config.autoUnlocked ?? false;
  }

  get auto() {
    return Autobuyer.rank(RankTypes.indexOf(this.id) + 1);
  }
}

export const RankType = mapGameDataToObject(
  GameDatabase.ranks,
  config => new RankTypeState(config)
);

export const RankTypes = {
  _previousCache: Object.values(RankType.all).reduce(
    (map, key, index, arr) => map.set(key.id, arr[index - 1]),
    new Map()),

  _rankIndex: Object.values(RankType.all).reduce(
    (map, key, index) => map.set(key.id, index),
    new Map()),

  previous(rank) {
    return RankTypes._previousCache.get(rank);
  },

  indexOf(rank) {
    return RankTypes._rankIndex.get(rank);
  }
};