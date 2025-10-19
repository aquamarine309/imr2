<script>
import PrimaryButton from "@/components/PrimaryButton";
import NeutronTreeLayout from "./NeutronTreeLayout";
import NeutronUpgradeInfo from "./NeutronUpgradeInfo";

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
    trees: () => NeutronTree
  },
  methods: {
    update() {
      this.neutronStars.copyFrom(Currency.neutronStars.value);
      this.starGain = Currency.neutronStars.gainPerSecond;
      for (const tree of this.trees) {
        if (tree.isUnlocked) {
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
    someCanBeBought(tree) {
      return tree.upgrades.some(x => x.canBeBought);
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
          {{ $t(info.config.key) }}
          <span
            v-if="someCanBeBought(info)"
            class="c-tip"
          >
            [ ! ]
          </span>
        </PrimaryButton>
      </template>
    </div>
    <NeutronTreeLayout :tree-id="tree" />
  </div>
</template>

<style scoped>
.o-primary-btn--choose-tree {
  margin: 0 3px;
  flex: 1;
}

.c-choose-tree-row {
  display: flex;
  overflow-x: auto;
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