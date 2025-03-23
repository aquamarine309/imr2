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
    name: "blackHole",
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
  {
    name: "relativisticParticles",
    reference: ["dilation", "particles"],
    isUnlocked: () => MassDilation.isUnlocked
  },
  {
    name: "dilatedMass",
    reference: ["dilation", "mass"],
    isUnlocked: () => MassDilation.isUnlocked
  },
  {
    name: "collapsedStars",
    reference: ["stars", "amount"],
    isUnlocked: () => Stars.isUnlocked
  },
  {
    name: "neutronStars",
    reference: ["supernova", "stars"],
    isUnlocked: () => PlayerProgress.supernovaUnlocked()
  },
];