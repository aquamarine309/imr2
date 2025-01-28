<script>
import MainUpgradesTab from "./MainUpgradesTab";

export default {
  name: "BHUpgradesTab",
  components: {
    MainUpgradesTab
  },
  data() {
    return {
      currencyAmount: ""
    };
  },
  computed: {
    upgrades() {
      return BHUpgrade.index;
    }
  },
  methods: {
    update() {
      this.currencyAmount = format(Currency.darkMatter.value, 0);
    }
  }
};
</script>

<template>
  <MainUpgradesTab
    :upgrades="upgrades"
    name="Black Hole Upgrades"
    :currency-amount="currencyAmount"
    currency-name="Dark Matter"
  />
</template>