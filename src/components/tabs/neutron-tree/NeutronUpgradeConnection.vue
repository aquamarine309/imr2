<script>
export default {
  name: "NeutronUpgradeConnection",
  props: {
    connection: {
      type: Array,
      required: true
    },
    time: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      isBought: false,
      canBeBought: false
    }
  },
  computed: {
    start() {
      return this.connection[0];
    },
    end() {
      return this.connection[1];
    },
    lineColor() {
      if (this.isBought) return "var(--color-bought)";
      return this.canBeBought ? "white" : "#444444";
    },
    decorationColor() {
      return this.isBought ? "white" : "#888888";
    }
  },
  methods: {
    update() {
      this.isUnlocked = this.end.branchBought;
      if (!this.isUnlocked) return;
      this.isBought = this.end.isBought;
      if (this.isBought) return;
      this.canBeBought = this.end.canBeBought;
    },
    circlePos(index) {
      const p = (this.time / 3000 + index / 3) % 1;
      return {
        cx: `${to(this.start.config.idx, this.end.config.idx, p) * 100}%`,
        cy: to(this.start.config.row, this.end.config.row, p) * 75
      }
    }
  }
}

function to(a, b, r) {
  return a * (1 - r) + b * r;
}
</script>

<template>
  <g v-if="isUnlocked">
    <line
      class="o-neutron-upgrade-line"
      :x1="`${start.config.idx * 100}%`"
      :y1="start.config.row * 75"
      :x2="`${end.config.idx * 100}%`"
      :y2="end.config.row * 75"
      :style="{ stroke: lineColor }"
    />
    <circle
      v-for="i in 3"
      :key="i"
      v-bind="circlePos(i - 1)"
      r="4"
      :fill="decorationColor"
    />
  </g>
</template>

<style scoped>
.o-neutron-upgrade-line {
  stroke-width: 8px;
}
</style>