import { DC } from "@/core/constants";

export const chroma = [
  {
    id: 0,
    name: "Pyro-Radioactive Plasma",
    color: "Red",
    description: "Makes tickspeed power is raised.",
    effect: value => value.add(1).log10().add(1).pow(DC.C1D3),
    formatEffect: value => formatPow(value)
  },
  {
    id: 1,
    name: "Hybridized Uran-Astatine",
    color: "Green",
    description: "Makes all pre-Pent requirements reduced.",
    effect: value => Softcap.power(DC.D1_01.pow(value.add(1).log10().max(0).pow(DC.D0_8)), DC.E10, DC.C1D3),
    formatEffect: value => `/${format(value)}`
  },
  {
    id: 2,
    name: "Neutronium-0",
    color: "Blue",
    description: "Makes rewards from Challenges 1-8 stronger.",
    effect: value => DC.D1_1.pow(value.add(1).log10().max(0).pow(DC.D0_75)),
    formatEffect: value => formatX(value)
  }
];