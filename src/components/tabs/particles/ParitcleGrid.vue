<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ParitcleGrid",
  components: {
    PrimaryButton
  },
  props: {
    particle: {
      type: Object,
      required: true
    },
    textClass: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      amount: new Decimal(),
      power: new Decimal(),
      gain: new Decimal(),
      effect: "",
      canAssign: false
    };
  },
  computed: {
    nameKey() {
      return this.particle.config.key;
    }
  },
  methods: {
    update() {
      const particle = this.particle;
      this.amount.copyFrom(particle.amount);
      this.power.copyFrom(particle.power);
      this.gain = particle.gainPerSecond;
      this.effect = particle.config.effect();
      this.canAssign = !Challenge(9).isRunning;
    },
    assign() {
      this.particle.assign();
    }
  }
};
</script>

<template>
  <div class="o-particle-grid">
    <div>
      <PrimaryButton
        :enabled="canAssign"
        @click="assign"
      >
        {{ $t("assign") }}
      </PrimaryButton>
    </div>
    <br>
    <h3 :class="textClass">
      {{ format(amount, 0) }} {{ $tc(nameKey, checkSingle(amount)) }}
    </h3>
    <div :class="textClass">
      Which generates {{ format(gain) }}  {{ $tc(nameKey, 1) }} Powers per second.
      <br>
      You have {{ format(power) }} {{ formatGain(power, gain) }} {{ $tc(nameKey, 1) }} Powers, which:
    </div>
    <div>
      {{ effect }}
    </div>
  </div>
</template>

<style scoped>
.o-particle-grid {
  width: 30%;
}
</style>