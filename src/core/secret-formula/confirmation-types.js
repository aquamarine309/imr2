export const confirmationTypes = [
  {
    name: "Rage Power",
    option: "ragePower",
    isUnlocked: () => PlayerPgrogress.rageUnlocked(),
  },
  {
    name: "Dark Matter",
    option: "darkMatter",
    isUnlocked: () => PlayerPgrogress.blackHoleUnlockedUnlocked(),
  },
];
