<script>
import C16Particle from "./C16Particle";

export default {
  name: "C16Background",
  components: {
    C16Particle
  },
  data() {
    return {
      isActive: false,
      endTick: Infinity,
      time: 0,
      width: 0
    };
  },
  computed: {
    count: () => 50,
    endTickCount: () => 100
  },
  created() {
    this.width = window.innerWidth;
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
    });
  },
  methods: {
    update() {
      this.isActive = C16.isActive;
      if (this.isActive || this.endTick < this.endTickCount) {
        this.time = Date.now();
      }
      if (!this.isActive) {
        this.endTick++;
        return;
      }
      this.endTick = 0;
    }
  }
};
</script>

<template>
  <svg
    v-if="isActive || endTick < endTickCount"
    :width="width"
    height="100%"
    class="c16-particle-bg"
  >
    <C16Particle
      v-for="index in count"
      :key="index"
      :width="width"
      :now="time"
      :is-end="!isActive"
    />
  </svg>
</template>

<style scoped>
.c16-particle-bg {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
</style>