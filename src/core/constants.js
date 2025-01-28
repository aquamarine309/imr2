window.SOFTCAP_TYPE = {
  POWER: 0,
  MULT: 1,
  DILATION: 2,
  LOG: 3
};

window.SCALE_TYPE = {
  POWER: 0,
  EXP: 1,
  DILATION: 2,
  ALT_EXP: 3
};

function deepFreeze(obj) {
  Object.keys(obj).forEach(prop => {
    const reference = obj[prop];
    if (typeof reference === "object") deepFreeze(reference);
  });
  return Object.freeze(obj);
}

export const DC = deepFreeze({
  D0_25: new Decimal("0.25"),
  D0_5: new Decimal("0.5"),
  D0_75: new Decimal("0.75"),
  D0_8: new Decimal("0.8"),
  D0_9: new Decimal("0.9"),
  D0_96: new Decimal("0.96"),
  D1_25: new Decimal("1.25"),
  D1_3: new Decimal("1.3"),
  D1_4: new Decimal("1.4"),
  D1_5: new Decimal("1.5"),
  D1_75: new Decimal("1.75"),
  D2_5: new Decimal("2.5"),

  C1D3: new Decimal(1).div(3),

  D0: new Decimal("0"),
  D1: new Decimal("1"),
  D2: new Decimal("2"),
  D3: new Decimal("3"),
  D4: new Decimal("4"),
  D5: new Decimal("5"),
  D6: new Decimal("6"),
  D7: new Decimal("7"),
  D8: new Decimal("8"),
  D9: new Decimal("9"),
  D15: new Decimal("15"),
  D25: new Decimal("25"),
  D30: new Decimal("30"),
  D50: new Decimal("50"),
  D120: new Decimal("120"),
  D200: new Decimal("200"),
  D400: new Decimal("400"),
  D500: new Decimal("500"),
  D5E5: new Decimal("5e5"),
  D2E6: new Decimal("2e6"),
  D1_989E40: new Decimal("1.989e40"),
  D2_9835E49: new Decimal("2.9835e49"),
  D1_5E58: new Decimal("1.5e58"),
  D1_736881338559743E133: new Decimal("1.736881338559743e133"),
  D1_5E136: new Decimal("1.5e136"),
  D1_5E156: new Decimal("1.5e156"),

  E1: new Decimal("1e1"),
  E2: new Decimal("1e2"),
  E3: new Decimal("1e3"),
  E4: new Decimal("1e4"),
  E5: new Decimal("1e5"),
  E6: new Decimal("1e6"),
  E7: new Decimal("1e7"),
  E13: new Decimal("1e13"),
  E15: new Decimal("1e15"),
  E17: new Decimal("1e17"),
  E20: new Decimal("1e20"),
  E27: new Decimal("1e27"),
  E31: new Decimal("1e31"),
  E33: new Decimal("1e33"),
  E43: new Decimal("1e43"),
  E72: new Decimal("1e72"),
  E100: new Decimal("1e100"),
  E120: new Decimal("1e120"),
  E150: new Decimal("1e150"),
  E156: new Decimal("1e156"),
  E180: new Decimal("1e180"),
  E4000: new Decimal("1e4000"),

  EE100: new Decimal("1ee100")
});

window.SCALING_TYPE = ["Super", "Hyper", "Ultra", "Meta", "Exotic", "Supercritical", "Instant", "Mega"];

window.CHALLENGE_TYPE = {
  DARK_MATTER: {
    name: "a dark matter",
    reset: () => Currency.darkMatter.resetLayer(true)
  },
  ATOM: {
    name: "an atom"
  },
  SUPERNOVA: {
    name: "a supermova"
  },
  DARKNESS: {
    name: "a darkness"
  },
  FSS: {
    name: "an FSS"
  },
  INFINITY: {
    name: "an Infinity"
  }
};