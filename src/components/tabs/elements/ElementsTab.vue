<script>
import ElementComponent from "./ElementComponent";
import ElementInfo from "./ElementInfo";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "ElementsTab",
  components: {
    ElementComponent,
    ElementInfo,
    PrimaryToggleButton
  },
  data() {
    return {
      selected: 0,
      auto: false,
      autoUnlocked: false
    };
  },
  computed: {
    elements() {
      return GameElements.all;
    },
    names() {
      return this.$t("element_names").split("|");
    },
    symbols() {
      return this.$t("element_symbols").split("|");
    },
  },
  watch: {
    auto(value) {
      Autobuyer.element.isActive = value;
    }
  },
  methods: {
    update() {
      this.autoUnlocked = Autobuyer.element.isUnlocked;
      this.auto = Autobuyer.element.isActive;
    },
    handleClick(id) {
      this.selected = id;
    }
  }
};
</script>

<template>
  <div>
    <div>
      <PrimaryToggleButton
        v-if="autoUnlocked"
        v-model="auto"
        i18n-key="auto_X"
      />
    </div>
    <ElementInfo
      :element="elements[selected - 1]"
      :name="names[selected - 1]"
    />
    <div class="l-element-table-container">
      <ElementComponent
        v-for="(element, idx) in elements"
        :key="element.id"
        :element="element"
        :name="symbols[idx]"
        @click.native="handleClick(element.id)"
      />
    </div>
  </div>
</template>