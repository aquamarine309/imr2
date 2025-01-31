<script>
export default {
  name: "TabButton",
  props: {
    tab: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isAvailable: false,
      isActive: false
    };
  },
  computed: {
    name() {
      return (this.tab.letter ?? this.tab.shortName).toUpperCase();
    },
    tabClass() {
      return {
        "c-bottom-tab": true,
        "c-bottom-tab--active": this.isActive
      };
    }
  },
  methods: {
    update() {
      const tab = this.tab;
      this.isAvailable = tab.isAvailable && !tab.isHidden;
      this.isActive = tab.isOpen;
    },
    show() {
      this.tab.show(true);
    }
  }
};
</script>

<template>
  <div
    v-if="isAvailable"
    :class="tabClass"
    @click="show()"
  >
    {{ name }}
  </div>
</template>

<style scoped>
.c-bottom-tab {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 13px;
  transition-duration: 0.2s;
}

.c-bottom-tab--active {
  color: white;
  border-bottom: 2px solid #d81b60;
}
</style>