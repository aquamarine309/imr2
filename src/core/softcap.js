import { GameMechanicState } from "./game-mechanics";
import { DC } from "./constants";

/**
 * @param {Decimal} decimal
 * @param {Decimal|number} power
 * @returns {Decimal}
 */
export function dilatedValue(value, power) {
  if (value.lt(10)) return value;
  return Decimal.pow10(value.log10().pow(power));
}

/**
 * @param {Decimal} value
 * @param {Decimal|number} start
 * @param {Decimal|number} scale
 * @param {number} type SOFTCAP_TYPE (see constants.js)
 * @returns {Decimal}
 */
export function softcap(value, start, scale, type) {
  if (start === undefined) {
    throw new Error("Start is not defined.");
  }
  if (value.lt(start)) return value;
  switch (type) {
    case SOFTCAP_TYPE.POWER:
      return value.div(start).pow(scale).times(start);
    case SOFTCAP_TYPE.MULT:
      return value.minus(start).times(scale).add(start);
    case SOFTCAP_TYPE.DILATION:
      return dilatedValue(value.div(start), scale).times(start);
    case SOFTCAP_TYPE.LOG:
      return value.div(start).log(power).add(1).times(start);
    default:
      throw new Error(`Unexpected softcap type: ${type}`);
  }
}

export function scaleValue(value, start, power, type, reverse = false) {
  const s = new Decimal(start);
  if (value.lt(s)) return value;
  const p = new Decimal(power);
  const log10 = s.log10();
  switch (type) {
    case SCALE_TYPE.POWER:
      return reverse
        ? value.div(s).root(p).mul(s)
        : value.div(s).pow(p).mul(s);
    case SCALE_TYPE.EXP:
      return reverse
        ? value.div(s).max(1).log(p).add(s)
        : p.pow(value.sub(s)).mul(s);
    case SCALE_TYPE.DILATION:
      return reverse
        ? Decimal.pow10(value.log10().div(log10).root(p).mul(log10))
        : Decimal.pow10(value.log10().div(log10).pow(p).mul(log10));
    case SCALE_TYPE.ALT_EXP:
      return reverse
        ? value.div(s).max(1).log(p).add(1).mul(s)
        : p.pow(value.div(s).sub(1)).mul(s);
    default:
      throw new Error(`Unexpected scale type: ${type}`);
  }
}

function getScaleType(scaleIndex) {
  if (scaleIndex % 4 === 3) {
    if (scaleIndex >= 7) {
      return SCALE_TYPE.EXP_ALT;
    }
    return SCALE_TYPE.EXP;
  }
  if (scaleIndex >= 6) {
    return SCALE_TYPE.DILATION;
  }
  return SCALE_TYPE.POWER;
}

class ScalingState {
  constructor(scalings) {
    this.scalings = scalings;
  }

  scale(value, index, reverse = false) {
    const scaling = this.scalings[index];
    if (scaling === undefined) return value;

    return scaleValue(
      value,
      scaling.start,
      scaling.scale,
      getScaleType(index),
      reverse
    );
  }

  scaleEvery(value, reverse = false, scales = []) {
    const length = SCALING_TYPE.length;
    let output = value;
    for (let i = 0; i < length; i++) {
      const idx = reverse ? i : length - i - 1;
      const scale = scales[idx] ?? DC.D1;
      if (reverse) {
        output = this.scale(output.mul(scale), idx, reverse);
      } else {
        output = this.scale(output, idx, reverse).div(scale);
      }
    }
    return output;
  }

  getName(value) {
    let idx = -1;
    for (let i = 0; i < this.scalings.length; i++) {
      if (value.lt(this.scalings[i].start)) break;
      idx = i;
    }
    if (idx === -1) return "";
    // Pecifically format meta-xxx and mega-xxx
    return `${SCALING_TYPE[idx]}${idx % 4 === 3 ? "-" : " "}`;
  }
}

export const Scaling = mapGameDataToObject(
  GameDatabase.scaling,
  config => new ScalingState(config)
);

class MassSoftcapState extends GameMechanicState {
  get mass() {
    return this.config.mass();
  }

  get isEffectActive() {
    return Currency.mass.gte(this.mass);
  }
}

export const MassSoftcap = mapGameData(
  GameDatabase.massSoftcap,
  config => new MassSoftcapState(config)
);