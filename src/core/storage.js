import { DEV } from "@/env";
import { deepmergeAll } from "@/utility/deepmerge";
import { migrations } from "./migrations";

/* eslint-disable camelcase */
export const GameStorage = {
  saveInterval: 2e4,

  get timeSinceLastSave() {
    return this._timeSinceLastSave;
  },

  set timeSinceLastSave(value) {
    this._timeSinceLastSave = value;
    if (this._timeSinceLastSave >= this.saveInterval) {
      this.save();
    }
  },

  get saveKey() {
    return DEV ? "imrr-dev-save" : "imrr-save";
  },

  init() {
    const localSave = localStorage.getItem(this.saveKey);
    if (localSave === null) return;

    this.importSave(localSave);
    setInterval(() => this.save(), this.saveInterval);
  },

  importFromJSON(json) {
    const playerObject = json;
    player = migrations.patchPlayer(playerObject);
    this.updatePlayerData();
  },

  exportToClipboard() {
    return copyToClipboard(Serializer.encode(JSON.stringify(player)));
  },

  importSave(save) {
    try {
      this.importFromJSON(JSON.parse(Serializer.decode(save)));
    } catch (e) {
      Modal.message.show(`Invalid save`);
    }
  },

  save() {
    localStorage.setItem(this.saveKey, Serializer.encode(JSON.stringify(player)));
    this._timeSinceLastSave = 0;
    this.hasSaved = true;
  },

  hardReset() {
    GameLoop.stop();
    player = deepmergeAll([{}, Player.defaultStart]);
    this.updatePlayerData();
    Currency.mass.reset();
    GameLoop.start();
    this.save();
  },

  updatePlayerData() {
    Lazy.invalidateAll();
    const diff = Date.now() - player.lastUpdate;
    if (diff > 1e4) {
      simulateTime(diff / 1000);
    } else {
      GameLoop.start();
      this.save();
    }
  },

  exportAsOldVersion() {
    const save = {};
    save.mass = player.mass;
    save.ranks = player.ranks;
    save.time = Date.now() - player.records.gameCreatedTime;

    const massUpg = player.massUpgrades;
    save.massUpg = [
      null,
      massUpg.muscler,
      massUpg.booster,
      massUpg.stronger,
      massUpg.overpower
    ];
    save.tickspeed = massUpg.tickspeed;
    const mainUpg = player.mainUpgrades;
    save.mainUpg = {
      rp: convertBitsToArray(mainUpg.rage, 1),
      bh: convertBitsToArray(mainUpg.blackHole, 1)
    };
    save.rp = {
      points: player.ragePowers,
      unl: PlayerProgress.rageUnlocked()
    };
    save.bh = {
      mass: player.blackHole,
      dm: player.darkMatter,
      condenser: massUpg.condenser,
      unl: PlayerProgress.blackHoleUnlocked(),
      autoCondenser: false
    };

    const confirm = player.options.confirmations;
    save.confirms = {
      rp: confirm.ragePower,
      bh: confirm.darkMatter
    };

    const auto = player.auto;
    save.autoMassUpg = [
      null,
      auto.massUpgrades.muscler,
      auto.massUpgrades.booster,
      auto.massUpgrades.stronger,
      auto.massUpgrades.overpower
    ];
    save.autoTickspeed = auto.massUpgrades.tickspeed;
    save.auto_ranks = auto.ranks;
    save.auto_mainUpg = {
      rp: auto.mainUpgrades.rage,
      bh: auto.mainUpgrades.blackHole
    };

    const challenges = player.challenges;
    const completions = {};
    for (let i = 0; i < challenges.completions.length; i++) {
      completions[i + 1] = challenges.completions[i];
    }
    save.chal = {
      active: challenges.current,
      comps: completions,
      choosed: 0,
      unl: Challenges.isUnlocked
    };

    save.options = {
      massDis: 1,
      font: "Verdana",
      notation: "sc"
    };

    save.quote = convertBitsToArray(player.tutorialBits);

    return copyToClipboard(btoa(JSON.stringify(save)));
  }
};

export function convertBitsToArray(bits, startIndex = 0) {
  const arr = [];
  let b = bits;
  let idx = startIndex;
  while (b !== 0) {
    if ((b & 1) === 1) arr.push(idx);
    b >>= 1;
    idx++;
  }
  return arr;
}