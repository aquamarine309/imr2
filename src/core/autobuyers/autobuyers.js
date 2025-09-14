import { RankAutobuyerState } from "./rank-autobuyer";
import { MassUpgradeAutobuyerState } from "./mass-upgrade-autobuyer";
import { RageUpgradeAutobuyerState } from "./rage-upgrade-autobuyer";
import { BlackHoleUpgradeAutobuyerState } from "./black-hole-upgrade-autobuyer";
import { DilationUpgradeAutobuyerState } from "./dilation-upgrade-autobuyer";
import { AtomUpgradeAutobuyerState } from "./atom-upgrade-autobuyer";
import { ElementAutobuyerState } from "./element-autobuyer";
import { BosonUpgradeAutobuyerState } from "./boson-upgrade-autobuyer";

export const Autobuyer = {
  rank: RankAutobuyerState.createAccessor(),

  massUpgrade: MassUpgradeAutobuyerState.createAccessor(),

  rageUpgrade: new RageUpgradeAutobuyerState(),

  blackHoleUpgrade: new BlackHoleUpgradeAutobuyerState(),

  dilationUpgrade: new DilationUpgradeAutobuyerState(),

  atomUpgrade: new AtomUpgradeAutobuyerState(),

  element: new ElementAutobuyerState(),

  bosonUpgrade: new BosonUpgradeAutobuyerState()
};

export const Autobuyers = {
  all: [
    ...Autobuyer.rank.zeroIndexed,
    ...Autobuyer.massUpgrade.zeroIndexed,
    Autobuyer.rageUpgrade,
    Autobuyer.blackHoleUpgrade,
    Autobuyer.dilationUpgrade,
    Autobuyer.atomUpgrade,
    Autobuyer.element,
    Autobuyer.bosonUpgrade
  ],
  tick() {
    for (const autobuyer of Autobuyers.all) {
      if (autobuyer.canTick) autobuyer.tick();
    }
  }
};