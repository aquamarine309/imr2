<script>
import NeutronUpgradeButton from "./NeutronUpgradeButton";
import NeutronUpgradeConnection from "./NeutronUpgradeConnection";

export default {
  name: "NeutronTreeLayout",
  components: {
    NeutronUpgradeButton,
    NeutronUpgradeConnection
  },
  data() {
    return {
      now: Date.now()
    }
  },
  computed: {
    tree() {
      return this.$viewModel.neutronTree;
    },
    upgrades() {
      return NeutronUpgrade.all.filter(x => x.config.tree === this.tree);
    },
    connections() {
      return NeutronUpgradeConnections.filter(x => x[0].config.tree === this.tree);
    }
  },
  methods: {
    update() {
      this.now = Date.now();
    },
    styleObject(upgrade) {
      return {
        left: `${upgrade.config.idx * 100}%`,
        top: `${upgrade.config.row * 75}px`
      }
    }
  }
}
</script>

<template>
  <div class="l-neutron-tree">
    <svg class="l-neutron-tree-svg">
      <NeutronUpgradeConnection
        v-for="(connection, index) in connections"
        :key="index + 'connection'"
        :connection="connection"
        :time="now"
      />
    </svg>
    <NeutronUpgradeButton
      v-for="upgrade in upgrades"
      :key="upgrade.id"
      :upgrade="upgrade"
      :style="styleObject(upgrade)"
    />
  </div>
</template>

<style scoped>
.l-neutron-tree {
  width: 100%;
  height: 500px;
  position: relative;
  margin-top: 50px;
}

.l-neutron-tree-svg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>