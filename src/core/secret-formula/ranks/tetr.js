import { DC } from "@/core/constants";

export const tetr = {
  id: "tetr",
  isUnlocked() {
    return AtomUpgrade(2).canBeApplied;
  },
  requirement(amount) {
    return Scaling.tetr.scaleEvery(amount).timesEffectOf(GameElement(9)).pow(GameElement(44).effectOrDefault(DC.D2)).times(3).add(10).floor();
  },
  bulk(value) {
    if (value.lt(10)) return DC.D0;
    return Scaling.tetr.scaleEvery(value.minus(10).div(3).root(GameElement(44).effectOrDefault(DC.D2)).dividedByEffectOf(GameElement(9)), true).add(1).floor();
  },
  get scaling() {
    return Scaling.tetr;
  },
  get noReset() {
    return NeutronUpgrade.qol5.isBought;
  },
  get autoUnlocked() {
    return AtomUpgrade(4).canBeApplied;
  },
  unlocks: [
    {
      id: "ranksReqAndScaling",
      description: () => i18n.t("tetr_unlock_ranks_req_and_scaling_description", {
        value1: formatPercents(0.25, 0),
        value2: formatPercents(0.15, 0)
      }),
      requirement: DC.D1,
      effects: {
        tier: 0.75,
        rank: 0.85
      }
    },
    {
      id: "strongerBoost",
      description: () => i18n.t("tetr_unlock_stronger_boost_description"),
      requirement: DC.D2,
      effect: () => MassUpgrade.stronger.boughtAmount.div(400),
      formatEffect: value => `+${formatPow(value)}`
    },
    {
      id: "tickspeedPower",
      description: () => i18n.t("tetr_unlock_tickspeed_power_description", { value: format(1.05, 2) }),
      requirement: DC.D3,
      effect: 1.05
    },
    {
      id: "ranksScaling",
      description: () => i18n.t("tetr_unlock_ranks_scaling_description", { value: formatPercents(0.2, 0) }),
      requirement: DC.D4,
      effect: () => DC.D0_96.pow(RankType.tier.amount.cbrt()),
      formatEffect: value => i18n.t("X_weaker", { value: formatPercents(DC.D1.minus(value)) })
    },
    {
      id: "tickScaling",
      description: () => i18n.t("tetr_unlock_tick_scaling_description"),
      requirement: DC.D5,
      effect: () => Softcap.power(RankType.tetr.amount.pow(4), DC.E3, DC.D0_25),
      formatEffect: value => i18n.t("X_later", { value: format(value) })
    },
    {
      id: "softcapLater",
      description: () => i18n.t("tetr_unlock_softcap_later_description", { value: formatPow(1.5, 1) }),
      requirement: DC.D8,
      effect: DC.D1_5
    }
  ]
};