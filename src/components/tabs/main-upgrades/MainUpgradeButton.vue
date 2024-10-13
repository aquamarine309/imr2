<script>
export default {
  name: "MainUpgradeButton",
  props: {
    upgrade: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isAffordable: false,
      isBought: false
    };
  },
  computed: {
    config() {
      return this.upgrade.config;
    },
    buttonStyle() {
      return {
        "background-image": `url("${this.upgrade.url}")`
      };
    },
    buttonClass() {
      if (this.isBought) return "c-main-upgrade-btn--bought";
      if (this.isAffordable) return "c-main-upgrade-btn--available";
      return "";
    }
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.isAffordable = upgrade.isAffordable;
      this.isBought = upgrade.isBought;
    },
    purchase() {
      this.upgrade.purchase();
    }
  }
};
</script>

<template>
  <Button
    class="c-main-upgrade-btn"
    :class="buttonClass"
    :style="buttonStyle"
    @click="purchase"
  />
</template>

<style>
.c-main-upgrade-btn {
  width: var(--size-btn);
  height: var(--size-btn);
  border: none;
  background-size: contain;
  background-color: #171717;
  margin: 3px;
}

.c-main-upgrade-btn--available {
  background-color: #444444;
}

.c-main-upgrade-btn--bought {
  background-color: #00520b;
}
</style>