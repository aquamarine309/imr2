<script>
let uid = 0;

export default {
  props: {
    imgClass: {
      type: String,
      required: true
    },
    amount: {
      type: Decimal,
      required: true
    },
    gainRate: {
      type: Decimal,
      required: true
    },
    isRate: {
      type: Boolean,
      required: false,
      default: true
    },
    forceText: {
      type: String,
      required: false
    },
    formatFn: {
      type: Function,
      required: false
    },
    textClass: {
      type: String,
      required: false
    },
    tooltip: {
      type: String,
      required: false
    },
    showTooltip: {
      type: Boolean,
      required: false,
      default: false
    },
    name: {
      type: String,
      required: false
    },
    clickFn: {
      type: Function,
      required: false
    },
    isMass: {
      type: Boolean,
      required: false,
      default: false
    },
    showRate: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    view() {
      return this.$viewModel;
    },
    tooltipActive() {
      return this.resID === this.view.resourceTooltipId;
    }
  },
  watch: {
    showTooltip(value) {
      if (value === false) {
        this.view.resourceTooltipId = -1;
      }
    }
  },
  created() {
    this.resID = uid++;
  },
  methods: {
    formatValue(value) {
      if (this.isMass) return formatMass(value);
      if (this.formatFn !== undefined) return this.formatFn(value);
      return format(value);
    },
    handleClick(event) {
      event.preventDefault();
      if (!this.showTooltip && this.clickFn) {
        this.clickFn();
        return;
      }
      if (this.tooltipActive) {
        this.view.resourceTooltipId = -1;
      } else {
        this.view.resourceTooltipId = this.resID;
      }
    }
  }
};
</script>

<template>
  <div class="l-header-resource">
    <div
      class="i-header"
      :class="imgClass"
      @click.stop="handleClick"
    />
    <div
      class="c-header-resource-info"
      :class="textClass"
    >
      <span>{{ formatValue(amount) }}</span>
      <template v-if="showRate">
        <span v-if="isRate">{{ formatGain(amount, gainRate, isMass) }}</span>
        <span v-else-if="forceText">({{ forceText }})</span>
        <span v-else>(+{{ formatValue(gainRate) }})</span>
      </template>
    </div>
    <transition name="a-tooltip">
      <div
        v-if="showTooltip && tooltipActive"
        class="l-header-resource-tooltip"
      >
        <span class="c-header-resource-tooltip__name">[{{ name }}]</span>
        <div class="o-split-line" />
        <b>{{ tooltip }}</b>
      </div>
    </transition>
  </div>
</template>