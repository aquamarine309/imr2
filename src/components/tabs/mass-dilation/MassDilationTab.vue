<script>
import StartDilationButton from "./StartDilationButton";
import DilationUpgradeButton from "./DilationUpgradeButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "MassDilationTab",
  components: {
    StartDilationButton,
    DilationUpgradeButton,
    PrimaryToggleButton
  },
  data() {
    return {
      particles: new Decimal(),
      mass: new Decimal(),
      gain: new Decimal(),
      boost: new Decimal(),
      autoUnlocked: false,
      auto: false
    }
  },
  computed: {
    upgrades() {
      return DilationUpgrade.all;
    },
    boostText() {
      if (this.boost.lt(11)) return formatPercents(this.boost.minus(1));
      return formatX(this.boost);
    }
  },
  watch: {
    auto(value) {
      Autobuyer.dilationUpgrade.isActive = value;
    }
  },
  methods: {
    update() {
      this.particles.copyFrom(Currency.relativisticParticles.value);
      this.mass.copyFrom(Currency.dilatedMass.value);
      this.gain = Currency.dilatedMass.gainPerSecond;
      this.boost = MassDilation.boost;
      this.autoUnlocked = Autobuyer.dilationUpgrade.isUnlocked;
      this.auto = Autobuyer.dilationUpgrade.isActive;
    }
  }
}
</script>

<template>
  <div>
    <div><StartDilationButton /></div>
    <div>You have <span class="o-highlight">{{ format(particles, 0) }}</span> Relativistic Particles.</div>
    <div>
      You have <span class="o-highlight">{{ formatMass(mass) }} {{ formatGain(mass, gain, true) }}</span> of dilated mass,
      which makes Tickspeed <span class="o-highlight">{{ boostText }}</span> stronger.
    </div>
    <div>
      <PrimaryToggleButton
        v-if="autoUnlocked"
        v-model="auto"
        label="Auto:"
      />
    </div>
    <div class="l-dilation-upgrade-container">
      <DilationUpgradeButton
        v-for="upgrade in upgrades"
        :key="upgrade.id"
        :upgrade="upgrade"
      />
    </div>
  </div>
</template>

<style scoped>
.l-dilation-upgrade-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 1fr);
}

.ad-ui .o-highlight {
  color: var(--color-dilation);
  font-weight: bold;
}
</style>