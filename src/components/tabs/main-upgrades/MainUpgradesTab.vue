<script>
import MainUpgradeButton from "./MainUpgradeButton";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";
import CostDisplay from "@/components/CostDisplay";

export default {
  name: "MainUpgradesTab",
  components: {
    MainUpgradeButton,
    DescriptionDisplay,
    EffectDisplay,
    CostDisplay
  },
  props: {
    upgrades: {
      type: Array,
      required: true
    },
    currencyAmount: {
      type: String,
      required: true
    },
    currencyName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedID: -1
    };
  },
  computed: {
    config() {
      return this.upgrades[this.selectedID].config;
    }
  }
};
</script>

<template>
  <div @click="selectedID = -1">
    <div
      v-if="selectedID !== -1"
      class="l-main-upgrade-header"
    >
      <DescriptionDisplay
        class="c-sky"
        :config="config"
      />
      <CostDisplay
        :config="config"
        :name="currencyName"
      />
      <EffectDisplay
        :config="config"
        class="c-green"
      />
    </div>
    <div class="c-main-upgrade-name">
      {{ name }}
    </div>
    <div class="c-main-upgrade-currency">
      You have {{ currencyAmount }} {{ currencyName }}.
    </div>
    <div class="l-main-upgrade-container">
      <MainUpgradeButton
        v-for="(upgrade, index) in upgrades"
        :key="upgrade.id"
        :upgrade="upgrade"
        :index="index"
        @click.native.stop="selectedID = upgrade.id"
      />
    </div>
  </div>
</template>

<style>
.c-main-upgrade-name {
  font-weight: bold;
  margin-top: 20px;
}

.c-main-upgrade-currency {
  font-size: 11px;
  margin: 5px 0;
}

.l-main-upgrade-container {
  --size-btn: 35px;
  --row-amount: 5;
  --margin-btn: 3px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  display: flex;
  width: calc((var(--size-btn) + var(--margin-btn) * 2) * var(--row-amount));
  justify-content: flex-start;
  flex-wrap: wrap;
}

.l-main-upgrade-header {
  font-size: 12px;
  line-height: 15px;
  margin: 15px 0;
  border-top: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
  padding: 5px;
  min-height: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>