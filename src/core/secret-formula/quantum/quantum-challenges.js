import { DC } from "@/core/constants";

export const quantumChallenges = [
  {
    id: 0,
    name: "Black Dwarf",
    description: effects => `${formatPow(effects.stars)} to exponent of all-star resources, and ${formatPow(effects.generators)} to strength of star generators.`,
    effects: {
      stars: value => DC.D1.minus(DC.D0_03.times(value)),
      generators: value => DC.D2.div(DC.D2.add(value))
    }
  },
  {
    id: 1,
    name: "Time Anomaly",
    description: effect => `/${format(effect)} to pre-Quantum global speed.`,
    effect: value => {
      if (value > 35) return DC.D2.pow(Math.pow(value, 5) / 5000);
      if (value > 10) return DC.D2.pow(Math.pow(value, 5) / 1000);
      return DC.D2.pow(Math.pow(value, 2));
    }
  },
  {
    id: 2,
    name: "Hypertiered",
    description: effect => `${formatX(effect)} to requirements of any Fermions.`,
    effect: value => 0.15 * Math.pow(value, value > 10 ? 3.5 : 1.5) + 1
  },
  {
    id: 3,
    name: "Melted Interactions",
    description: value => `${formatPow(value)} to multiplier from Bosonic & Radiation resources.`,
    effect: value => {
      if (value > 50) return DC.D0_9.pow(Math.pow(value, 6.25) / 8000);
      if (value > 10) return DC.D0_9.pow(Math.pow(value, 3.25) / 100);
      return DC.D0_9.pow(Math.pow(value, 1.25));
    }
  },
  {
    id: 4,
    name: "Intense Catalyst",
    description: value => `${formatPow(value)} to multiplier from pre-Supernova resources, except all star resources.`,
    effect: value => {
      if (value > 50) return DC.D0_8.pow(Math.pow(value, 2.5) / 100);
      if (value > 10) return DC.D0_8.pow(Math.pow(value, 2) / 100);
      return DC.D0_8.pow(Math.pow(value, 1.25));
    }
  },
  {
    id: 5,
    name: "Ex-Challenge",
    description: effect => `${formatX(effect)} to requirements of any pre-Quantum Challenge.`,
    effect: value => {
      if (value > 10) return DC.D1_2.pow(Math.pow(value, 1.5) / 10).min(DC.E300);
      return DC.D1_2.pow(value);
    }
  },
  {
    id: 6,
    name: "Spatial Dilation",
    description: effect => `${formatPow(effect)} to Mass Dilation's penalty.`,
    effect: value => {
      if (value > 10) return Math.pow(value, 4.5) / 2000 + 1;
      return Math.pow(value, 1.5) / 2 + 1;
    }
  },
  {
    id: 7,
    name: "Extreme Scaling",
    description: effects => `${formatPow(effects.starting)} to starting of pre-Quantum scaling, and ${formatPercents(effects.strength)} to strength of pre-Quantum scaling.`,
    effects: {
      starting: value => {
        if (value > 10) return DC.D0_49;
        return DC.D1.minus(DC.D0_05.times(value));
      },
      strength: value => {
        if (value > 16) return Math.pow(value, 3) / 5000 + 1;
        if (value > 10) return Math.pow(value, 2) / 1000 + 1;
        return value / 10 + 1;
      }
    }
  }
];