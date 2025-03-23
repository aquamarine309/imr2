export const particles = {
  proton: {
    id: 0,
    name: "Protons",
    effect: () => {
      const mass = Atom.protonMass();
      const tickspeed = Atom.protonTick();
      return `Boost Mass gain by ${formatX(mass)} and increase Tickspeed Power by ${formatPercents(tickspeed)}`;
    }
  },
  neutron: {
    id: 1,
    name: "Neutrons",
    effect: () => {
      const rp = Atom.neutronRP();
      const mass = Atom.neutronMass();
      return `Boost Rage Power gain by ${formatX(rp)} and boost Mass gain based on Rage Powers - ${formatX(mass)}`;
    }
  },
  electron: {
    id: 2,
    name: "Electrons",
    effect: () => {
      const dm = Atom.electronDM();
      const condenser = Atom.electronCondenser();
      return `Boost Dark Matter gain by ${formatX(dm)} and increases BH Condenser Power by ${format(condenser)}`;
    }
  }
};