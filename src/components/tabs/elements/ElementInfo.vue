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
  <div>
    <div
      v-if="element"
      class="c-element-info"
    >
      <div class="c-sky">
        <span>[{{ name }}]</span>
        <DescriptionDisplay
          :config="config"
        />
      </div>
      <div>
        <CostDisplay
          :config="config"
          name="Quarks"
        />
      </div>
      <div>
        <EffectDisplay
          class="c-green"
          :config="config"
        />
      </div>
    </div>
    <div v-else>
      Click an element to show info
    </div>
  </div>
</template>

<style scoped>
.c-element-info {
  font-size: 11px;
}
</style>