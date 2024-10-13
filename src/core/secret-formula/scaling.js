import { DC } from "@/core/constants";

export const scaling = {
  massUpgrade: [
    {
      start: DC.E2,
      get scale() {
        return DC.D2_5.timesEffectOf(RageUpgrade(7));
      }
    },
    {
      start: DC.D500,
      get scale() {
        return DC.D5.timesEffectOf(RageUpgrade(7));
      }
    },
  ],
  tickspeed: [
    {
      start: DC.E2,
      scale: DC.D2
    }
  ],
  rank: [
    {
      start: DC.D50,
      scale: DC.D1_5
    },
  ],
  tier: [
    {
      start: DC.E1,
      scale: DC.D1_5
    },
  ],
  overpower: [
    {
      start: DC.D50,
      scale: DC.D3
    }
  ]
};