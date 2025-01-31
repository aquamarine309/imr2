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
        scale = scale.powEffectOf(Challenge(1).reward.effects.tickspeed);
        return scale;
      }
    },
    {
      get start() {
        return DC.D250.plusEffectOf(RageUpgrade(13));
      },
      get scale() {
        return DC.D4.powEffectOf(BHUpgrade(11));
      }
    }
  ],
  rank: [
    {
      get start() {
        if (Challenge(1).isRunning) return DC.D25;
        let start = DC.D50;
        start = start.plusEffectsOf(
          Challenge(1).reward.effects.rank,
          AtomUpgrade(4)
        );
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
        return DC.D2_5.powEffectOf(
          RankType.tetr.unlocks.ranksReqAndScaling.effects.rank
        );
      }
    }
  ],
  tier: [
    {
      get start() {
        return DC.E1.plusEffectOf(AtomUpgrade(4));
      },
      get scale() {
        return DC.D1_5;
      }
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
  tetr: [
    {
      get start() {
        return DC.D7;
      },
      get scale() {
        return DC.D2;
      }
    },
    {
      get start() {
        return DC.D60;
      },
      get scale() {
        return DC.D3;
      }
    }
  ],
  overpower: [
    {
      get start() {
        return DC.D50;
      },
      get scale() {
        return DC.D3;
      }
    }
  ],
  condenser: [
    {
      get start() {
        return DC.E2;
      },
      get scale() {
        return DC.D2;
      }
    }
  ],
  cosmicRay: [
    {
      get start() {
        return DC.E2;
      },
      get scale() {
        return DC.D2;
      }
    },
    {
      get start() {
        return DC.D300;
      },
      get scale() {
        return DC.D4;
      }
    }
  ]
};