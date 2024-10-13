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
  D0_5: new Decimal("0.5"),
  D0_75: new Decimal("0.75"),
  D0_9: new Decimal("0.9"),
  D1_4: new Decimal("1.4"),
  D1_5: new Decimal("1.5"),
  D2_5: new Decimal("2.5"),

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
  D50: new Decimal("50"),
  D500: new Decimal("500"),

  E1: new Decimal("1e1"),
  E2: new Decimal("1e2"),
  E3: new Decimal("1e3"),
  E4: new Decimal("1e4"),
  E5: new Decimal("1e5"),
  E6: new Decimal("1e6"),
  E7: new Decimal("1e7"),
  E15: new Decimal("1e15"),
  E20: new Decimal("1e20"),
  E100: new Decimal("1e100")
});

window.SCALING_TYPE = ["Super", "Hyper", "Ultra", "Meta", "Exotic", "Supercritical", "Instant", "Mega"];