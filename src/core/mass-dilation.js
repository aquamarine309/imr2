import { DC } from "./constants";
import { RebuyableMechanicState } from "./game-mechanics";

export const MassDilation = {
  get isUnlocked() {
    return GameElement(21).canBeApplied;
  },

  get power() {
    return DC.D0_8;
  },

  get isActive() {
    return player.dilation.active;
  },

  set isActive(value) {
    player.dilation.active = value;
  },

  start() {
    if (MassDilation.isActive) return;
    Currency.atoms.resetLayer(true);
    MassDilation.isActive = true;
  },

  exit() {
    if (!MassDilation.isActive) return;
    if (Currency.mass.gte(MassDilation.requirement)) {
      Currency.relativisticParticles.gain();
    }
    Currency.atoms.resetLayer(true);
    MassDilation.isActive = false;
  },

  toggle() {
    if (MassDilation.isActive) {
      this.exit();
      return;
    }
    this.start();
  },

  get boost() {
    return Currency.dilatedMass.value.max(1).log10().add(1).cbrt().timesEffectOf(DilationUpgrade.massStronger);
  },

  get particleMult() {
    return Effects.product(
      DilationUpgrade.doubleParticle,
      GameElement(24),
      GameElement(31),
      GameElement(34),
      GameElement(45)
    );
  },

  get particlePower() {
    return DC.D2.plusEffectOf(DilationUpgrade.rpFormula);
  },
  
  get particleGain() {
    if (!MassDilation.isActive) return NeutronUpgrade.qol3.effectOrDefault(DC.D0);
    return MassDilation.particleGainAt(Currency.mass.value).minus(Currency.relativisticParticles.value).floor().clampMin(0);
  },

  particleGainAt(mass) {
    return mass.div(DC.D1_5E56).max(1).log10().div(40).minus(14).max(0).pow(MassDilation.particlePower)
      .times(MassDilation.particleMult);
  },

  get requirement() {
    const particles = Currency.relativisticParticles.value.add(1);
    return particles.div(MassDilation.particleMult).root(MassDilation.particlePower)
      .add(14).times(40).pow10().times(DC.D1_5E56);
  }
};

class DilationUpgradeState extends RebuyableMechanicState {
  constructor(config) {
    const configCopy = { ...config };
    const effect = config.effect;
    const cost = config.cost;
    configCopy.effect = () => effect(this.boughtAmount);
    configCopy.cost = () => cost(this.boughtAmount);
    super(configCopy);
  }

  get currency() {
    return Currency.dilatedMass;
  }

  get boughtAmount() {
    return player.dilation.upgrades[this.id];
  }

  set boughtAmount(value) {
    player.dilation.upgrades[this.id] = value;
  }

  get max() {
    return this.config.max ?? Decimal.dInf;
  }

  get isCapped() {
    return this.boughtAmount.gte(this.max);
  }

  get isFree() {
    return GameElement(43).canBeApplied;
  }

  buyMax() {
    if (!this.canBeBought) return;
    const bulk = this.config.bulk(this.currency.value).clampMax(this.max);
    if (bulk.lte(this.boughtAmount)) return;
    this.boughtAmount = bulk.minus(1).clampMin(0);
    this.purchase();
  }

  get isUnlocked() {
    return this.config.isUnlocked?.() ?? true;
  }

  get isAvailableForPurchase() {
    return this.isUnlocked;
  }
}

export const DilationUpgrade = mapGameDataToObject(
  GameDatabase.upgrades.dilation,
  config => new DilationUpgradeState(config)
);