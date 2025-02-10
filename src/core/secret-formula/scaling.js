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
        return DC.D250.plusEffectsOf(
          RageUpgrade(13),
          RankType.tetr.unlocks.tickScaling
        );
      },
      get scale() {
        return DC.D4.powEffectsOf(
          BHUpgrade(11),
          GameElement(27)
        );
      }
    },
    {
      get start() {
        return DC.D700.plusEffectOf(RankType.tetr.unlocks.tickScaling);
      },
      get scale() {
        return DC.D7.powEffectOf(GameElement(27));
      }
    },
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
        return DC.D1_5.powEffectsOf(
          RageUpgrade(9),
          RankType.tetr.unlocks.ranksScaling
        );
      }
    },
    {
      get start() {
        return DC.D120.plusEffectOf(AtomUpgrade(9));
      },
      get scale() {
        return DC.D2_5.powEffectsOf(
          RankType.tetr.unlocks.ranksReqAndScaling.effects.rank,
          GameElement(27)
        );
      }
    },
    {
      get start() {
        return DC.D600;
      },
      get scale() {
        return DC.D4.powEffectOf(GameElement(27));
      }
    },
    {
      get start() {
        return DC.E4;
      },
      get scale() {
        return DC.D1_0025;
      }
    },
    {
      get start() {
        return DC.E16;
      },
      get scale() {
        return DC.D15;
      }
    },
    {
      get start() {
        return DC.E37;
      },
      get scale() {
        return DC.D50;
      }
    },
  ],
  tier: [
    {
      get start() {
        return DC.E1.plusEffectOf(AtomUpgrade(4));
      },
      get scale() {
        let scale = DC.D1_5;
        if (RankType.tetr.unlocks.ranksScaling.canBeApplied) {
          scale = scale.pow(0.8);
        }
        scale = scale.powEffectOf(GameElement(37));
        return scale;
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
        return DC.D7.plusEffectOf(RankType.tier.unlocks.superTetrLater);
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
        return DC.D2.powEffectOf(GameElement(15));
      }
    },
    {
      get start() {
        return DC.D300;
      },
      get scale() {
        return DC.D2;
      }
    },
    {
      get start() {
        return DC.D750;
      },
      get scale() {
        return DC.D4;
      }
    }
  ],
  cosmicRay: [
    {
      get start() {
        return DC.E2;
      },
      get scale() {
        return DC.D2.powEffectOf(GameElement(15));
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
  ],
  supernova: [
    {
      get start() {
        return DC.D15;
      },
      get scale() {
        return DC.D3;
      }
    },
    {
      get start() {
        return DC.D35;
      },
      get scale() {
        return DC.D3;
      }
    },
    {
      get start() {
        return DC.D60;
      },
      get scale() {
        return DC.D5;
      }
    },
    {
      get start() {
        return DC.E2;
      },
      get scale() {
        return DC.D1_025;
      }
    },
    {
      get start() {
        return DC.D2E5;
      },
      get scale() {
        return DC.D20;
      }
    },
    {
      get start() {
        return DC.E7;
      },
      get scale() {
        return DC.D75;
      }
    }
  ]
};