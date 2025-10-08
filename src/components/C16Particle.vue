<script>
export default {
  name: "C16Particle",
  props: {
    now: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    isEnd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isActive: false,
      posX: 0,
      posY: "",
      speed: 0,
      size: 0,
      time: 0,
      color: ""
    };
  },
  mounted() {
    this.updatePos();
  },
  methods: {
    update() {
      const dt = this.now - this.time;
      if (this.isEnd && this.size > 0) {
        this.speed += this.width * dt / 1000;
        this.size -= dt * 0.01;
      }
      this.time += dt;
      this.posX += this.speed * dt / 1000;
      if (this.posX > this.width && !this.isEnd) {
        this.updatePos();
      }
    },
    updatePos() {
      this.posY = `${Math.random() * 100}%`;
      this.speed = (Math.random() * 0.1 + 0.3) * this.width;
      this.posX = -this.width * Math.random() - 10;
      this.size = Math.random() * 10 + 10;
      this.time = this.now;
      this.color = ["var(--color-accent)", "#dd3333", "#3333dd"].randomElement();
    }
  }
};
</script>

<template>
  <rect
    :x="posX"
    :y="posY"
    :width="size"
    :height="size"
    :fill="color"
  />
</template>

<style scoped>

</style>