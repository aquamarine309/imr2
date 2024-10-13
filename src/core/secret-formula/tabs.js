export const tabs = [
  {
    id: 0,
    key: "main",
    name: "Main",
    subtabs: [
      {
        id: 0,
        key: "mass",
        name: "Mass",
        component: "MassTab"
      }
    ]
  },
  {
    id: 1,
    key: "statistics",
    name: "Statistics",
    condition: () => (RankType.rank.amount.gt(0) ||
      RankType.tier.amount.gt(0) ||
      PlayerProgress.rageUnlocked()
    ),
    subtabs: [
      {
        id: 0,
        key: "rankRewards",
        name: "Rank Rewards",
        component: "RankRewardsTab"
      }
    ]
  },
  {
    id: 2,
    key: "options",
    name: "Options",
    subtabs: [
      {
        id: 0,
        key: "options",
        name: "Options",
        component: "OptionsTab"
      }
    ]
  },
  {
    id: 3,
    key: "upgrades",
    name: "Upgrades",
    condition: () => PlayerProgress.rageUnlocked(),
    subtabs: [
      {
        id: 0,
        key: "rage",
        name: "Rage Upgrades",
        component: "RageUpgradesTab"
      }
    ]
  }
];