import { DC } from "@/core/constants";

export const tetr = {
  id: "tetr",
  name: "Tetr",
  isUnlocked() {
    return AtomUpgrade(2).canBeApplied;
  },
  requirement(amount) {
    return Scaling.tetr.scaleEvery(amount).pow(2).times(3).add(10).floor();
  },
  bulk(value) {
    if (value.lt(10)) return DC.D0;
    return Scaling.tetr.scaleEvery(value.minus(10).div(3).sqrt(), true).add(1).floor();
  },
  get scaling() {
    return Scaling.tetr;
  },
  get autoUnlocked() {
    return AtomUpgrade(4).canBeApplied;
  },
  unlocks: [
    {
      id: "ranksReqAndScaling",
      description: () => `reduce tier requirements by ${formatPercents(0.25, 0)}, and hyper rank scaling is ${formatPercents(0.15, 0)} weaker.`,
      requirement: DC.D1,
      effects: {
        tier: 0.75,
        rank: 0.85
      }
    },
    {
      id: "strongerBoost",
      description: "Stronger boosts itself.",
      requirement: DC.D2,
      effect: () => MassUpgrade.stronger.boughtAmount.div(400),
      formatEffect: value => `+${formatPow(value)}`
    }
  ]
};