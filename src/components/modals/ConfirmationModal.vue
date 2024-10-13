<script>
import ModalWrapperChoice from "./ModalWrapperChoice";

export default {
  name: "TutorialModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    confirmFn: {
      type: Function,
      required: true
    },
    options: {
      type: String,
      required: true
    }
  },
  methods: {
    confirm() {
      this.confirmFn();
      EventHub.ui.offAll(this);
    }
  }
};
</script>

<template>
  <ModalWrapperChoice
    :options="options"
    @confirm="confirm"
  >
    <div class="c-tutorial-title">
      Are you sure you want to reset?
    </div>
  </ModalWrapperChoice>
</template>

<style>
.c-reset-title {
  font-weight: bold;
  font-size: 16px;
}
</style>