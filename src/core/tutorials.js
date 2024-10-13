class TutorialState {
  constructor(config) {
    this._config = config;
  }

  get config() {
    return this._config;
  }

  get id() {
    return this.config.id;
  }

  get isUnlocked() {
    return (player.tutorialBits & (1 << this.id)) !== 0;
  }

  unlock() {
    if (this.isUnlocked) return;
    player.tutorialBits |= (1 << this.id);
    Modal.tutorial.show({ tutorial: this.config });
  }
}

export const Tutorial = mapGameDataToObject(
  GameDatabase.tutorials,
  config => new TutorialState(config)
);