<script>
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";
import CostDisplay from "@/components/CostDisplay";

export default {
  name: "ElementInfo",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    CostDisplay
  },
  props: {
    element: {
      type: Object,
      required: false
    }
  },
  computed: {
    config() {
      return this.element.config;
    },
    name() {
      return this.config.fullName ?? this.config.name;
    }
  }
};
</script>

<template>
  <div class="c-element-info-container">
    <div
      v-if="element"
      class="c-element-info"
    >
      <span class="c-sky">
        <span>[{{ name }}]</span>
        <DescriptionDisplay
          :config="config"
        />
      </span>
      <CostDisplay
        :config="config"
        name="Quarks"
      />
      <EffectDisplay
        class="c-green"
        :config="config"
      />
    </div>
    <div v-else>
      Click an element to show info
    </div>
  </div>
</template>

<style scoped>
.c-element-info {
  font-size: 11px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 0;
  min-height: 70px;
  border-top: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
}

.c-element-info-container {
  margin: 15px 0;
}
</style>