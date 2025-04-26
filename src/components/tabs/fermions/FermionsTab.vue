<script>
import FermionBox from "./FermionBox";

export default {
  name: "FermionsTab",
  components: {
    FermionBox
  },
  data() {
    return {
      quarks: new Decimal(),
      leptons: new Decimal(),
      quarkGain: new Decimal(),
      leptonGain: new Decimal()
    };
  },
  computed: {
    quarkFermions() {
      return FermionType.quarks.fermions.all;
    },
    leptonFermions() {
      return FermionType.leptons.fermions.all;
    },
    quarkText() {
      return i18n.t("you_have_X", {
        value: i18n.tc("X_u_quark", checkSingle(this.quarks), {
          value: `${format(this.quarks)} ${formatGain(this.quarks, this.quarkGain)}`
        })
      });
    },
    leptonText() {
      return i18n.t("you_have_X", {
        value: i18n.tc("X_u_lepton", checkSingle(this.leptons), {
          value: `${format(this.leptons)} ${formatGain(this.leptons, this.leptonGain)}`
        })
      });
    },
  },
  methods: {
    update() {
      this.quarks.copyFrom(Currency.uQuarks.value);
      this.leptons.copyFrom(Currency.uLeptons.value);
      this.quarkGain = Currency.uQuarks.gainPerSecond;
      this.leptonGain = Currency.uLeptons.gainPerSecond;
    }
  }
};
</script>

<template>
  <div>
    <div class="l-fermions-container l-fermions-container--quark">
      <div>{{ quarkText }}</div>
      <div class="c-fermions">
        <FermionBox
          v-for="fermion in quarkFermions"
          :key="fermion.id"
          :fermion="fermion"
        />
      </div>
    </div>
    <div class="l-fermions-container l-fermions-container--lepton">
      <div>{{ leptonText }}</div>
      <div class="c-fermions">
        <FermionBox
          v-for="fermion in leptonFermions"
          :key="fermion.id"
          :fermion="fermion"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>