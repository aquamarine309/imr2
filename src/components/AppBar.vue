<script>
export default {
  name: "AppBar",
  methods: {
    handlerClick() {
      this.$emit("toggle-drawer");
    }
  }
};
</script>

<template>
  <div class="o-app-bar">
    <div
      class="c-nav-button"
      @click="handlerClick"
    >
      <i class="fas fa-navicon" />
    </div>
  </div>
</template>

<style scoped>
.o-app-bar {
  width: 100%;
  height: var(--height-app-bar);
  background-color: var(--color-app-bar);
  text-align: left;
  color: #bbbbbb;
  font-weight: bold;
  font-size: 18px;
  line-height: var(--height-app-bar);
}

.c-nav-button {
  width: 60px;
  height: 100%;
}

.ad-ui .c-nav-button {
  color: white;
}
</style>