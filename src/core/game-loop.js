import { DEV } from "@/env";

export const GameLoop = {
  interval: null,

  devSpeed: 1,

  get updateRate() {
    return player.options.updateRate;
  },

  set updateRate(value) {
    player.options.updateRate = value;
    this.restart();
  },

  start() {
    if (this.interval !== null) {
      throw new Error("GameLoop has already started.");
    }
    this.interval = setInterval(() => this.tick(), this.updateRate);
  },

  stop() {
    if (this.interval === null) return;
    clearInterval(this.interval);
    this.interval = null;
  },

  restart() {
    this.stop();
    this.start();
  },

  tick(ms) {
    let diff = ms ?? Date.now() - player.lastUpdate;
    player.lastUpdate += diff;

    if (DEV) {
      diff *= this.devSpeed;
    }

    const seconds = diff / 1000;

    Currency.mass.tick(seconds);

    if (PlayerProgress.blackHoleUnlocked()) {
      Currency.blackHole.tick(seconds);
    }

    if (PlayerProgress.atomUnlocked()) {
      Currency.atomicPower.tick(seconds);
      Atom.tick(seconds);
    }

    if (MassDilation.isUnlocked) {
      Currency.dilatedMass.tick(seconds);
    }

    if (Stars.isUnlocked) {
      StarGenerators.tick(seconds);
    }

    if (PlayerProgress.supernovaUnlocked()) {
      Currency.neutronStars.tick(seconds);
      Supernova.startingAutoCheck();
      Bosons.tick(seconds);
      Fermions.update(seconds);
      Radiation.tick(seconds);
    }

    if (NeutronUpgrade.qol3.canBeApplied) {
      Currency.relativisticParticles.tick(seconds);
    }

    if (NeutronUpgrade.qol6.canBeApplied && Challenges.isRunning) {
      Challenges.current.applyAutoComplete();
    }

    applyAutoprestige(seconds);

    Autobuyers.tick();

    GameUI.update();
    EventHub.dispatch(GAME_EVENT.GAME_TICK_AFTER);
  }
};