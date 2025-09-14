<script>
export default {
  name: "FermionBox",
  props: {
    fermion: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isActive: false,
      isUnlocked: false
    };
  },
  computed: {
    name() {
      return this.isUnlocked ? i18n.t(this.fermion.config.key) : "???";
    },
    symbol() {
      return this.isUnlocked ? this.fermion.config.symbol : "?";
    }
  },
  methods: {
    update() {
      this.isActive = this.fermion.isActive;
      this.isUnlocked = this.fermion.isUnlocked;
    }
  }
};
</script>

<template>
  <div
    class="c-fermion-box"
    :class="{ 'c-fermion-box--active': isActive, 'c-fermion-box--locked': !isUnlocked }"
  >
    <div
      class="o-fermion-symbol"
      v-html="symbol"
    />
    <div class="o-fermion-name">
      {{ name }}
    </div>
  </div>
</template>

<style scoped>

</style>