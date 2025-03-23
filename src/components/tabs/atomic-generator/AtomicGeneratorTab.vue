<script>
import MassUpgradeRow from "@/components/MassUpgradeRow";

export default {
  name: "AtomicGeneratorTab",
  components: {
    MassUpgradeRow
  },
  data() {
    return {
      atomicPower: new Decimal(),
      gain: new Decimal(),
      free: new Decimal()
    };
  },
  computed: {
    cosmicRay() {
      return MassUpgrade.cosmicRay;
    }
  },
  methods: {
    update() {
      this.atomicPower.copyFrom(Currency.atomicPower.value);
      this.gain = Currency.atomicPower.gainPerSecond;
      this.free = Atom.freeTickspeeds;
    }
  }
};
</script>

<template>
  <div>
    <div class="c-bh-info">
      <span>You have <span class="o-highlight">{{ format(atomicPower) }}</span> {{ formatGain(atomicPower, gain) }} Atomic Power.</span>
      <span class="c-green">Which provides {{ format(free, 0) }} free Tickspeeds</span>
    </div>
    <MassUpgradeRow :upgrade="cosmicRay" />
  </div>
</template>