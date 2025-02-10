<script>
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";
import CostDisplay from "@/components/CostDisplay";

export default {
  name: "DilationUpgradeButton",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    CostDisplay
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      level: new Decimal(),
      canBeBought: false,
      isUnlocked: false,
      time: 0
    };
  },
  computed: {
    config() {
      return this.upgrade.config;
    },
    classObject() {
      return {
        "o-dilation-upgrade-btn": true,
        "o-dilation-upgrade-btn--available": this.canBeBought
      };
    },
    max() {
      return this.upgrade.max;
    },
    isSingle() {
      return this.max.eq(1);
    },
    isCapped() {
      return this.level.gte(this.max);
    },
    levelText() {
      const level = format(this.level, 0);
      if (this.max.isFinite()) return `${level} / ${format(this.max, 0)}`;
      return level;
    },
    estimateTime() {
      if (Number.isFinite(this.time)) return `In ${TimeSpan.fromSeconds(this.time).toStringShort()}`;
      return "Never Affordable";
    }
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.isUnlocked = upgrade.isUnlocked;
      if (!this.isUnlocked) return;
      this.level.copyFrom(upgrade.boughtAmount);
      this.canBeBought = upgrade.canBeBought;
      if (!this.canBeBought) {
        this.time = this.upgrade.cost.minus(Currency.dilatedMass.value)
          .div(Currency.dilatedMass.gainPerSecond).toNumber();
      }
    },
    purchase() {
      this.upgrade.buyMax();
    }
  }
};
</script>

<template>
  <button
    v-if="isUnlocked"
    :class="classObject"
    @click="purchase"
  >
    <span v-if="!isSingle">[Level {{ levelText }}]</span>
    <DescriptionDisplay :config="config" />
    <EffectDisplay :config="config" />
    <template v-if="!isCapped">
      <br>
      <CostDisplay
        :config="config"
        name="Dilated Mass"
      />
      <span v-if="!canBeBought">({{ estimateTime }})</span>
    </template>
  </button>
</template>

<style scoped>
.o-dilation-upgrade-btn {
  border: 1px solid white;
  height: 100px;
  background-color: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  margin: 3px;
  font-family: BlobFont;
  font-size: 10px;
  padding: 5px;
}

.o-dilation-upgrade-btn--available {
  border-color: var(--color-dilation);
  background-color: black;
  box-shadow: 0 0 5px var(--color-dilation) inset;
}
</style>