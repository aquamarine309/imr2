import MassTab from "./mass/MassTab";
import BlackHoleTab from "./black-hole/BlackHoleTab";
import AtomicGeneratorTab from "./atomic-generator/AtomicGeneratorTab";
import StarsTab from "./stars/StarsTab";
import RankRewardsTab from "./rank-rewards/RankRewardsTab";
import ScalingTab from "./scaling/ScalingTab";
import OptionsTab from "./options/OptionsTab";
import MainUpgradeTabs from "./main-upgrades";
import ChallengesTab from "./challenges/ChallengesTab";
import ParticlesTab from "./particles/ParticlesTab";
import ElementsTab from "./elements/ElementsTab";
import MassDilationTab from "./mass-dilation/MassDilationTab";
import NeutronTreeTab from "./neutron-tree/NeutronTreeTab";
import BosonsTab from "./bosons/BosonsTab";
import FermionsTab from "./fermions/FermionsTab";
import RadiationTab from "./radiation/RadiationTab";

export default {
  MassTab,
  BlackHoleTab,
  AtomicGeneratorTab,
  StarsTab,
  RankRewardsTab,
  ScalingTab,
  OptionsTab,
  ...MainUpgradeTabs,
  ChallengesTab,
  ParticlesTab,
  ElementsTab,
  MassDilationTab,
  NeutronTreeTab,
  BosonsTab,
  FermionsTab,
  RadiationTab
};