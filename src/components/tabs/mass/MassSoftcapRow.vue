<script>
export default {
  name: "MassSoftcapRow",
  props: {
    softcap: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      start: new Decimal()
    };
  },
  computed: {
    level() {
      return this.softcap.id + 1;
    }
  },
  methods: {
    update() {
      this.isUnlocked = this.softcap.isEffectActive;
      if (!this.isUnlocked) return;
      this.start = this.softcap.mass;
    }
  }
};
</script>

<template>
  <div
    v-if="isUnlocked"
    class="c-mass-softcap-row"
  >
    After {{ format(start) }} of mass gain, mass gain will be softcapped{{ level === 1 ? "" : `^${level}` }}!
  </div>
</template>

<style>
.c-mass-softcap-row {
  font-size: 14px;
}

.c-mass-softcap-row:first-child {
  color: red;
}
</style>