<script>
export default {
  name: "FermionBox",
  components: {

  },
  props: {
    fermion: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isAvtive: false
    };
  },
  computed: {
    name() {
      return i18n.t(this.fermion.config.key);
    },
    symbol() {
      return this.fermion.config.symbol;
    }
  },
  methods: {
    update() {
      this.isActive = this.fermion.isActive;
    }
  }
};
</script>

<template>
  <div class="c-fermion-box">
    <div
      class="o-fermion-symbol"
      v-html="symbol"
    />
    <div class="o-fermion-name">{{ name }}</div>
  </div>
</template>

<style scoped>

</style>