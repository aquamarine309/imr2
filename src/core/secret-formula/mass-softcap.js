import { DC } from "@/core/constants";

export const massSoftcap = [
  {
    id: 0,
    mass() {
      let mass = DC.E156;
      mass = mass.dividedByEffectsOf(
        Challenge(3),
        Challenge(4)
      );
      mass = mass.timesEffectsOf(
        BHUpgrade(6),
        RageUpgrade(12)
      );
      return mass;
    },
    effect() {
      let div = DC.C1D3;
      if (Challenge(3).isRunning) {
        div = div.times(4);
      }
      div = div.timesEffectsOf(
        BHUpgrade(10),
        Challenge(7),
        RankType.rank.unlocks.massSoftcap
      );
      return div.add(1).recip();
    }
  }
];