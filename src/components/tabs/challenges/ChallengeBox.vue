<script>
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ChallengeBox",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    PrimaryButton
  },
  props: {
    challenge: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      completions: new Decimal(),
      isRunning: false,
      max: new Decimal(),
      goal: new Decimal(),
      pendingCompletions: new Decimal(),
      isUnlocked: false,
      isCapped: false
    };
  },
  computed: {
    config() {
      return this.challenge.config;
    },
    reward() {
      return this.challenge.reward.config;
    },
    name() {
      return `${this.challenge.name} (${format(this.completions, 0)} / ${format(this.max, 0)})`;
    },
    resetType() {
      return this.config.type.name;
    },
    buttonText() {
      if (this.isRunning) {
        if (this.pendingCompletions.gt(0)) {
          return `+${format(this.pendingCompletions.minus(this.completions), 0)} times`;
        }
        return "Exit";
      }
      return "Enter Challenge";
    },
    nameClass() {
      return {
        "c-challenge-name": true,
        "c-challenge-name--small": this.name.length > 30
      };
    },
    goalText() {
      return this.config.type.formatGoal(this.goal);
    },
    milestones() {
      return this.challenge.milestones;
    },
    imgClass() {
      return {
        "c-challenge-image": true,
        "c-challenge-image--completed": this.isCapped,
        "c-challenge-image--running": this.isRunning
      };
    }
  },
  methods: {
    update() {
      const challenge = this.challenge;
      this.isUnlocked = challenge.isUnlocked;
      if (!this.isUnlocked) return;
      this.goal = challenge.goal;
      this.max = challenge.max;
      this.isRunning = challenge.isRunning;
      this.completions.copyFrom(challenge.completions);
      this.isCapped = challenge.isCapped;
      if (!this.isRunning) return;
      this.pendingCompletions = challenge.pendingCompletions;
    },
    enter() {
      if (this.isRunning) {
        this.challenge.exit();
      } else {
        this.challenge.start();
      }
    },
    restart() {
      this.challenge.exit();
      this.challenge.start();
    }
  }
};
</script>

<template>
  <div
    v-if="isUnlocked"
    class="o-challenge-box"
  >
    <div class="o-challenge-image-and-title-row">
      <img
        :src="`./images/challenges/${challenge.id}.png`"
        :class="imgClass"
      >
      <div class="c-challenge-info">
        <div :class="nameClass">
          {{ name }}
        </div>
        <div class="o-challenge-buttons">
          <PrimaryButton @click="enter">
            {{ buttonText }}
          </PrimaryButton>
          <PrimaryButton
            v-if="isRunning"
            @click="restart"
          >
            Restart
          </PrimaryButton>
        </div>
      </div>
    </div>
    <div>
      <DescriptionDisplay
        class="c-challenge-description"
        :config="config"
      />
      <br>
      <span class="c-challenge-description">Entering challenge will force {{ resetType }} reset.</span>
      <br>
      <span>Goal: {{ goalText }}</span>
      <br>
      <EffectDisplay
        class="c-challenge-effect"
        :config="config"
      />
      <DescriptionDisplay
        class="c-green"
        :config="reward"
        title="Reward:"
        br
      />
      <EffectDisplay
        class="c-green"
        :config="reward"
        br
      />
      <div
        v-for="(milestone, index) in milestones"
        :key="index"
      >
        <DescriptionDisplay
          class="c-yellow"
          :config="milestone.config"
          br
        />
        <EffectDisplay
          class="c-yellow"
          :config="milestone.config"
          br
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.o-challenge-box {
  display: flex;
  width: 100%;
  padding: 5px 10px;
  flex-direction: column;
  padding: 5px;
  border: 1px solid white;
  margin: 5px;
  background: linear-gradient(305deg, #232225, #1e1d1f, #111111);
}

.c-challenge-image--running {
  background-color: #444444;
}

.c-challenge-image--completed {
  background-color: #00520b;
}

.o-challenge-image-and-title-row {
  display: flex;
  width: 100%;
  height: 80px;
}

.c-challenge-image {
  width: 70px;
  height: 70px;
}

.c-challenge-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 3px 8px;
}

.c-challenge-name {
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 3px black;
}

.c-challenge-name--small {
  font-size: 15px;
}

.c-challenge-description {
  color: red;
}

.o-challenge-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.o-challenge-buttons .o-primary-btn {
  flex: 1;
  margin: 0 5px;
  padding: 8px 0;
}
</style>