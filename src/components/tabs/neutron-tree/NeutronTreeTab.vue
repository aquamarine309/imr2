<script>
import PrimaryButton from "@/components/PrimaryButton";
import NeutronTreeLayout from "./NeutronTreeLayout";
import NeutronUpgradeInfo from "./NeutronUpgradeInfo";

const trees = [
  { id: 0, key: "neutron_tree_main", isUnlocked: () => true },
  { id: 1, key: "neutron_tree_qol", isUnlocked: () => true },
  { id: 2, key: "neutron_tree_challenge", isUnlocked: () => true },
  { id: 3, key: "neutron_tree_post_supernova", isUnlocked: () => Bosons.areUnlocked }
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
      unlockedTreeBits: 0
    };
  },
  computed: {
    selectedNodeId() {
      return this.$viewModel.selectedNodeId;
    },
    selected() {
      return NeutronUpgrade[this.selectedNodeId];
    },
    tree() {
      return this.$viewModel.neutronTree;
    },
    trees: () => trees
  },
  methods: {
    update() {
      this.neutronStars.copyFrom(Currency.neutronStars.value);
      this.starGain = Currency.neutronStars.gainPerSecond;
      for (const tree of this.trees) {
        if (tree.isUnlocked()) {
          this.unlockedTreeBits |= (1 << tree.id);
        }
      }
    },
    treeUnlocked(id) {
      return (this.unlockedTreeBits & (1 << id)) !== 0;
    },
    reset() {
      Currency.supernova.resetLayer(true);
    },
    someCanBeBought(id) {
      return NeutronUpgrade.all.some(x => x.config.tree === id && x.canBeBought);
    },
    toggle(id) {
      this.$viewModel.neutronTree = id;
      GameUI.update();
    }
  }
};
</script>

<template>
  <div>
    <div>
      <PrimaryButton @click="reset">
        {{ $t("reset_without_being_supernova") }}
      </PrimaryButton>
    </div>
    <br>
    <div>You have <span class="o-highlight">{{ format(neutronStars, 2) }} {{ formatGain(neutronStars, starGain) }}</span> Neutron Star.</div>
    <NeutronUpgradeInfo :upgrade="selected" />
    <div class="c-choose-tree-row">
      <template v-for="info of trees">
        <PrimaryButton
          v-if="treeUnlocked(info.id)"
          :key="info.id"
          class="o-primary-btn--choose-tree"
          :enabled="info.id === tree"
          @click="toggle(info.id)"
        >
          {{ $t(info.key) }}
          <span
            v-if="someCanBeBought(info.id)"
            class="c-tip"
          >
            [ ! ]
          </span>
        </PrimaryButton>
      </template>
    </div>
    <NeutronTreeLayout />
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

.ad-ui .o-highlight {
  font-weight: bold;
  color: var(--color-supernova);
}
</style>