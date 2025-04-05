<script>
import BosonUpgradeButton from "./BosonUpgradeButton";

export default {
  name: "BosonsTab",
  components: {
    BosonUpgradeButton
  },
  data() {
    return {
      positiveW: new Decimal(),
      negativeW: new Decimal(),
      graviton: new Decimal(),
      photon: new Decimal(),
      gluon: new Decimal(),
      higgsBoson: new Decimal(),
      zBoson: new Decimal(),
      positiveWGain: new Decimal(),
      negativeWGain: new Decimal(),
      gravitonGain: new Decimal(),
      photonGain: new Decimal(),
      gluonGain: new Decimal(),
      higgsBosonGain: new Decimal(),
      zBosonGain: new Decimal(),
      gravitonEffect: new Decimal(),
      higgsBosonEffect: new Decimal(),
      positiveWMass: new Decimal(),
      positiveWNeg: new Decimal(),
      negativeWSoftcap: new Decimal(),
      negativeWPos: new Decimal(),
      zBosonTickspeed: new Decimal(),
      zBosonW: new Decimal()
    }
  },
  computed: {
    photonUpgrade: () => PhotonUpgrade,
    gluonUpgrade: () => GluonUpgrade
  },
  methods: {
    update() {
      this.positiveW.copyFrom(Boson.positiveW.amount);
      this.negativeW.copyFrom(Boson.negativeW.amount);
      this.graviton.copyFrom(Boson.graviton.amount);
      this.photon.copyFrom(Boson.photon.amount);
      this.gluon.copyFrom(Boson.gluon.amount);
      this.higgsBoson.copyFrom(Boson.higgsBoson.amount);
      this.zBoson.copyFrom(Boson.zBoson.amount);
      this.positiveWGain = Boson.positiveW.gain;
      this.negativeWGain = Boson.negativeW.gain;
      this.gravitonGain = Boson.graviton.gain;
      this.photonGain = Boson.photon.gain;
      this.gluonGain = Boson.gluon.gain;
      this.higgsBosonGain = Boson.higgsBoson.gain;
      this.zBosonGain = Boson.zBoson.gain;
      this.positiveWMass = Boson.positiveW.effects.mass.effectValue;
      this.negativeWPos = Boson.negativeW.effects.positiveW.effectValue;
      this.negativeWSoftcap = Boson.negativeW.effects.softcap.effectValue;
      this.positiveWNeg = Boson.positiveW.effects.negativeW.effectValue;
      this.gravitonEffect = Boson.graviton.effectValue;
      this.higgsBosonEffect = Boson.higgsBoson.effectValue;
      this.zBosonTickspeed = Boson.zBoson.effects.tickspeed.effectValue;
      this.zBosonW = Boson.zBoson.effects.wBosons.effectValue;
    }
  }
}
</script>

<template>
  <div class="l-bosons-tab">
    <div class="c-bosons-row">
      <div class="c-boson-grid c-boson-graviton">
        You have {{ format(graviton) }} {{ formatGain(graviton, gravitonGain) }} Graviton, which speed up Boson production by {{ format(gravitonEffect) }}.
      </div>
      <div class="c-boson-grid c-boson-higgs">
        You have {{ format(higgsBoson) }} {{ formatGain(higgsBoson, higgsBosonGain) }} Higgs Boson, which raise Graviton's effect by {{ format(higgsBosonEffect) }}.
      </div>
    </div>
    <div class="c-bosons-row">
      <div class="c-boson-grid c-boson-photon">
        <div class="c-boson-amount">You have {{ format(photon) }} {{ formatGain(photon, photonGain) }} Photon.</div>
        <BosonUpgradeButton
          v-for="upgrade in photonUpgrade"
          :key="upgrade.id + upgrade.type"
          :upgrade="upgrade"
        />
      </div>
      <div class="c-boson-grid c-boson-gluon">
        <div class="c-boson-amount">You have {{ format(gluon) }} {{ formatGain(gluon, gluonGain) }} Gluon.</div>
        <BosonUpgradeButton
          v-for="upgrade in gluonUpgrade"
          :key="upgrade.id + upgrade.type"
          :upgrade="upgrade"
        />
      </div>
    </div>
    <div class="c-bosons-row-other">
      <div class="c-boson-grid c-boson-other">
        You have {{ format(positiveW) }} {{ formatGain(positiveW, positiveWGain) }} W<sup>+</sup> Boson, which multiply Mass gain by {{ format(positiveWMass) }}, multiply W<sup>-</sup> Boson gain by {{ format(positiveWNeg) }}.
      </div>
      <div class="c-boson-grid c-boson-other">
        You have {{ format(negativeW) }} {{ formatGain(negativeW, negativeWGain) }} W<sup>-</sup> Boson, which make Mass gain softcap^2 starts {{ formatPow(negativeWSoftcap) }} later, multiply W<sup>+</sup> Boson gain by {{ format(negativeWPos) }}.
      </div>
      <div class="c-boson-grid c-boson-other">
        You have {{ format(zBoson) }} {{ formatGain(zBoson, zBosonGain) }} Z<sup>0</sup> Boson, which multiply Tickspeed Power by {{ format(zBosonTickspeed) }}, multiply W Bosons gain by {{ format(zBosonW) }}.
      </div>
    </div>
  </div>
</template>

<style scoped>
.l-bosons-tab {
  display: flex;
  flex-direction: column;
}

.c-bosons-row {
  display: flex;
  flex-direction: row;
}

.c-bosons-row-other {
  display: flex;
  flex-direction: column;
}

.c-boson-grid {
  flex: 1;
  margin: 1px;
  padding: 6px;
  color: white;
}

.ad-ui .c-boson-grid {
  border-radius: 5px;
}

.c-boson-amount {
  height: 50px;
}

.c-boson-graviton {
  background-color: rgba(86, 35, 180, 0.7);
}

.c-boson-higgs {
  background-color: rgba(176, 135, 52, 0.7);
}

.c-boson-photon {
  background-color: rgba(186, 165, 76, 0.7);
}

.c-boson-gluon {
  background-color: rgba(176, 72, 168, 0.7);
}

.c-boson-other {
  background-color: rgba(84, 84, 84, 0.7);
}
</style>