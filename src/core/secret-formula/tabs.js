export const tabs = [
  {
    id: 0,
    key: "main",
    name: "Main",
    letter: "M",
    subtabs: [
      {
        id: 0,
        key: "mass",
        name: "Mass",
        shortName: "Mass",
        component: "MassTab"
      },
      {
        id: 1,
        key: "blackHole",
        name: "Black Hole",
        shortName: "Black hole",
        component: "BlackHoleTab",
        condition: () => PlayerProgress.blackHoleUnlocked()
      }
    ]
  },
  {
    id: 1,
    key: "statistics",
    name: "Statistics",
    letter: "S",
    condition: () => (RankType.rank.amount.gt(0) ||
      RankType.tier.amount.gt(0) ||
      PlayerProgress.rageUnlocked()
    ),
    subtabs: [
      {
        id: 0,
        key: "rankRewards",
        name: "Rank Rewards",
        shortName: "Ranks",
        component: "RankRewardsTab"
      }
    ]
  },
  {
    id: 2,
    key: "options",
    name: "Options",
    letter: "O",
    subtabs: [
      {
        id: 0,
        key: "options",
        name: "Options",
        shortName: "Options",
        component: "OptionsTab"
      }
    ]
  },
  {
    id: 3,
    key: "upgrades",
    name: "Upgrades",
    letter: "U",
    condition: () => PlayerProgress.rageUnlocked(),
    subtabs: [
      {
        id: 0,
        key: "rage",
        name: "Rage Upgrades",
        shortName: "Rage",
        component: "RageUpgradesTab"
      },
      {
        id: 1,
        key: "blackHole",
        name: "Black Hole Upgrades",
        shortName: "Black Hole",
        component: "BHUpgradesTab",
        condition: () => PlayerProgress.blackHoleUnlocked()
      }
    ]
  },
  {
    id: 4,
    key: "challenges",
    name: "Challenges",
    letter: "C",
    condition: () => Challenges.isUnlocked,
    subtabs: [
      {
        id: 0,
        key: "challenges",
        name: "Challenges",
        shortName: "Challenges",
        component: "ChallengesTab"
      }
    ]
  }
];