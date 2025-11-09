import { DC } from "@/core/constants";

export const primordium = {
  delta: {
    id: 0,
    key: "delta",
    symbol: "Δ",
    weight: 6,
    effectList: [
      {
        description: value => `Boost Stronger Power by ${formatX(value)}`,
        effect: value => value.add(1).sqrt()
      }
    ]
  },
  alpha: {
    id: 1,
    key: "alpha",
    symbol: "Α",
    weight: 6,
    effectList: [
      {
        description: value => `Boost Rage Powers Gain by ${formatPow(value)}`,
        effect: value => {
          // TODO
          const br16 = false;
          let result = value.cbrt().times(DC.D0_2).add(1);
          result = Softcap.power(result, DC.D3, DC.D0_4, br16);
          if (br16) result = result.pow(DC.D1_5);
          return result;
        }
      },
      {
        description: value => `Boost Non-bonus Tickspeed by ${formatX(value)}`,
        effect: value => value.pow(DC.D1_25).add(1)
      }
    ]
  },
  omega: {
    id: 2,
    key: "omega",
    symbol: "Ω",
    weight: 6,
    effectList: [
      {
        description: value => `Boost Dark Matters Gain by ${formatPow(value)}`,
        effect: value => {
          // TODO
          const br16 = false;
          let result = value.cbrt().times(DC.D0_2).add(1);
          result = Softcap.power(result, DC.D3, DC.D0_4, br16);
          if (br16) result = result.pow(DC.D1_5);
          return result;
        }
      },
      {
        description: value => `Boost BH Condenser Power by ${formatX(value)}`,
        effect: value => DC.D3.pow(value.pow(DC.D0_75))
      }
    ]
  },
  sigma: {
    id: 3,
    key: "sigma",
    symbol: "Σ",
    weight: 6,
    effectList: [
      {
        description: value => `Boost Atoms Gain by ${formatPow(value)}`,
        effect: value => {
          const br16 = false;
          let result = value.cbrt().times(DC.D0_2).add(1);
          result = Softcap.power(result, DC.D3, DC.D0_4, br16);
          if (br16) result = result.pow(DC.D1_5);
          return result;
        }
      },
      {
        description: value => `Boost Cosmic Ray Power by ${formatX(value)}`,
        effect: value => DC.D2.pow(value.pow(DC.D0_75))
      }
    ]
  },
  phi: {
    id: 4,
    key: "phi",
    symbol: "Φ",
    weight: 2,
    effectList: [
      {
        description: value => `Boost Higgs Boson's effect by ${formatX(value)}`,
        effect: value => value.add(1).pow(DC.D0_1)
      }
    ]
  },
  epsilon: {
    id: 5,
    key: "epsilon",
    symbol: "Ε",
    weight: 2,
    effectList: [
      {
        description: value => `Add ${format(value, 2)} to base from Fermions gain`,
        effect: value => value.cbrt().times(DC.D0_1)
      },
      {
        isUnlocked: () => NeutronUpgrade.prim3.canBeApplied,
        description: value => `Add ${format(value, 2)} free tiers to Fermions`,
        effect: value => value.cbrt()
      }
    ]
  },
  theta: {
    id: 6,
    key: "theta",
    symbol: "Θ",
    weight: 2,
    effectList: [
      {
        description: value => `Boost all Radiations gains by ${formatX(value)}`,
        effect: value => DC.D5.pow(value.pow(DC.D0_75))
      },
      {
        isUnlocked: () => NeutronUpgrade.prim2.canBeApplied,
        description: value => `Make all Radiations effects ${formatPow(value)} stronger`,
        effect: value => value.pow(DC.D0_2).times(DC.D0_1).add(1)
      }
    ]
  },
  beta: {
    id: 7,
    key: "beta",
    symbol: "Β",
    weight: 1,
    effectList: [
      {
        description: value => `Make all Supernova's scalings start ${format(value, 0)} later`,
        effect: value => {
          const result = value.pow(DC.D0_9).times(2);
          return Softcap.power(result, DC.D1500, DC.D0_5);
        }
      }
    ]
  }
};