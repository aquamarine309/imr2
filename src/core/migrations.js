import { deepmergeAll } from "@/utility/deepmerge";

export const migrations = {
  patches: {
    2: player => {
      player.massUpgrades.starBooster = new Decimal(player.stars.boosts);
      delete player.stars.boosts;
    },
    3: player => {
      if (player.challenges.completions[9].gt(0)) {
        player.challenges.completions[9] = new Decimal(0);
        Modal.message.show(i18n.t("fix_c10_info"));
      }
    }
  },

  prePatch(saveData) {
    // Initialize all possibly undefined properties that were not present in
    // previous versions and which could be overwritten by deepmerge
    saveData.version = saveData.version || 0;
  },

  // Patch up to the specified version; we need this functionality in order to properly migrate both saves from
  // much older versions and saves from in-development versions
  patch(saveData, maxVersion) {
    this.prePatch(saveData);
    // This adds all the undefined properties to the save which are in player.js
    const player = deepmergeAll([Player.defaultStart, saveData]);
    const versions = Object.keys(this.patches).map(parseFloat).sort();
    let version;
    while ((version = versions.find(v => player.version < v && v < maxVersion)) !== undefined) {
      const patch = this.patches[version];
      patch(player);
      player.version = version;
    }
    return player;
  },

  patchPlayer(saveData) {
    // Plus 1 because this the threshold is exclusive (it migrates up to but not including the maxVersion)
    return this.patch(saveData, Object.keys(migrations.patches).map(parseFloat).max() + 1);
  }
};