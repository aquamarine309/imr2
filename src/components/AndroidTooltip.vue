<script>
export default {
  name: "AndroidTooltip",
  props: {
    text: {
      type: String,
      required: true
    },
    condition: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  created() {
    this.on$(GAME_EVENT.HIDE_TOOLTIP, () => {
      this.isVisible = false;
    });
  },
  methods: {
    change() {
      if (!this.condition) return;
      const last = this.isVisible;
      EventHub.ui.dispatch(GAME_EVENT.HIDE_TOOLTIP);
      if (last) return;
      this.isVisible = true;
    }
  }
};
</script>

<template>
  <div
    class="c-android-tooltip--container"
    @touchstart.stop="change"
  >
    <Transition name="a-android-tooltip">
      <div
        v-if="isVisible"
        ref="tooltip"
        class="c-android-tooltip"
      >
        {{ text }}
      </div>
    </Transition>
    <slot />
  </div>
</template>