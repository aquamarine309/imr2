import { DC } from "./constants";

export const Atom = {
  get atomicPower() {
    return Currency.atomicPower.value;
  },

  get gainedPower() {
    let power = MassUpgrade.cosmicRay.effectValue;
    power = power.timesEffectOf(GameElement(3));
    return power;
  },

  get freeTickspeeds() {
    const base = DC.D1_75;
    let ticks = Atom.atomicPower.clampMin(1).log(base);
    ticks = softcap(ticks, DC.D5E4, DC.D0_75, SOFTCAP_TYPE.POWER);
    ticks = softcap(ticks, DC.D4E6, DC.D0_25, SOFTCAP_TYPE.POWER);
    ticks = softcap(ticks, DC.E10, DC.D0_1, SOFTCAP_TYPE.POWER);
    ticks = softcap(ticks, DC.D2_5E35, DC.D0_1, SOFTCAP_TYPE.POWER);
    return ticks.floor();
  },

  tick(diff) {
    for (const particle of Particles.all) {
      particle.tick(diff);
    }
  },

  distribute() {
    const weights = player.particleWeights;
    const sum = weights.sum();
    const quark = Currency.quark.value;
    if (quark.lt(sum)) return;
    const part = quark.div(sum).floor();
    for (let i = 0; i < 3; i++) {
      Particles.all[i].amount = Particles.all[i].amount.add(part.times(weights[i]));
    }
    Currency.quark.subtract(part.times(sum));
  },

  protonMass() {
    return Particles.proton.power.add(1).pow(3);
  },

  protonTick() {
    return Particles.proton.power.add(1).log2().times(0.025);
  },

  neutronRP() {
    return Particles.neutron.power.add(1).pow(2);
  },

  neutronMass() {
    return Currency.mass.value.max(1).log10().add(1).pow(
      Currency.ragePowers.value.max(1).log10().times(Particles.neutron.power.max(1).log10()).div(4).root(GameElement(19).effectOrDefault(3))
    ).clampMax(DC.EE200);
  },

  electronDM() {
    return Particles.electron.power.add(1);
  },

  electronCondenser() {
    return Particles.electron.power.add(1).log2().times(0.02);
  }
};

class ParticleState {
  constructor(config) {
    this._id = config.id;
    this._config = config;
  }

  get id() {
    return this._id;
  }

  get config() {
    return this._config;
  }

  get amount() {
    return player.particles[this.id];
  }

  set amount(value) {
    player.particles[this.id] = value;
  }

  get power() {
    return player.particlePowers[this.id];
  }

  set power(value) {
    player.particlePowers[this.id] = value;
  }

  get gainPerSecond() {
    let gain = this.amount;
    if (GameElement(12).canBeApplied) {
      gain = gain.pow(softcap(gain.add(1).log10().add(1).pow(0.25), DC.D4E4, DC.D0_1, SOFTCAP_TYPE.POWER));
    } else {
      gain = gain.pow(2);
    }
    gain = gain.timesEffectOf(AtomUpgrade(6));
    gain = softcap(gain, DC.E3_8E4, DC.D0_9, SOFTCAP_TYPE.DILATION);
    gain = softcap(gain, DC.E1_6E5, DC.D0_9, SOFTCAP_TYPE.DILATION);
    return gain;
  }

  tick(diff) {
    this.power = this.power.add(this.gainPerSecond.times(diff));
  }

  assign() {
    const quark = Currency.quark.value;
    if (quark.lte(0)) return;
    let assigned;
    switch (player.ratioMode) {
      case RATIO_MODE.SINGLE:
        assigned = DC.D1;
        break;
      case RATIO_MODE.QUARTER:
        assigned = quark.times(DC.D0_25).ceil();
        break;
      case RATIO_MODE.ALL:
        assigned = quark;
        break;
    }
    Currency.quark.subtract(assigned);
    this.amount = this.amount.add(assigned);
  }
}

export const Particles = mapGameDataToObject(
  GameDatabase.particles,
  config => new ParticleState(config)
);