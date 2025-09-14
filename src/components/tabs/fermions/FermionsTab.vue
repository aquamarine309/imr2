<script>
import FermionBox from "./FermionBox";
import FermionInfo from "./FermionInfo";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "FermionsTab",
  components: {
    FermionBox,
    FermionInfo,
    PrimaryButton
  },
  data() {
    return {
      quarks: new Decimal(),
      leptons: new Decimal(),
      quarkGain: new Decimal(),
      leptonGain: new Decimal(),
      selected: -1
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
  watch: {
    selected() {
      GameUI.update();
    }
  },
  methods: {
    update() {
      this.quarks.copyFrom(Currency.uQuarks.value);
      this.leptons.copyFrom(Currency.uLeptons.value);
      this.quarkGain = Currency.uQuarks.gainPerSecond;
      this.leptonGain = Currency.uLeptons.gainPerSecond;
    },
    backToNormal() {
      Currency.supernova.resetLayer();
    },
    select(fermion) {
      if (fermion.isUnlocked) {
        this.selected = fermion.id;
      }
    }
  }
};
</script>

<template>
  <div>
    <div>
      <PrimaryButton @click="backToNormal">
        Back To Normal
      </PrimaryButton>
    </div>
    <FermionInfo :selected="selected" />
    <div class="l-fermions-container l-fermions-container--quark">
      <div>{{ quarkText }}</div>
      <div class="c-fermions">
        <FermionBox
          v-for="fermion in quarkFermions"
          :key="fermion.id"
          :fermion="fermion"
          @click.native="select(fermion)"
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
          @click.native="select(fermion)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>