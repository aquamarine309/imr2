import { RankAutobuyerState } from "./rank-autobuyer";
import { MassUpgradeAutobuyerState } from "./mass-upgrade-autobuyer";
import { RageUpgradeAutobuyerState } from "./rage-upgrade-autobuyer";
import { BlackHoleUpgradeAutobuyerState } from "./black-hole-upgrade-autobuyer";

export const Autobuyer = {
  rank: RankAutobuyerState.createAccessor(),

  massUpgrade: MassUpgradeAutobuyerState.createAccessor(),

  rageUpgrade: new RageUpgradeAutobuyerState(),

  blackHoleUpgrade: new BlackHoleUpgradeAutobuyerState()
};

export const Autobuyers = {
  all: [
    ...Autobuyer.rank.zeroIndexed,
    ...Autobuyer.massUpgrade.zeroIndexed,
    Autobuyer.rageUpgrade,
    Autobuyer.blackHoleUpgrade
  ],
  tick() {
    for (const autobuyer of Autobuyers.all) {
      if (autobuyer.canTick) autobuyer.tick();
    }
  }
};