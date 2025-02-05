<script>
import ElementComponent from "./ElementComponent";
import ElementInfo from "./ElementInfo";

export default {
  name: "ElementsTab",
  components: {
    ElementComponent,
    ElementInfo
  },
  data() {
    return {
      selected: 0
    };
  },
  computed: {
    elements() {
      return GameElements.all;
    }
  },
  methods: {
    handleClick(id) {
      this.selected = id;
    }
  }
};
</script>

<template>
  <div>
    <ElementInfo :element="elements[selected - 1]" />
    <div class="l-element-table-container">
      <ElementComponent
        v-for="element in elements"
        :key="element.id"
        :element="element"
        @click.native="handleClick(element.id)"
      />
    </div>
  </div>
</template>