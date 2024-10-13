import { DEV } from "@/env";
import { deepmergeAll } from "@/utility/deepmerge";
import { migrations } from "./migrations";

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
  }
};