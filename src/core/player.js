import { DC } from "./constants";
import { deepmergeAll } from "@/utility/deepmerge";

window.player = {
  mass: DC.D0,
  ranks: {
    rank: DC.D0,
    tier: DC.D0,
    tetr: DC.D0,
    pent: DC.D0,
    hex: DC.D0,
    beyond: DC.D0
  },
  ragePowers: DC.D0,
  darkMatter: DC.D0,
  blackHole: DC.D0,
  atoms: DC.D0,
  auto: {
    ranks: {
      rank: false,
      tier: false,
      tetr: false,
      pent: false,
      hex: false,
      beyond: false
    },
    massUpgrades: {
      muscler: false,
      booster: false,
      stronger: false,
      overpower: false,
      tickspeed: false,
      condenser: false
    },
    mainUpgrades: {
      rage: false,
      blackHole: false,
      atom: false
    }
  },
  massUpgrades: {
    muscler: DC.D0,
    booster: DC.D0,
    stronger: DC.D0,
    overpower: DC.D0,
    tickspeed: DC.D0,
    condenser: DC.D0
  },
  // Bits
  mainUpgrades: {
    rage: 0,
    blackHole: 0,
    atom: 0
  },
  challenges: {
    current: 0,
    completions: Array.repeat(DC.D0, 30)
  },
  records: {
    gameCreatedTime: Date.now(),
    maxMass: DC.D0
  },
  lastUpdate: Date.now(),
  version: 0,
  tutorialBits: 0,
  options: {
    updateRate: 33,
    lastOpenTab: 0,
    hiddenTabBits: 0,
    automaticTabSwitching: false,
    hiddenSubtabBits: Array.repeat(0, 10),
    lastOpenSubtab: Array.repeat(0, 10),
    confirmations: {
      ragePower: true,
      darkMatter: true
    },
    awayProgress: {
      mass: true,
      ragePowers: true
    }
  }
};

export const Player = {
  defaultStart: deepmergeAll([{}, player])
};