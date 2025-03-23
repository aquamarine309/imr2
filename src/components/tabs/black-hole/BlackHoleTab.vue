<script>
import MassUpgradeRow from "@/components/MassUpgradeRow";

export default {
  name: "BlackHoleTab",
  components: {
    MassUpgradeRow
  },
  data() {
    return {
      blackHole: new Decimal(),
      gain: new Decimal(),
      mult: new Decimal(),
      condenserMult: new Decimal(),
      exponent: new Decimal(),
      softcapStart: new Decimal(),
      softcapped: false
    };
  },
  computed: {
    condenser() {
      return MassUpgrade.condenser;
    }
  },
  methods: {
    update() {
      this.blackHole.copyFrom(Currency.blackHole.value);
      this.gain = Currency.blackHole.gainPerSecond;
      this.mult = BlackHole.mult;
      this.condenserMult = this.condenser.effectValue;
      this.exponent = BlackHole.exponent;
      this.softcapStart = BlackHole.softcapStart;
      this.softcapped = this.blackHole.gte(this.softcapStart);
    }
  }
};
</script>

<template>
  <div>
    <div class="c-bh-info">
      <span>You have <span class="o-highlight">{{ formatMass(blackHole) }}</span> {{ formatGain(blackHole, gain, true) }} of Black Hole.</span>
      <span class="c-green">Which boosts mass gain by {{ formatX(mult) }}</span>
      <br>
      <span>Black Hole mass's gain formula - (x + 1)<sup>{{ format(exponent) }}</sup> * {{ format(condenserMult) }}</span>
    </div>
    <MassUpgradeRow :upgrade="condenser" />
    <div v-if="softcapped">
      <div class="c-mass-softcap-row">
        After <b>{{ format(softcapStart) }}</b> of mass gain from black hole, its mass gain will be softcapped!
      </div>
    </div>
  </div>
</template>