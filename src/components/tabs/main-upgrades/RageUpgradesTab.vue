<script>
import MainUpgradesTab from "./MainUpgradesTab";

export default {
  name: "RageUpgradesTab",
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
      return RageUpgrade.index;
    },
    autobuyer() {
      return Autobuyer.rageUpgrade;
    }
  },
  methods: {
    update() {
      this.currencyAmount = format(Currency.ragePowers.value, 0);
    }
  }
};
</script>

<template>
  <MainUpgradesTab
    :upgrades="upgrades"
    name="Rage Upgrades"
    :currency-amount="currencyAmount"
    currency-name="Rage Power"
    :autobuyer="autobuyer"
  />
</template>