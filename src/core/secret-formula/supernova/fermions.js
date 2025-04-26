import { DC } from "@/core/constants";

export const fermions = {
  quarks: {
    id: 0,
    currency: () => Currency.uQuarks.value,
    fermions: {
      up: {
        id: 0,
        key: "fermions_up",
        symbol: "u",
        description: () => `Atomic Power gain is decreased to ${format(DC.D0_6, 1)}`,
        effect: DC.D0_6,
        currency: () => Currency.atomicPower.value,
        requirement: value => DC.E50.pow(value.pow(DC.D1_25)).times(DC.E800),
        bulk: value => value.div(DC.E800).log10().div(DC.D50).pow(DC.D0_8).floor().add(DC.D1),
        reward: {
          effect: (value, currency) => value.pow(DC.D0_75).times(currency.min(DC.D1).log(DC.D1_1)),
          formatEffect: value => `Add ${format(value, 0)} Cosmic Rays`
        }
      },
      charm: {
        id: 1,
        key: "fermions_charm",
        symbol: "c",
        reward: {
          effect: () => DC.D0
        }
      },
      top: {
        id: 2,
        key: "fermions_top",
        symbol: "t",
        reward: {
          effect: () => DC.D0
        }
      },
      down: {
        id: 3,
        key: "fermions_down",
        symbol: "d",
        reward: {
          effect: () => DC.D0
        }
      },
      strange: {
        id: 4,
        key: "fermions_strange",
        symbol: "s",
        reward: {
          effect: () => DC.D0
        }
      },
      bottom: {
        id: 5,
        key: "fermions_bottom",
        symbol: "b",
        reward: {
          effect: () => DC.D0
        }
      },
    }
  },
  leptons: {
    id: 1,
    currency: () => Currency.uLeptons.value,
    fermions: {
      electron: {
        id: 6,
        key: "fermions_electron",
        symbol: "e",
        reward: {
          effect: () => DC.D0
        }
      },
      meon: {
        id: 7,
        key: "fermions_meon",
        symbol: "μ",
        reward: {
          effect: () => DC.D0
        }
      },
      tau: {
        id: 8,
        key: "fermions_tau",
        symbol: "τ",
        reward: {
          effect: () => DC.D0
        }
      },
      neutrino: {
        id: 9,
        key: "fermions_neutrino",
        symbol: "ν<sub>e</sub>",
        reward: {
          effect: () => DC.D0
        }
      },
      neutMeon: {
        id: 10,
        key: "fermions_neut_meon",
        symbol: "ν<sub>μ</sub>",
        reward: {
          effect: () => DC.D0
        }
      },
      neutTau: {
        id: 11,
        key: "fermions_neut_tau",
        symbol: "ν<sub>τ</sub>",
        reward: {
          effect: () => DC.D0
        }
      },
    }
  }
};