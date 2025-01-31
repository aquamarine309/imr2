import { GameMechanicState } from "./game-mechanics";
import { deepmergeAll } from "@/utility/deepmerge";
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

class ChallengeMilestoneState extends GameMechanicState {
  constructor(config, challenge) {
    super(config);
    this.challenge = challenge;
  }

  isEffectActive() {
    return this.challenge.completions.gte(this.requirement);
  }

  get requirement() {
    return this.config.requirement;
  }
}

class ChallengeState extends GameMechanicState {
  constructor(config) {
    super(config);
    this.reward = new ChallengeRewardState(config.reward, this);
    this.milestones = mapGameData(
      config.milestones || [],
      milestoneConfig => new ChallengeMilestoneState(milestoneConfig, this)
    );
    this.registerEvents(this.type.event, () => this.reset());
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

  get scaleStart() {
    return DC.D75;
  }

  get currency() {
    return this.type.currency();
  }

  goalAt(completions) {
    // When completions are equal to scale start, these two formula returns the same value.
    // this.pendingCompletions requires to use this method to get minimum goal after scaling.
    // Due to reduce code, I change the "gte" into "gt" so that make sure the below formula can be applied.
    if (completions.gt(this.scaleStart)) {
      const exp = DC.D3;
      return this.baseGoal.times(this.goalMult.pow(
        completions.pow(exp).div(this.scaleStart.pow(exp.minus(1)))
          .pow(this.goalPow)));
    }
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
    if (!this.isCapped && this.currency.gte(this.goal)) {
      this.completions = this.pendingCompletions;
    }
    player.challenges.current = 0;
    this.config.type.reset();
  }

  reset() {
    if (this.noReset) return;
    this.completions = DC.D0;
  }

  get pendingCompletions() {
    if (this.isCapped) return DC.D0;
    const mass = this.currency;
    if (mass.lt(this.goal)) return DC.D0;
    const goalStart = this.goalAt(this.scaleStart);
    if (mass.gte(goalStart)) {
      const exp = DC.D3;
      return mass.div(this.baseGoal).log(this.goalMult).root(this.goalPow)
        .times(this.scaleStart.pow(exp.minus(1))).root(exp).add(1).floor().clampMax(this.max);
    }
    return mass.div(this.baseGoal).log(this.goalMult).root(this.goalPow).add(1).floor().clampMax(this.max);
  }

  get isUnlocked() {
    return this.config.isUnlocked();
  }

  get name() {
    const name = this.config.name;
    if (this.completions.gte(this.scaleStart)) {
      return `Hardened ${name}`;
    }
    return name;
  }

  get isEffectActive() {
    return this.isRunning;
  }

  get type() {
    return this.config.type;
  }

  get noReset() {
    return this.config.noReset();
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