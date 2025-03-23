<script>
import MainUpgradesTab from "./MainUpgradesTab";

export default {
  name: "AtomUpgradesTab",
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
      return AtomUpgrade.index;
    },
    autobuyer() {
      return Autobuyer.atomUpgrade;
    }
  },
  methods: {
    update() {
      this.currencyAmount = format(Currency.atoms.value, 0);
    }
  }
};
</script>

<template>
  <MainUpgradesTab
    :upgrades="upgrades"
    name="Atom Upgrades"
    :currency-amount="currencyAmount"
    currency-name="Atoms"
    :autobuyer="autobuyer"
  />
</template>