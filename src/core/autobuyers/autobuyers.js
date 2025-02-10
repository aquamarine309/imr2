import { RankAutobuyerState } from "./rank-autobuyer";
import { MassUpgradeAutobuyerState } from "./mass-upgrade-autobuyer";
import { RageUpgradeAutobuyerState } from "./rage-upgrade-autobuyer";
import { BlackHoleUpgradeAutobuyerState } from "./black-hole-upgrade-autobuyer";
import { DilationUpgradeAutobuyerState } from "./dilation-upgrade-autobuyer";

export const Autobuyer = {
  rank: RankAutobuyerState.createAccessor(),

  massUpgrade: MassUpgradeAutobuyerState.createAccessor(),

  rageUpgrade: new RageUpgradeAutobuyerState(),

  blackHoleUpgrade: new BlackHoleUpgradeAutobuyerState(),

  dilationUpgrade: new DilationUpgradeAutobuyerState()
};

export const Autobuyers = {
  all: [
    ...Autobuyer.rank.zeroIndexed,
    ...Autobuyer.massUpgrade.zeroIndexed,
    Autobuyer.rageUpgrade,
    Autobuyer.blackHoleUpgrade,
    Autobuyer.dilationUpgrade
  ],
  tick() {
    for (const autobuyer of Autobuyers.all) {
      if (autobuyer.canTick) autobuyer.tick();
    }
  }
};