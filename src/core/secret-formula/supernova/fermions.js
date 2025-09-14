import { DC } from "@/core/constants";

// Mrredshark showed his poor of physics
// The order of quarks and leptons are wrong in the origin version
// I need to keep them in a wrong order so as to look like the origin
// Quarks:    Leptons:
// 0 2 4      6 7 8
// 1 3 5      9 10 11
export const fermions = {
  quarks: {
    id: 0,
    currency: () => Currency.uQuarks,
    fermions: {
      up: {
        id: 0,
        key: "fermions_up",
        symbol: "u",
        description: () => `Atomic Power gain is dilated by ${format(DC.D0_6, 1)}`,
        effect: DC.D0_6,
        currency: () => Currency.atomicPower.value,
        currencyKey: "X_atomic_power",
        baseReq: DC.E800,
        reqMult: DC.E50,
        reqPow: DC.D1_25,
        reward: {
          description: `Gain free Cosmic Rays`,
          effect: (tier, currency) => tier.pow(DC.D0_75).times(currency.max(DC.D1).log(DC.D1_1)),
          formatEffect: value => `+${format(value, 0)}`
        }
      },
      down: {
        id: 1,
        key: "fermions_down",
        symbol: "d",
        description: () => `The exponent of the Relativistic Particle formula is divided by ${formatInt(10)}`,
        effect: DC.D0_1,
        currency: () => Currency.relativisticParticles.value,
        currencyKey: "X_relativistic_particle",
        baseReq: DC.E400,
        reqMult: DC.E50,
        reqPow: DC.D1_25,
        reward: {
          description: `Increase Relativistic Particles gain`,
          effect: (tier, currency) => Softcap.dilation(
            DC.E5.pow(currency.add(DC.D1).log10().times(tier)),
            DC.E1000,
            DC.D0_95
          ),
          formatEffect: value => formatX(value),
          softcapped: value => value.gte(DC.E1000)
        }
      },
      charm: {
        id: 2,
        key: "fermions_charm",
        symbol: "c",
        description: "You are trapped in Mass Dilation, and it is twice as strong",
        effect: DC.D2,
        currency: () => Currency.mass.value,
        currencyKey: "",
        formatAsMass: true,
        baseReq: DC.D1_5E36056,
        reqMult: DC.E1000,
        reqPow: DC.D1_5,
        reward: {
          description: `Z⁰ Boson's first effect is more stronger`,
          effect: (tier, currency) => Softcap.power(
            Softcap.power(
              currency.add(DC.D1).log10().pow(DC.D1_75).times(tier.pow(DC.D0_8)).div(DC.E2).add(DC.D1),
              DC.D5,
              DC.D0_75
            ),
            DC.D449,
            DC.D0_25
          ),
          formatEffect: value => `+${formatPercents(value.minus(DC.D1))}`,
          softcapped: value => value.gte(DC.D5)
        }
      },
      strange: {
        id: 3,
        key: "fermions_strange",
        symbol: "s",
        description: "You are trapped in Mass Dilation and Challenges 3-5",
        maxTier: () => DC.D15,
        currency: () => Currency.ragePowers.value,
        currencyKey: "X_rage_power",
        baseReq: DC.E3E4,
        reqMult: DC.E1000,
        reqPow: DC.D1_5,
        reward: {
          description: "The fourth Photon Upgrades and Gluon Upgrades are more stronger",
          effect: (tier, currency) => Softcap.power(Softcap.power(
            currency.clampMin(DC.D1).log10().add(DC.D1).times(tier).pow(DC.D0_9).div(DC.E2).add(DC.D1),
            DC.D1_5, DC.D0_5), DC.D5, DC.C1D3),
          formatEffect: value => formatX(value),
          softcapped: value => value.gte(DC.D1_5),
          cap: () => DC.D6_5,
        }
      },
      top: {
        id: 4,
        key: "fermions_top",
        symbol: "t",
        description: () => `The effect from U-Quarks, Photons and Gluons are disabled`,
        maxTier: () => DC.D30,
        currency: () => Currency.dilatedMass.value,
        currencyKey: "X_dilated_mass",
        formatAsMass: true,
        baseReq: DC.D1,
        reqMult: DC.EE4,
        reqPow: DC.D1_5,
        reward: {
          description: "Radiation Boosters are more cheaper",
          effect: (tier, currency) => Softcap.power(Softcap.power(
            currency.add(DC.D1).log10().div(DC.D500).times(tier.sqrt()).add(DC.D1),
            DC.D1_15, DC.D0_5), DC.D1_8, DC.C1D3),
          formatEffect: value => `/${format(value)}`,
          softcapped: value => value.gte(DC.D1_15),
          cap: () => DC.D2
        }
      },
      bottom: {
        id: 5,
        key: "fermions_bottom",
        symbol: "b",
        description: "Challenges are disabled",
        maxTier: () => DC.E1,
        currency: () => MassUpgrade.tickspeed.effectValue,
        currencyKey: "X_of_tickspeed",
        baseReq: DC.E6E9,
        reqMult: DC.E5E8,
        reqPow: DC.D2,
        reward: {
          description: "Meta-Tickspeed starts later",
          effect: (tier, currency) => currency.add(DC.D1).log10().sqrt().div(DC.D150).pow(tier).clampMax(DC.D500),
          formatEffect: value => formatX(value),
          cap: DC.E500
        }
      },
    }
  },
  leptons: {
    id: 1,
    currency: () => Currency.uLeptons,
    fermions: {
      electron: {
        id: 6,
        key: "fermions_electron",
        symbol: "e",
        description: () => `${formatPow(DC.D0_625, 3)} to the exponent of Atoms gain`,
        maxTier: () => DC.D15.plusEffectOf(NeutronUpgrade.fn5),
        effect: DC.D0_625,
        currency: () => Currency.quark.value,
        currencyKey: "X_quark",
        baseReq: DC.E175,
        reqMult: DC.E5,
        reqPow: DC.D1_5,
        reward: {
          description: "Collapsed Stars gain softcap starts later",
          effect: (tier, currency) => Softcap.power(
            currency.add(DC.D1).log10().times(tier).div(DC.E2).add(DC.D1),
            DC.D1_5,
            NeutronUpgrade.fn5.canBeApplied ? DC.D0_75 : DC.D0_25
          ),
          formatEffect: value => formatPow(value),
          softcapped: value => value.gte(DC.D1_5)
        }
      },
      meon: {
        id: 7,
        key: "fermions_meon",
        symbol: "μ",
        description: () => `The power from the mass of the BH formula is always ${formatInt(-1)}`,
        currency: () => Currency.blackHole.value,
        currencyKey: "X_black_hole",
        formatAsMass: true,
        baseReq: DC.E6E5,
        reqMult: DC.E4E4,
        reqPow: DC.D1_25,
        reward: {
          description: "Boosts to Higgs Bosons and Gravitons gain",
          effect: (tier, currency) => {
            const effect = Softcap.power(
              tier.pow(DC.D1_5).add(DC.D1).pow(Softcap.power(
                currency.add(DC.D1).log10(),
                DC.E1,
                DC.D0_75
              )),
              DC.E6,
              DC.D0_75
            );
            // An overflow exists in C16
            return effect;
          },
          softcapped: value => value.gte(DC.E6),
          formatEffect: value => formatX(value)
        }
      },
      tau: {
        id: 8,
        key: "fermions_tau",
        symbol: "τ",
        description: "You are trapped in Challenges 8-9",
        currency: () => Currency.darkMatter.value,
        currencyKey: "X_dark_matter",
        baseReq: DC.E4_5E5,
        reqMult: DC.E5000,
        reqPow: DC.D1_5,
        reward: {
          description: "Tickspeed is cheaper (before Meta scaling)",
          effect: (tier, currency) => tier.pow(DC.D0_8).times(DC.D0_025).add(DC.D1).pow(currency.add(DC.D1).log10()),
          formatEffect: value => `/${format(value)}`
        }
      },
      neutrino: {
        id: 9,
        key: "fermions_neutrino",
        symbol: "ν<sub>e</sub>",
        description: () => `Star generators are decreased to ${formatPow(0.5, 1)}`,
        effect: DC.D0_5,
        maxTier: () => DC.D15,
        currency: () => Currency.stars.value,
        currencyKey: "X_collapsed_star",
        baseReq: DC.E1600,
        reqMult: DC.E400,
        reqPow: DC.D1_5,
        reward: {
          description: "Tier requirement is cheaper",
          effect: (tier, currency) => Softcap.power(
            currency.add(DC.D1).log10().add(DC.D1).times(tier).div(DC.D200).add(DC.D1),
            DC.D1_5,
            DC.D0_5
          ),
          formatEffect: value => `/${format(value)}`,
          softcapped: value => value.gte(DC.D1_5)
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