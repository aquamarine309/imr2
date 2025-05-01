<script>
export default {
  name: "FermionInfo",
  components: {
    
  },
  props: {
    selected: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      tier: new Decimal()
    }
  },
  computed: {
    fermion() {
      return Fermions.all[this.selected];
    },
    notSelected() {
      return this.selected === -1;
    }
  },
  methods: {
    update() {
      if (this.notSelected) return;
      const fermion = this.fermion;
      this.tier.copyFrom(fermion.tier);
    }
  }
}
</script>

<template>
  <div class="l-fermion-info">
    <template v-if="notSelected">
      <div>Click the Fermion to show infomation</div>
    </template>
    <template v-else>
      <div>Tier {{ format(tier, 0) }}</div>
    </template>
  </div>
</template>

<style scoped>

</style>