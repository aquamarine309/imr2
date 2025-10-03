<script>
import RadiationBox from "./RadiationBox";

export default {
  name: "RadiationTab",
  components: {
    RadiationBox
  },
  data() {
    return {
      frequency: new Decimal(),
      frequencyGain: new Decimal(),
      effect: new Decimal(),
      next: null
    };
  },
  computed: {
    types: () => RadiationType.all
  },
  methods: {
    update() {
      this.frequency.copyFrom(Currency.frequency);
      this.frequencyGain.copyFrom(Currency.frequency.gainPerSecond);
      this.effect = Radiation.frequencyEffect;
      const next = RadiationType.all.find(x => !x.isUnlocked);
      this.next = next;
    }
  }
};
</script>

<template>
  <div>
    <i18n
      path="your_frequency"
      tag="div"
    >
      <template #value>
        <span class="o-highlight">
          {{ format(frequency) }} {{ formatGain(frequency, frequencyGain) }}
        </span>
      </template>
      <template #mult>
        <span class="o-highlight">
          {{ formatX(effect) }}
        </span>
      </template>
    </i18n>
    <div v-if="next">
      {{ $t("next_radiation", { value: format(next.requirement), object: next.name }) }}
    </div>
    <div>
      <RadiationBox
        v-for="type in types"
        :key="type.id"
        :radiation="type"
      />
    </div>
  </div>
</template>

<style scoped>

</style>