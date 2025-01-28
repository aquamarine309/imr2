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

    Currency.mass.tick(diff / 1000);

    if (PlayerProgress.blackHoleUnlocked()) {
      Currency.blackHole.tick(diff / 1000);
    }

    applyAutoprestige(diff / 1000);

    Autobuyers.tick();

    GameUI.update();
    EventHub.dispatch(GAME_EVENT.GAME_TICK_AFTER);
  }
};