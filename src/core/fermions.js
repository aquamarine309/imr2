import { GameMechanicState } from "./game-mechanics";
import { DC } from "./constants";

class FermionRewardState extends GameMechanicState {
  constructor(config, fermion) {
    const configCopy = { ...config };
    const effect = config.effect;
    configCopy.effect = () => effect(fermion.tier, fermion.type.currency);
    super(configCopy);
    this._fermion = fermion;
  }

  get fermion() {
    return this._fermion;
  }

  get isEffectActive() {
    return this.fermion.tier.gt(DC.D0);
  }
}

class FermionState extends GameMechanicState {
  constructor(config, type) {
    super(config);
    this._reward = new FermionRewardState(config.reward, this);
    this._type = type;
  }

  get type() {
    return this._type;
  }

  get tier() {
    return player.supernova.fermions.tiers[this.id];
  }

  get reward() {
    return this._reward;
  }

  set tier(value) {
    player.supernova.fermions.tiers[this.id] = value;
  }

  get requirement() {
    return this.config.requirement(this.tier);
  }

  get currency() {
    return this.config.currency();
  }

  get bulk() {
    return this.config.bulk(this.currency);
  }

  get isActive() {
    return player.supernova.fermions.active === this.id;
  }

  get isEffectActive() {
    return this.isActive;
  }
}

class FermionTypeState {
  constructor(config) {
    this._config = config;
    this._fermions = mapGameDataToObject(
      config.fermions,
      fermionConfig => new FermionState(fermionConfig, this)
    );
  }

  get id() {
    return this.config.id;
  }

  get config() {
    return this._config;
  }

  get currency() {
    return this.config.currency();
  }

  get fermions() {
    return this._fermions;
  }

  get totalTiers() {
    return this.fermions.all.map(x => x.tier).reduce((a, b) => a.add(b), DC.D0);
  }
}

export const FermionType = mapGameDataToObject(
  GameDatabase.supernova.fermions,
  config => new FermionTypeState(config)
);

export const Fermions = {
  get areUnlocked() {
    return Challenge(10).milestones[0].canBeApplied;
  }
};