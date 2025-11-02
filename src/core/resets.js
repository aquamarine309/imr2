class ResetState {
  constructor(config) {
    this.config = config;
  }

  get canReset() {
    return this.config.canReset();
  }

  requestReset() {
    if (!this.canReset) return;
    this.config.requestReset(() => this.resetLayer());
  }

  resetLayer(...args) {
    this.config.resetLayer(...args);
  }
}

export const Resets = mapGameDataToObject(
  GameDatabase.resets,
  config => new ResetState(config)
);