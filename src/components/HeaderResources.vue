<script>
import HeaderResource from "./HeaderResource";

export default {
  name: "HeaderResources",
  components: {
    HeaderResource
  },
  data() {
    return {
      mass: {
        amount: new Decimal(),
        rate: new Decimal()
      },
      ragePowers: {
        amount: new Decimal(),
        rate: new Decimal(),
        canReset: false,
        passive: false
      },
      darkMatter: {
        amount: new Decimal(),
        rate: new Decimal(),
        unlocked: false,
        canReset: false,
        passive: false
      },
      blackHole: {
        amount: new Decimal(),
        rate: new Decimal(),
        unlocked: false
      },
      atoms: {
        amount: new Decimal(),
        rate: new Decimal(),
        unlocked: false,
        canReset: false,
        passive: false
      },
      quark: {
        amount: new Decimal(),
        rate: new Decimal(),
        unlocked: false,
        passive: true
      },
      dilation: {
        amount: new Decimal(),
        rate: new Decimal(),
        unlocked: false,
        active: false
      },
      supernova: {
        amount: new Decimal(),
        rate: new Decimal(),
        unlocked: false,
        canReset: false
      }
    };
  },
  computed: {
    massTooltip() {
      return `You have pushed ${formatMass(this.mass.amount)}.`;
    },
    ragePowersTooltip() {
      return `Reach over ${formatMass(1e15)} of normal mass to reset previous features for gain Rage Powers.`;
    },
    darkMatterTooltip() {
      return `Reach over ${format(1e20)} Rage Power to reset all previous features for gain Dark Matters.`;
    },
    blackHoleTooltip() {
      return `You have ${formatMass(this.blackHole.amount)} of black hole.`;
    },
    atomTooltip() {
      return `Reach over ${formatMass(1.5e156)} of black hole to reset all previous features for gain Atoms & Quarks.`;
    },
    quarkTooltip() {
      return `You have ${format(this.quark.amount, 0)} Quark.`;
    },
    supernovaTooltip() {
      return `You have become ${format(this.supernova.amount, 0)} Supernova.`;
    },
  },
  methods: {
    update() {
      const mass = this.mass;
      mass.amount.copyFrom(Currency.mass.value);
      mass.rate = Currency.mass.gainPerSecond;

      const ragePowers = this.ragePowers;
      ragePowers.amount.copyFrom(Currency.ragePowers.value);
      ragePowers.rate = Currency.ragePowers.gainPerSecond;
      ragePowers.canReset = Currency.ragePowers.canReset;
      ragePowers.passive = BHUpgrade(5).canBeApplied || AtomUpgrade(5).canBeApplied;

      const darkMatter = this.darkMatter;
      darkMatter.unlocked = PlayerProgress.rageUnlocked();
      if (darkMatter.unlocked) {
        darkMatter.amount.copyFrom(Currency.darkMatter.value);
        darkMatter.rate = Currency.darkMatter.gainPerSecond;
        darkMatter.canReset = Currency.darkMatter.canReset;
        darkMatter.passive = AtomUpgrade(5).canBeApplied;
      }

      const blackHole = this.blackHole;
      blackHole.unlocked = PlayerProgress.blackHoleUnlocked();
      if (blackHole.unlocked) {
        blackHole.amount.copyFrom(Currency.blackHole.value);
        blackHole.rate = Currency.blackHole.gainPerSecond;
      }

      const atoms = this.atoms;
      atoms.unlocked = PlayerProgress.blackHoleUnlocked();
      if (atoms.unlocked) {
        atoms.amount.copyFrom(Currency.atoms.value);
        atoms.rate = Currency.atoms.gainPerSecond;
        atoms.canReset = Currency.atoms.canReset;
        atoms.passive = GameElement(24).canBeApplied;
      }

      const quark = this.quark;
      quark.unlocked = PlayerProgress.atomUnlocked();
      if (quark.unlocked) {
        quark.amount.copyFrom(Currency.quark.value);
        quark.passive = GameElement(14).canBeApplied;
        quark.rate = Currency.quark.gainPerSecond;
        if (quark.passive) {
          quark.rate = quark.rate.times(0.05 + GameElement(16).effectOrDefault(0));
        }
      }

      const dilation = this.dilation;
      dilation.unlocked = MassDilation.isUnlocked;
      if (dilation.unlocked) {
        dilation.amount.copyFrom(Currency.relativisticParticles.value);
        dilation.rate = Currency.relativisticParticles.gainPerSecond;
        dilation.active = MassDilation.isActive;
      }

      const supernova = this.supernova;
      supernova.unlocked = PlayerProgress.supernovaUnlocked();
      if (supernova.unlocked) {
        supernova.amount.copyFrom(Currency.supernova.value);
        supernova.rate = Currency.supernova.gainPerSecond;
        supernova.canReset = Currency.supernova.canReset;
      }
    },
    formatNoPlaces(value) {
      return format(value, 0);
    },
    ragePowerReset() {
      Currency.ragePowers.requestReset();
    },
    darkMatterReset() {
      Currency.darkMatter.requestReset();
    },
    atomReset() {
      Currency.atoms.requestReset();
    },
    dilatedMass() {
      MassDilation.toggle();
    },
    supernovaReset() {
      Currency.supernova.requestReset();
    },
  }
};
</script>

