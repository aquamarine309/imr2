import { DC } from "@/core/constants";

export const rage = [
  {
    id: 0,
    description: "Boosters add Musclers.",
    cost: DC.D1,
    effect: () => MassUpgrade.booster.totalAmount,
    formatEffect: value => `+${format(value, 0)} Musclers`,
  },
  {
    id: 1,
    description: "Strongers add Boosters.",
    cost: DC.E1,
    effect: () => MassUpgrade.stronger.totalAmount,
    formatEffect: value => `+${format(value, 0)} Boosters`
  },
  {
    id: 2,
    description: "You can automatically buy mass upgrades.",
    cost: DC.D25
  },
  {
    id: 3,
    description: "Ranks no longer reset anything.",
    cost: DC.D50
  },
  {
    id: 4,
    description: "You can automatically rank up.",
    cost: DC.E4
  },
  {
    id: 5,
    description: "You can automatically tier up.",
    cost: DC.E5
  },
  {
    id: 6,
    description: "For every 3 tickspeeds add Stronger.",
    cost: DC.E7,
    effect: () => MassUpgrade.tickspeed.totalAmount.div(3),
    formatEffect: value => `+${format(value, 0)} Strongers`
  },
  {
    id: 7,
    description: "Super and Hyper mass upgrade scalings are weaker based on Rage Power.",
    cost: DC.E15,
    effect: () => {
      let exp = Currency.ragePowers.value.clampMin(1).log10().clampMin(1).log10().pow(1.25);
      exp = softcap(exp, DC.D2_5, DC.D0_5, SOFTCAP_TYPE.POWER);
      return DC.D0_9.pow(exp);
    },
    formatEffect: value => ({
      value: formatPercents(DC.D1.minus(value)),
      // Equals to 0.9^2.5
      softcapped: value.lte(0.768433471421)
    })
  },
];