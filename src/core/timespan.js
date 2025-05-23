window.TimeSpan = class TimeSpan {
  /**
   * @param {Number} value
   * @returns {TimeSpan}
   */
  static fromYears(value) {
    return new TimeSpan(value * 31536e6);
  }

  /**
   * @param {Number} value
   * @returns {TimeSpan}
   */
  static fromDays(value) {
    return new TimeSpan(value * 864e5);
  }

  /**
   * @param {Number} value
   * @returns {TimeSpan}
   */
  static fromHours(value) {
    return new TimeSpan(value * 36e5);
  }

  /**
   * @param {Number} value
   * @returns {TimeSpan}
   */
  static fromMinutes(value) {
    return new TimeSpan(value * 6e4);
  }

  /**
   * @param {Number} value
   * @returns {TimeSpan}
   */
  static fromSeconds(value) {
    return new TimeSpan(value * 1e3);
  }

  /**
   * @param {Number} value
   * @returns {TimeSpan}
   */
  static fromMilliseconds(value) {
    return new TimeSpan(value);
  }

  /**
   * @param {Number} ms
   */
  constructor(ms) {
    Guard.isNumber(ms, "Value 'ms' must be a number");
    this._ms = ms;
  }

  /**
   * @param {TimeSpan} other
   */
  copyFrom(other) {
    Guard.isTimeSpan(other);
    this._ms = other._ms;
  }

  /**
   * @param {Number} ms
   */
  setFrom(ms) {
    Guard.isNumber(ms);
    this._ms = ms;
  }

  /**
   * @returns {Number}
   */
  get years() {
    return Math.floor(this.totalYears);
  }

  /**
   * @returns {Number}
   */
  get days() {
    return Math.floor(this.totalDays % 365);
  }

  /**
   * @returns {Number}
   */
  get hours() {
    return Math.floor(this.totalHours % 24);
  }

  /**
   * @returns {Number}
   */
  get minutes() {
    return Math.floor(this.totalMinutes % 60);
  }

  /**
   * @returns {Number}
   */
  get seconds() {
    return Math.floor(this.totalSeconds % 60);
  }

  /**
   * @returns {Number}
   */
  get milliseconds() {
    return Math.floor(this.totalMilliseconds % 1e3);
  }

  /**
   * @returns {Number}
   */
  get totalYears() {
    return this._ms / 31536e6;
  }

  /**
   * @returns {Number}
   */
  get totalDays() {
    return this._ms / 864e5;
  }

  /**
   * @returns {Number}
   */
  get totalHours() {
    return this._ms / 36e5;
  }

  /**
   * @returns {Number}
   */
  get totalMinutes() {
    return this._ms / 6e4;
  }

  /**
   * @returns {Number}
   */
  get totalSeconds() {
    return this._ms / 1e3;
  }

  /**
   * @returns {Number}
   */
  get totalMilliseconds() {
    return this._ms;
  }

  /**
   * @param {TimeSpan} other
   * @returns {TimeSpan}
   */
  plus(other) {
    Guard.isTimeSpan(other);
    return new TimeSpan(this._ms + other._ms);
  }

  /**
   * @param {TimeSpan} other
   * @returns {TimeSpan}
   */
  minus(other) {
    Guard.isTimeSpan(other);
    return new TimeSpan(this._ms - other._ms);
  }

  /**
   * @param {Number} other
   * @returns {TimeSpan}
   */
  times(other) {
    Guard.isNumber(other);
    return new TimeSpan(this._ms * other);
  }

  /**
   * @param {Number} other
   * @returns {TimeSpan}
   */
  dividedBy(other) {
    Guard.isNumber(other);
    return new TimeSpan(this._ms / other);
  }

  /**
   * @returns {String}
   */
  toString() {
    if (this.years > 1e6) {
      return `${format(this.totalYears, 3, 0)} years`;
    }
    if (this.totalSeconds >= 10) {
      return this.toStringNoDecimals();
    }
    return this.toStringShort();
  }

  /**
   * @returns {String}
   */
  toStringNoDecimals() {
    const parts = [];
    function addCheckedComponent(value, name) {
      if (value === 0) {
        return;
      }
      addComponent(value, name);
    }
    function addComponent(value, key) {
      parts.push(i18n.tc(key, value, { value: formatInt(value) }));
    }
    addCheckedComponent(this.years, "X_year");
    addCheckedComponent(this.days, "X_day");
    addCheckedComponent(this.hours, "X_hour");
    addCheckedComponent(this.minutes, "X_minute");
    addCheckedComponent(this.seconds, "X_second");
    // Join with commas and 'and' in the end.
    if (parts.length === 0) return i18n.tc("X_second", 0, { value: formatInt(0) });
    const isEnglish = player.options.language === "en";
    if (isEnglish) {
      return [parts.slice(0, -1).join(", "), parts.slice(-1)[0]].join(parts.length < 2 ? "" : " and ");
    }
    return parts.join(" ");
  }

  /**
   * Note: For speedruns, we give 3 digits of hours on HMS formatting, a decimal point on seconds, and
   *  suppress END formatting on the speedrun record tabs
   * @param {boolean} useHMS If true, will display times as HH:MM:SS in between a minute and 100 hours.
   * @returns {String}
   */
  toStringShort(useHMS = true) {
    const totalSeconds = this.totalSeconds;
    if (totalSeconds <= 5e-7) {
      return i18n.t("instant");
    }
    if (totalSeconds < 1e-3) {
      // This conditional happens when when the time is less than 1 millisecond
      // but big enough not to round to 0 with 3 decimal places (so showing decimal places
      // won't just show 0 and waste space).
      return i18n.t("X_ms", { value: format(1000 * totalSeconds, 3) });
    }
    if (totalSeconds < 1) {
      // This catches all the cases when totalSeconds is less than 1 but not
      // between 5e-7 and 1e-3. This includes two types of cases:
      // (1) those less than or equal to 5e-7, which most notations will format as 0
      // (the most notable case of this kind is 0 itself).
      // (2) those greater than or equal to 1e-3, which will be formatted with default settings
      // (for most notations, rounding to the nearest integer number of milliseconds)
      return i18n.t("X_ms", { value: format(1000 * totalSeconds, 0) });
    }
    if (totalSeconds < 60) {
      return i18n.tc("X_second", totalSeconds, { value: format(totalSeconds, 3) });
    }
    if (this.totalHours < 100) {
      if (useHMS) {
        const sec = formatHMS(this.seconds);
        if (Math.floor(this.totalHours) === 0) return `${formatHMS(this.minutes)}:${sec}`;
        return `${formatHMS(Math.floor(this.totalHours))}:${formatHMS(this.minutes)}:${sec}`;
      }
      if (this.totalMinutes < 60) {
        return i18n.tc("X_minute", this.totalMinutes, { value: format(this.totalMinutes, 3) });
      }
      if (this.totalHours < 24) {
        return i18n.tc("X_hour", this.totalHours, { value: format(this.totalHours, 3) });
      }
    }
    if (this.totalDays < 500) {
      return i18n.tc("X_day", this.totalDays, { value: format(this.totalDays, 3) });
    }
    return i18n.tc("X_year", this.totalYears, { value: format(this.totalYears, 3) });

    function formatHMS(value) {
      const s = value.toString();
      return s.length === 1 ? `0${s}` : s;
    }
  }

  toTimeEstimate() {
    const seconds = this.totalSeconds;
    if (seconds < 1) return `< ${i18n.tc("X_second", 1, { value: formatInt(1) })}`;
    if (seconds > 86400 * 365.25) return `> ${i18n.tc("X_year", 1, { value: formatInt(1) })}`;
    return this.toStringShort();
  }

  static get zero() {
    return new TimeSpan(0);
  }

  static get maxValue() {
    return new TimeSpan(Number.MAX_VALUE);
  }

  static get minValue() {
    return new TimeSpan(Number.MIN_VALUE);
  }
};

const Guard = {
  isDefined(value, message) {
    if (value !== undefined) return;
    if (message) throw message;
    throw "Value is defined";
  },
  isNumber(value, message) {
    if (typeof value === "number") return;
    if (message) throw message;
    throw "Value is not a number";
  },
  isTimeSpan(value, message) {
    if (value instanceof TimeSpan) return;
    if (message) throw message;
    throw "Value is not a TimeSpan";
  }
};
