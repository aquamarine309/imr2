<script>
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "MassUpgradeRow",
  components: {
    PrimaryButton,
    PrimaryToggleButton
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: "",
      isUnlocked: false,
      amount: new Decimal(),
      free: new Decimal(),
      isAffordable: false,
      cost: new Decimal(),
      powerText: "",
      effectText: "",
      softcapLevel: 0,
      autoUnlocked: false,
      auto: false,
      forceVisible: false,
      isDisabled: false
    };
  },
  computed: {
    imageClass() {
      return [
        "i-upgrade",
        this.upgrade.config.upgClass
      ];
    },
    amountText() {
      if (this.free.eq(0)) return format(this.amount, 0);
      if (this.amount.eq(0)) return format(this.free, 0);
      return `${format(this.amount, 0)} + ${format(this.free, 0)}`;
    },
    costText() {
      if (!this.isUnlocked) return "Locked";
      if (this.isDisabled) return "Disabled";
      const currency = this.upgrade.currency;
      let cost;
      if (currency === Currency.mass) cost = formatMass(this.cost);
      else cost = `${format(this.cost, 0)} ${currency.name}`;
      if (this.autoUnlocked) return cost;
      return `Cost: ${cost}`;
    },
    nameClass() {
      return this.name.length >= 10 ? "c-mass-upgrade-name--small" : "";
    }
  },
  watch: {
    auto(value) {
      // eslint-disable-next-line vue/no-mutating-props
      this.upgrade.auto.isActive = value;
    }
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.isUnlocked = upgrade.isUnlocked;
      this.isDisabled = upgrade.isDisabled;
      if (this.isUnlocked) {
        this.isAffordable = upgrade.isAffordable;
        this.cost = upgrade.cost;
      } else {
        this.forceVisible = upgrade.forceVisible;
        if (!this.forceVisible) return;
      }
      this.name = upgrade.name;
      this.amount.copyFrom(upgrade.boughtAmount);
      this.free.copyFrom(upgrade.freeAmount);
      this.powerText = upgrade.config.formatPower(upgrade.power);
      const effect = upgrade.effectValue;
      this.effectText = upgrade.config.formatEffect(effect);
      this.softcapLevel = upgrade.softcapLevel;
      this.autoUnlocked = upgrade.autoUnlocked;
      this.auto = this.upgrade.auto?.isActive;
    },
    buy() {
      if (!this.isUnlocked) return;
      this.upgrade.purchase();
    },
    max() {
      if (!this.isUnlocked) return;
      this.upgrade.buyMax();
    }
  }
};
</script>

<template>
  <div
    v-if="isUnlocked || forceVisible"
    class="l-mass-upgrade-container"
  >
    <div class="l-mass-upgrade-row">
      <div class="c-mass-name">
        <div :class="imageClass" />
        <div class="c-mass-upgrade-name-amount">
          <div :class="nameClass">
            {{ name }}
          </div>
          <div class="o-amount">
            [{{ amountText }}]
          </div>
        </div>
      </div>
      <PrimaryButton
        class="o-buy-mass-upgrade-btn o-buy-mass-upgrade-btn--main"
        :enabled="isAffordable && !isDisabled"
        @click="buy"
      >
        {{ costText }}
      </PrimaryButton>
      <PrimaryButton
        class="o-buy-mass-upgrade-btn"
        @click="max"
      >
        Buy Max
      </PrimaryButton>
      <PrimaryToggleButton
        v-if="autoUnlocked"
        v-model="auto"
        class="o-buy-mass-upgrade-btn o-buy-mass-upgrade-btn--auto"
        @click="max"
      />
    </div>
    <div class="l-mass-upgrade-row--text">
      Power: {{ powerText }}
    </div>
    <div class="l-mass-upgrade-row--text">
      Effect: {{ effectText }}
      <span
        v-if="softcapLevel > 0"
        class="o-softcapped"
      >
        (softcapped{{
          softcapLevel === 1
            ? "" : `^${format(softcapLevel, 0)}`
        }})
      </span>
    </div>
  </div>
</template>

<style>
.o-amount {
  font-size: 11px;
}

.o-buy-mass-upgrade-btn--auto {
  padding-left: 8px;
  padding-right: 8px;
}
</style>