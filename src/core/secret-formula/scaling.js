import { DC } from "@/core/constants";

export const scaling = {
  massUpgrade: [
    {
      get start() {
        if (Challenge(1).isRunning) return DC.D25;
        return DC.E2.plusEffectOf(BHUpgrade(2));
      },
      get scale() {
        return DC.D2_5.powEffectOf(RageUpgrade(7));
      }
    },
    {
      start: DC.D500,
      get scale() {
        return DC.D5.powEffectOf(RageUpgrade(7));
      }
    },
  ],
  tickspeed: [
    {
      get start() {
        if (Challenge(1).isRunning) return DC.D50;
        return DC.E2;
      },
      get scale() {
        let scale = DC.D2;
        scale = scale.timesEffectOf(Challenge(1).reward.effects.tickspeed);
        return scale;
      }
    }
  ],
  rank: [
    {
      get start() {
        if (Challenge(1).isRunning) return DC.D25;
        let start = DC.D50;
        start = start.plusEffectOf(Challenge(1).reward.effects.rank);
        return start;
      },
      get scale() {
        return DC.D1_5.powEffectOf(RageUpgrade(9));
      }
    },
    {
      get start() {
        return DC.D120;
      },
      get scale() {
        return DC.D2_5;
      }
    }
  ],
  tier: [
    {
      start: DC.E1,
      scale: DC.D1_5
    },
    {
      get start() {
        return DC.D200;
      },
      get scale() {
        return DC.D2_5;
      }
    }
  ],
  overpower: [
    {
      start: DC.D50,
      scale: DC.D3
    }
  ],
  condenser: [
    {
      start: DC.E2,
      scale: DC.D2
    }
  ]
};