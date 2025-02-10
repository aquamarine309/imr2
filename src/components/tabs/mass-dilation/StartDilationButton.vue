<script>
export default {
  name: "StartDilationButton",
  data() {
    return {
      isActive: false,
      requirement: new Decimal(),
      canGain: false,
      gain: new Decimal()
    };
  },
  computed: {
    text() {
      if (this.isActive) {
        if (this.canGain) {
          return `Cancel for ${format(this.gain, 0)} Relativistic particles`;
        }
        return `Reach ${formatMass(this.requirement)} to gain Relativistic particles, or cancel dilation`;
      }
      return "Dilate Mass";
    }
  },
  methods: {
    update() {
      this.isActive = MassDilation.isActive;
      this.requirement = MassDilation.requirement;
      this.canGain = Currency.mass.gte(this.requirement);
      this.gain = MassDilation.particleGain;
    },
    start() {
      MassDilation.toggle();
    }
  }
};
</script>

<template>
  <button
    class="o-start-dilation-btn"
    @click="start"
  >
    {{ text }}
  </button>
</template>

<style scoped>
.o-start-dilation-btn {
  border: 1px solid darkgreen;
  box-shadow: 0 0 5px 1px green inset;
  width: 180px;
  height: 100px;
  background-color: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 10px auto;
  font-family: BlobFont;
  padding: 5px;
}
</style>