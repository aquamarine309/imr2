import MassTab from "./mass/MassTab";
import BlackHoleTab from "./black-hole/BlackHoleTab";
import AtomicGeneratorTab from "./atomic-generator/AtomicGeneratorTab";
import StarsTab from "./stars/StarsTab";
import RankRewardsTab from "./rank-rewards/RankRewardsTab";
import OptionsTab from "./options/OptionsTab";
import MainUpgradeTabs from "./main-upgrades";
import ChallengesTab from "./challenges/ChallengesTab";
import ParticlesTab from "./particles/ParticlesTab";
import ElementsTab from "./elements/ElementsTab";
import MassDilationTab from "./mass-dilation/MassDilationTab";

export default {
  MassTab,
  BlackHoleTab,
  AtomicGeneratorTab,
  StarsTab,
  RankRewardsTab,
  OptionsTab,
  ...MainUpgradeTabs,
  ChallengesTab,
  ParticlesTab,
  ElementsTab,
  MassDilationTab
};