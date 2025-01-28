import { RankAutobuyerState } from "./rank-autobuyer";
import { MassUpgradeAutobuyerState } from "./mass-upgrade-autobuyer";
import { RageUpgradeAutobuyerState } from "./rage-upgrade-autobuyer";

export const Autobuyer = {
  rank: RankAutobuyerState.createAccessor(),

  massUpgrade: MassUpgradeAutobuyerState.createAccessor(),

  rageUpgrade: new RageUpgradeAutobuyerState()
};

export const Autobuyers = {
  all: [
    ...Autobuyer.rank.zeroIndexed,
    ...Autobuyer.massUpgrade.zeroIndexed,
    Autobuyer.rageUpgrade
  ],
  tick() {
    for (const autobuyer of Autobuyers.all) {
      if (autobuyer.canTick) autobuyer.tick();
    }
  }
};