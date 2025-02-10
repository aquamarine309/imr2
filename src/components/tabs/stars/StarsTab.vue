<script>
import UnlockGeneratorButton from "./UnlockGeneratorButton";
import StarIcon from "./StarIcon";

export default {
  name: "StarsTab",
  components: {
    UnlockGeneratorButton,
    StarIcon
  },
  data() {
    return {
      stars: new Decimal(),
      requirement: new Decimal(),
      gain: new Decimal(),
      boost: new Decimal()
    };
  },
  computed: {
    generators() {
      return StarGenerators.all;
    }
  },
  methods: {
    update() {
      this.stars.copyFrom(Currency.stars.value);
      this.gain.copyFrom(Currency.stars.gainPerSecond);
      this.requirement = Supernova.requirement;
      this.boost = Stars.boost;
    }
  }
};
</script>

<template>
  <div>
    <div>You collapsed <span class="o-highlight">{{ format(stars, 2) }} / {{ format(requirement, 2) }} {{ formatGain(stars, gain) }}</span> stars, which multiplies mass gain based on all rank types.</div>
    <br>
    <div class="c-green">
      Currently: {{ formatX(boost) }}
    </div>
    <br>
    <div>
      <UnlockGeneratorButton />
    </div>
    <div class="l-stars-container">
      <StarIcon
        v-for="generator in generators"
        :key="generator.tier"
        :generator="generator"
      />
    </div>
  </div>
</template>

<style scoped>
.l-stars-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 1fr);
  margin-top: 10px;
}
</style>