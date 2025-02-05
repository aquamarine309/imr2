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
  D0_97: new Decimal("0.97"),
  D1_0025: new Decimal("1.0025"),
  D1_025: new Decimal("1.025"),
  D1_25: new Decimal("1.25"),
  D1_3: new Decimal("1.3"),
  D1_4: new Decimal("1.4"),
  D1_5: new Decimal("1.5"),
  D1_75: new Decimal("1.75"),
  D2_3: new Decimal("2.3"),
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
  D16: new Decimal("16"),
  D25: new Decimal("25"),
  D30: new Decimal("30"),
  D50: new Decimal("50"),
  D60: new Decimal("60"),
  D64: new Decimal("64"),
  D75: new Decimal("75"),
  D80: new Decimal("80"),
  D120: new Decimal("120"),
  D200: new Decimal("200"),
  D250: new Decimal("250"),
  D300: new Decimal("300"),
  D400: new Decimal("400"),
  D500: new Decimal("500"),
  D600: new Decimal("600"),
  D700: new Decimal("700"),
  D2_5E4: new Decimal("2.5e4"),
  D4E4: new Decimal("4e4"),
  D5E4: new Decimal("5e4"),
  D5E5: new Decimal("5e5"),
  D2E6: new Decimal("2e6"),
  D4E6: new Decimal("4e6"),
  D5E8: new Decimal("5e8"),
  D2E9: new Decimal("2e9"),
  D2_5E12: new Decimal("2.5e12"),
  D2_5E16: new Decimal("2.5e16"),
  D5E18: new Decimal("5e18"),
  D6_5E21: new Decimal("6.5e21"),
  D2_5E30: new Decimal("2.5e30"),
  D2_5E35: new Decimal("2.5e35"),
  D1_989E38: new Decimal("1.989e38"),
  D5E38: new Decimal("5e38"),
  D1_989E40: new Decimal("1.989e40"),
  D2E44: new Decimal("2e44"),
  D5E47: new Decimal("5e47"),
  D2_9835E49: new Decimal("2.9835e49"),
  D1_5E58: new Decimal("1.5e58"),
  D1_25E76: new Decimal("1.25e76"),
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
  E10: new Decimal("1e10"),
  E13: new Decimal("1e13"),
  E15: new Decimal("1e15"),
  E16: new Decimal("1e16"),
  E17: new Decimal("1e17"),
  E18: new Decimal("1e18"),
  E20: new Decimal("1e20"),
  E21: new Decimal("1e21"),
  E24: new Decimal("1e24"),
  E25: new Decimal("1e25"),
  E27: new Decimal("1e27"),
  E29: new Decimal("1e29"),
  E31: new Decimal("1e31"),
  E33: new Decimal("1e33"),
  E34: new Decimal("1e34"),
  E35: new Decimal("1e35"),
  E37: new Decimal("1e37"),
  E40: new Decimal("1e40"),
  E43: new Decimal("1e43"),
  E44: new Decimal("1e44"),
  E45: new Decimal("1e45"),
  E50: new Decimal("1e50"),
  E53: new Decimal("1e53"),
  E56: new Decimal("1e56"),
  E72: new Decimal("1e72"),
  E80: new Decimal("1e80"),
  E100: new Decimal("1e100"),
  E120: new Decimal("1e120"),
  E150: new Decimal("1e150"),
  E156: new Decimal("1e156"),
  E180: new Decimal("1e180"),
  E210: new Decimal("1e210"),
  E320: new Decimal("1e320"),
  E420: new Decimal("1e420"),
  E480: new Decimal("1e480"),
  E4000: new Decimal("1e4000"),

  E3_8E4: new Decimal("1e3.8e4"),
  E1_6E5: new Decimal("1e1.6e5"),

  EE28: new Decimal("1ee28"),
  EE100: new Decimal("1ee100"),
  EE200: new Decimal("1ee200")
});

window.SCALING_TYPE = ["Super", "Hyper", "Ultra", "Meta", "Exotic", "Supercritical", "Instant", "Mega"];

window.RATIO_MODE = {
  SINGLE: 0,
  QUARTER: 1,
  ALL: 2
};