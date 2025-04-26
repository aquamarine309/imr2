<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "PrimaryToggleButton",
  components: {
    PrimaryButton
  },
  props: {
    i18nKey: {
      type: String,
      required: false,
      default: ""
    },
    on: {
      type: String,
      required: false,
      default: "on"
    },
    off: {
      type: String,
      required: false,
      default: "off"
    },
    value: {
      type: Boolean,
      required: true
    },
  },
  computed: {
    displayText() {
      const state = this.$t(this.value ? this.on : this.off);
      if (this.i18nKey === "") return state;
      return this.$t(this.i18nKey, { state });
    }
  },
};
</script>

<template>
  <PrimaryButton
    v-bind="$attrs"
    @click="emitInput(!value)"
  >
    {{ displayText }}
  </PrimaryButton>
</template>

