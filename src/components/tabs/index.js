import MassTab from "./mass/MassTab";
import BlackHoleTab from "./black-hole/BlackHoleTab";
import RankRewardsTab from "./rank-rewards/RankRewardsTab";
import OptionsTab from "./options/OptionsTab";
import MainUpgradeTabs from "./main-upgrades";
import ChallengesTab from "./challenges/ChallengesTab";

export default {
  MassTab,
  BlackHoleTab,
  RankRewardsTab,
  OptionsTab,
  ...MainUpgradeTabs,
  ChallengesTab
};