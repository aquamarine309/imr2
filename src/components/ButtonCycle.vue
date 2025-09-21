<script>
export default {
  name: "ButtonCycle",
  props: {
    i18nKey: {
      type: String,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
  },
  computed: {
    displayText() {
      return i18n.t(this.i18nKey, { value: this.labels[this.value] });
    }
  },
  methods: {
    handleClick() {
      this.emitInput((this.value + 1) % this.labels.length);
    }
  }
};
</script>

<template>
  <button
    v-bind="$attrs"
    @click="handleClick"
  >
    {{ displayText }}
  </button>
</template>

