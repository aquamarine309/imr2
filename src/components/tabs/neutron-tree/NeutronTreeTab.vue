<script>
import PrimaryButton from "@/components/PrimaryButton";
import NeutronTreeLayout from "./NeutronTreeLayout";
import NeutronUpgradeInfo from "./NeutronUpgradeInfo";

const trees = [
  { id: 0, name: "Main", isUnlocked: () => true },
  { id: 1, name: "QoL", isUnlocked: () => true },
  { id: 2, name: "Challenge", isUnlocked: () => true },
  { id: 3, name: "Post-Supernova", isUnlocked: () => Bosons.areUnlocked }
];

export default {
  name: "NeutronTreeTab",
  components: {
    PrimaryButton,
    NeutronTreeLayout,
    NeutronUpgradeInfo
  },
  data() {
    return {
      neutronStars: new Decimal(),
      starGain: new Decimal(),
      tree: 0,
      unlockedTree: Array.repeat(false, trees.length)
    }
  },
  computed: {
    selectedNodeId() {
      return this.$viewModel.selectedNodeId;
    },
    selected() {
      return NeutronUpgrade[this.selectedNodeId];
    },
    trees: () => trees
  },
  methods: {
    update() {
      this.neutronStars.copyFrom(Currency.neutronStars.value);
      this.starGain = Currency.neutronStars.gainPerSecond;
      for (const tree of this.trees) {
        this.unlockedTree[tree.id] = tree.isUnlocked();
      }
    },
    reset() {
      Currency.supernova.resetLayer(true);
    },
    someCanBeBought(id) {
      return NeutronUpgrade.all.some(x => x.config.tree === id && x.canBeBought);
    },
    toggle(id) {
      this.tree = id;
      GameUI.update();
    }
  }
}
</script>

<template>
  <div>
    <div><PrimaryButton @click="reset">Reset without being supernova</PrimaryButton></div>
    <br>
    <div>You have <span class="o-highlight">{{ format(neutronStars, 2) }} {{ formatGain(neutronStars, starGain) }}</span> Neutron Star.</div>
    <NeutronUpgradeInfo :upgrade="selected" />
    <div class="c-choose-tree-row">
      <template v-for="info of trees">
        <PrimaryButton
          :key="info.id"
          v-if="unlockedTree[info.id]"
          @click="toggle(info.id)"
          class="o-primary-btn--choose-tree"
          :enabled="info.id === tree"
        >
          {{ info.name }}
          <span
            v-if="someCanBeBought(info.id)"
            class="c-tip"
          >
              [ ! ]
          </span>
        </PrimaryButton>
      </template>
    </div>
    <NeutronTreeLayout :tree="tree" />
  </div>
</template>

<style scoped>
.o-primary-btn--choose-tree {
  margin: 0 3px;
  flex: 1
}

.c-choose-tree-row {
  display: flex;
}

.c-tip {
  color: #ff0000;
  margin: 0 3px;
}
</style>