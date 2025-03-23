<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "UnlockGeneratorButton",
  components: {
    PrimaryButton
  },
  data() {
    return {
      isUnlocked: false,
      base: new Decimal(),
      mult: new Decimal(),
      cost: new Decimal(),
      isAffordable: false
    };
  },
  methods: {
    update() {
      this.isUnlocked = StarBoosts.isUnlocked;
      if (!this.isUnlocked) return;
      this.mult = StarBoosts.effect;
      this.base = StarBoosts.base;
      this.cost = StarBoosts.cost;
      this.isAffordable = StarBoosts.isAffordable;
    },
    purchase() {
      StarBoosts.purchase();
    }
  }
};
</script>

<template>
  <PrimaryButton
    v-if="isUnlocked"
    :enabled="isAffordable"
    class="o-boost-star-btn"
    @click="purchase"
  >
    Boost all-Star resources gain, require {{ format(cost) }} Quark
    <br>
    Base: {{ formatX(base) }}
    <br>
    Currently: {{ formatX(mult) }}
  </PrimaryButton>
</template>

<style scoped>
.o-boost-star-btn {
  width: 225px;
  padding: 5px;
}
</style>