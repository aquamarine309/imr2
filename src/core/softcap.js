import { GameMechanicState } from "./game-mechanics";
import { DC } from "./constants";

/**
 * @param {Decimal} decimal
 * @param {Decimal|number} power
 * @returns {Decimal}
 */
export function dilatedValue(value, power, base = DC.E1) {
  if (power.eq(DC.D1) || value.lt(DC.E1)) return value;
  // Functions pow10 and log10 is optimized, do not modify to "Decimal.pow(10, X)"
  return Decimal.pow10(value.log10().pow(power).times(base.log10().pow(DC.D1.minus(power))));
}

export class Softcap {
  static power(value, start, scale) {
    if (value.lte(start)) return value;
    return value.div(start).pow(scale).times(start);
  }

  static mult(value, start, scale) {
    if (value.lte(start)) return value;
    return value.minus(start).times(scale).add(start);
  }

  static dilation(value, start, scale) {
    if (value.lte(start)) return value;
    return dilatedValue(value.div(start), scale).times(start);
  }

  static log(value, start, scale) {
    if (value.lte(start)) return value;
    return value.div(start).log(scale).add(1).times(start);
  }
}

/**
 * @param {Decimal} value
 * @param {Decimal|number} start
 * @param {Decimal|number} scale
 * @returns {Decimal}
 */
export function overflow(value, start, scale) {
  if (value.gte(start)) {
    return Decimal.pow10(value.log(start).pow(scale)).mul(start);
  }
  return value;
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
        : Decimal.log10(value.log10().div(log10).pow(p).mul(log10));
    case SCALE_TYPE.ALT_EXP:
      return reverse
        ? value.div(s).max(1).log(p).add(1).mul(s)
        : p.pow(value.div(s).sub(1)).mul(s);
    default:
      throw new Error(`Unexpected scale type: ${type}`);
  }
}

function getScaleType(scaleIndex) {
  return [
    SCALE_TYPE.POWER,
    SCALE_TYPE.POWER,
    SCALE_TYPE.POWER,
    SCALE_TYPE.EXP,
    SCALE_TYPE.POWER,
    SCALE_TYPE.POWER,
    SCALE_TYPE.DILATION,
    SCALE_TYPE.ALT_EXP,
    SCALE_TYPE.DILATION
  ][scaleIndex];
}

class ScalingState {
  constructor(config) {
    this.name = config.name;
    this.scalings = config.scaling;
    this.currency = config.currency;
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
      const scale = scales[idx];
      if (reverse) {
        if (scale) {
          output = output.mul(scale);
        }
        output = this.scale(output, idx, reverse);
      } else {
        output = this.scale(output, idx, reverse);
        if (scale) {
          output = output.div(scale);
        }
      }
    }
    return output;
  }

  getName(value) {
    let idx = -1;
    // Binary Search is unnecessary
    for (let i = 0; i < this.scalings.length; i++) {
      if (value.lt(this.scalings[i].start)) break;
      idx = i;
    }
    if (idx === -1) return "";
    return i18n.t(SCALING_TYPE[idx]);
  }

  isScaled(index) {
    if (index >= this.scalings.length) return false;
    return this.scalings[index].start.lt(this.currency());
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