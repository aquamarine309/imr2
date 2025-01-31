<script>
import ModalWrapperChoice from "./ModalWrapperChoice";

export default {
  name: "TutorialModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    tutorial: {
      type: Object,
      required: true
    }
  },
  computed: {
    styleObject() {
      return {
        "background-image": `url("./images/quotes/${this.tutorial.id}.png")`
      };
    }
  }
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="false"
  >
    <div class="c-tutorial-title">
      Chapter {{ tutorial.id }}: {{ tutorial.name }}
    </div>
    <div
      class="i-modal-tutorial"
      :style="styleObject"
    />
    <div>{{ tutorial.info }}</div>

    <template #confirm-text>
      Let's Go!
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-tutorial-title {
  font-weight: bold;
  font-size: 16px;
}

.i-modal-tutorial {
  width: 135px;
  height: 135px;
  margin: 0 auto;
  background-size: contain;
}
</style>