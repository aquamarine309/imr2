import { GameMechanicState } from "./game-mechanics";
import { deepmergeAll } from "@/utility/deepmerge.js";
import { DC } from "./constants";

class ChallengeRewardState extends GameMechanicState {
  constructor(config, challenge) {
    const effect = config.effect;
    const configCopy = deepmergeAll([{}, config]);
    if (effect) {
      configCopy.effect = () => effect(challenge.completions);
    } else {
      const effects = {};
      for (const key in config.effects) {
        const fn = config.effects[key];
        effects[key] = () => fn(challenge.completions);
      }
      configCopy.effects = effects;
    }
    super(configCopy);
    this.challenge = challenge;
  }

  isEffectActive() {
    return this.challenge.completions.gt(0);
  }
}

class ChallengeState extends GameMechanicState {
  constructor(config) {
    super(config);
    this.reward = new ChallengeRewardState(config.reward, this);
  }

  get isRunning() {
    return player.challenges.current === this.id;
  }

  get completions() {
    return player.challenges.completions[this.id - 1];
  }

  set completions(value) {
    player.challenges.completions[this.id - 1] = value;
  }

  get baseGoal() {
    return this.config.baseGoal;
  }

  get goalMult() {
    return this.config.goalMult;
  }

  get goalPow() {
    return this.config.goalPow;
  }

  goalAt(completions) {
    return this.baseGoal.times(this.goalMult.pow(completions.pow(this.goalPow)));
  }

  get goal() {
    return this.goalAt(this.completions);
  }

  get max() {
    return this.config.max();
  }

  get isCapped() {
    return this.completions.gte(this.max);
  }

  start() {
    if (this.isRunning) return;
    if (Challenges.isRunning) {
      Challenges.current.exit();
    }
    this.config.type.reset();
    player.challenges.current = this.id;
  }

  exit() {
    if (!this.isCapped && Currency.mass.value.gte(this.goal)) {
      this.completions = this.pendingCompletions;
    }
    player.challenges.current = 0;
    this.config.type.reset();
  }

  get pendingCompletions() {
    if (this.isCapped) return DC.D0;
    const mass = Currency.mass.value;
    if (mass.lt(this.goal)) return DC.D0;
    return mass.div(this.baseGoal).log(this.goalMult).root(this.goalPow).add(1).floor();
  }

  get isUnlocked() {
    return this.config.isUnlocked();
  }

  get name() {
    return this.config.name;
  }

  get isEffectActive() {
    return this.isRunning;
  }
}

export const Challenge = ChallengeState.createAccessor(GameDatabase.challenges);

export const Challenges = {
  all: Challenge.index.compact(),

  get isUnlocked() {
    return player.records.maxMass.gte(DC.D1_5E136);
  },

  get current() {
    return Challenge(player.challenges.current);
  },

  get isRunning() {
    return player.challenges.current > 0;
  }
};