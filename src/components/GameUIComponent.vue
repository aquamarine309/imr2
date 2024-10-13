<script>
import HeaderResources from "./HeaderResources";
import TabComponents from "./tabs";
import AppBar from "./AppBar";
import GameDrawer from "./GameDrawer";
import PopupModal from "./modals/PopupModal";

export default {
  name: "GameUIComponent",
  components: {
    HeaderResources,
    AppBar,
    GameDrawer,
    ...TabComponents,
    PopupModal
  },
  data() {
    return {
      showDrawer: false
    };
  },
  computed: {
    view() {
      return this.$viewModel;
    },
    page() {
      return Tabs.current[this.view.subtab].config.component;
    },
    currentModal() {
      return this.view.modal.current;
    },
    swipeHandlers() {
      return {
        swipeleft: () => this.showDrawer = false,
        swiperight: () => this.showDrawer = true
      };
    }
  },
  watch: {
    showDrawer() {
      this.hideTooltip();
    }
  },
  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },
    hideTooltip() {
      this.view.resourceTooltipId = -1;
    }
  }
};
</script>

<template>
  <div
    v-if="view.initialized"
    class="l-game-ui"
    v-on="swipeHandlers"
    @click="hideTooltip"
  >
    <transition name="a-drawer">
      <GameDrawer
        v-if="showDrawer"
        @close-drawer="showDrawer = false"
      />
    </transition>
    <div>
      <transition name="a-overlay">
        <v-touch
          v-if="showDrawer"
          class="l-background-overlay"
          v-on="swipeHandlers"
        />
      </transition>
      <div
        v-if="currentModal"
        class="l-background-overlay l-modal-overlay"
      />
      <PopupModal
        v-if="currentModal"
        :modal="currentModal"
      />
      <AppBar @toggle-drawer="toggleDrawer" />
      <v-touch
        class="l-view"
        v-on="swipeHandlers"
      >
        <HeaderResources />
        <component
          :is="page"
          id="page"
        />
      </v-touch>
    </div>
  </div>
</template>