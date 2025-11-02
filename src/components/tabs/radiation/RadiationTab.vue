<script>
import RadiationBox from "./RadiationBox";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "RadiationTab",
  components: {
    RadiationBox,
    PrimaryToggleButton
  },
  data() {
    return {
      frequency: new Decimal(),
      frequencyGain: new Decimal(),
      effect: new Decimal(),
      next: null,
      autoUnlocked: false,
      auto: false
    };
  },
  computed: {
    types: () => RadiationType.all
  },
  watch: {
    auto(value) {
      Autobuyer.radiation.isActive = value;
    }
  },
  methods: {
    update() {
      this.frequency.copyFrom(Currency.frequency.value);
      this.frequencyGain.copyFrom(Currency.frequency.gainedAmount);
      this.effect = Radiation.frequencyEffect;
      const next = RadiationType.all.find(x => !x.isUnlocked);
      this.next = next;
      this.autoUnlocked = Autobuyer.radiation.isUnlocked;
      this.auto = Autobuyer.radiation.isActive;
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
    <div v-if="autoUnlocked">
      <PrimaryToggleButton
        v-model="auto"
        i18n-key="auto_X"
      />
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