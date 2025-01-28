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
        canReset: false
      },
      blackHole: {
        amount: new Decimal(),
        rate: new Decimal(),
        unlocked: false
      },
      atoms: {
        amount: new Decimal(),
        rate: new Decimal(),
        unlocked: false
      },
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
    }
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
      ragePowers.passive = BHUpgrade(5).canBeApplied;

      const darkMatter = this.darkMatter;
      darkMatter.unlocked = PlayerProgress.rageUnlocked();
      if (darkMatter.unlocked) {
        darkMatter.amount.copyFrom(Currency.darkMatter.value);
        darkMatter.rate = Currency.darkMatter.gainPerSecond;
        darkMatter.canReset = Currency.darkMatter.canReset;
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
    }
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
      :is-rate="false"
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
      :is-rate="false"
      :tooltip="atomTooltip"
      :show-tooltip="true"
    />
  </div>
</template>