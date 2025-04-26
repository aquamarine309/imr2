export const tabs = [
  {
    id: 0,
    key: "main",
    subtabs: [
      {
        id: 0,
        key: "mass",
        component: "MassTab"
      },
      {
        id: 1,
        key: "black_hole",
        component: "BlackHoleTab",
        condition: () => PlayerProgress.blackHoleUnlocked()
      },
      {
        id: 2,
        key: "atomic_generator",
        component: "AtomicGeneratorTab",
        condition: () => PlayerProgress.atomUnlocked()
      },
      {
        id: 3,
        key: "stars",
        component: "StarsTab",
        condition: () => Stars.isUnlocked
      }
    ]
  },
  {
    id: 1,
    key: "statistics",
    condition: () => (RankType.rank.amount.gt(0) ||
      RankType.tier.amount.gt(0) ||
      PlayerProgress.rageUnlocked()
    ),
    subtabs: [
      {
        id: 0,
        key: "rank_rewards",
        component: "RankRewardsTab"
      }
    ]
  },
  {
    id: 2,
    key: "options",
    subtabs: [
      {
        id: 0,
        key: "options",
        component: "OptionsTab"
      }
    ]
  },
  {
    id: 3,
    key: "upgrades",
    condition: () => PlayerProgress.rageUnlocked(),
    subtabs: [
      {
        id: 0,
        key: "rage",
        component: "RageUpgradesTab"
      },
      {
        id: 1,
        key: "black_hole",
        component: "BHUpgradesTab",
        condition: () => PlayerProgress.blackHoleUnlocked()
      },
      {
        id: 2,
        key: "atom",
        component: "AtomUpgradesTab",
        condition: () => PlayerProgress.atomUnlocked()
      },
    ]
  },
  {
    id: 4,
    key: "challenges",
    condition: () => Challenges.isUnlocked,
    subtabs: [
      {
        id: 0,
        key: "challenges",
        component: "ChallengesTab"
      }
    ]
  },
  {
    id: 5,
    key: "atom",
    condition: () => PlayerProgress.atomUnlocked(),
    subtabs: [
      {
        id: 0,
        key: "particles",
        component: "ParticlesTab"
      },
      {
        id: 1,
        key: "elements",
        component: "ElementsTab",
        condition: () => GameElements.isUnlocked
      },
      {
        id: 2,
        key: "dilation",
        component: "MassDilationTab",
        condition: () => MassDilation.isUnlocked
      }
    ]
  },
  {
    id: 6,
    key: "supernova",
    condition: () => PlayerProgress.supernovaUnlocked(),
    subtabs: [
      {
        id: 0,
        key: "neutron_tree",
        component: "NeutronTreeTab"
      },
      {
        id: 1,
        key: "bosons",
        component: "BosonsTab",
        condition: () => Bosons.areUnlocked
      },
      {
        id: 2,
        key: "fermions",
        component: "FermionsTab",
        condition: () => Fermions.areUnlocked
      }
    ]
  }
];