<template>
  <div class="l-game-header">
    <HeaderResource
      img-class="i-mass"
      :amount="mass.amount"
      :gain-rate="mass.rate"
      :is-mass="true"
      name="Mass"
      :tooltip="massTooltip"
      :show-tooltip="true"
    />
    <HeaderResource
      img-class="i-rage-powers"
      :amount="ragePowers.amount"
      :gain-rate="ragePowers.rate"
      text-class="c-rage-powers-amount"
      :format-fn="formatNoPlaces"
      name="Rage Powers"
      :is-rate="ragePowers.passive"
      :tooltip="ragePowersTooltip"
      :show-tooltip="!ragePowers.canReset"
      :click-fn="ragePowerReset"
    />
    <HeaderResource
      v-if="darkMatter.unlocked"
      img-class="i-dark-matter"
      :amount="darkMatter.amount"
      :gain-rate="darkMatter.rate"
      text-class="c-dark-matter-amount"
      :format-fn="formatNoPlaces"
      name="Dark Matter"
      :is-rate="darkMatter.passive"
      :tooltip="darkMatterTooltip"
      :show-tooltip="!darkMatter.canReset"
      :click-fn="darkMatterReset"
    />
    <HeaderResource
      v-if="darkMatter.unlocked"
      img-class="i-black-hole"
      :amount="blackHole.amount"
      :gain-rate="blackHole.rate"
      text-class="c-dark-matter-amount"
      :is-mass="true"
      name="Black Hole"
      :tooltip="blackHoleTooltip"
      :show-tooltip="true"
    />
    <HeaderResource
      v-if="darkMatter.unlocked"
      img-class="i-atom"
      :amount="atoms.amount"
      :gain-rate="atoms.rate"
      :format-fn="formatNoPlaces"
      name="Atom"
      :is-rate="atoms.passive"
      :tooltip="atomTooltip"
      :show-tooltip="!atoms.canReset"
      :click-fn="atomReset"
    />
    <HeaderResource
      v-if="quark.unlocked"
      img-class="i-quark"
      text-class="o-quark"
      :amount="quark.amount"
      :gain-rate="quark.rate"
      :format-fn="formatNoPlaces"
      name="Quark"
      :is-rate="quark.passive"
      :tooltip="quarkTooltip"
      :show-tooltip="true"
    />
    <HeaderResource
      v-if="dilation.unlocked"
      img-class="i-dilation"
      text-class="o-dilation"
      :amount="dilation.amount"
      :gain-rate="dilation.rate"
      :format-fn="formatNoPlaces"
      name="Mass Dilation"
      :is-rate="false"
      :show-tooltip="false"
      :click-fn="dilatedMass"
      :force-text="dilation.active ? '' : 'Inactive'"
    />
    <HeaderResource
      v-if="supernova.unlocked"
      img-class="i-supernova"
      text-class="o-supernova"
      :amount="supernova.amount"
      :gain-rate="supernova.rate"
      :format-fn="formatNoPlaces"
      name="Supernova"
      :is-rate="false"
      :show-tooltip="!supernova.canReset"
      :tooltip="supernovaTooltip"
      :click-fn="supernovaReset"
      :show-rate="false"
    />
  </div>
</template>