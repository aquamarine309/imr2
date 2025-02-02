export const awayProgressTypes = [
  {
    name: "mass",
    isUnlocked: () => true
  },
  {
    name: "ragePowers",
    isUnlocked: () => PlayerProgress.rageUnlocked()
  },
  {
    name: "darkMatter",
    isUnlocked: () => PlayerProgress.blackHoleUnlocked()
  },
  {
    name: "balackHole",
    isUnlocked: () => PlayerProgress.blackHoleUnlocked()
  },
  {
    name: "atom",
    isUnlocked: () => PlayerProgress.atomUnlocked()
  },
  {
    name: "quark",
    isUnlocked: () => PlayerProgress.atomUnlocked()
  },
  {
    name: "atomicPower",
    isUnlocked: () => PlayerProgress.atomUnlocked()
  },
];