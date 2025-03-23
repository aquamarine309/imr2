<script>
import HeaderResources from "./HeaderResources";
import TabComponents from "./tabs";
import AppBar from "./AppBar";
import GameDrawer from "./GameDrawer";
import PopupModal from "./modals/PopupModal";
import BottomTabBar from "./BottomTabBar";
import HeaderChallengeDisplay from "./HeaderChallengeDisplay";
import ModalProgressBar from "./modals/ModalProgressBar";
import BackgroundStar from "./BackgroundStar";
import SupernovaOverlay from "./SupernovaOverlay";

export default {
  name: "GameUIComponent",
  components: {
    HeaderResources,
    AppBar,
    GameDrawer,
    ...TabComponents,
    PopupModal,
    BottomTabBar,
    HeaderChallengeDisplay,
    ModalProgressBar,
    BackgroundStar,
    SupernovaOverlay
  },
  data() {
    return {
      showDrawer: false,
      showSupernova: false
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
    update() {
      this.showSupernova = Currency.supernova.value.eq(0) && Currency.supernova.canReset;
    },
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
    :class="{ 'ad-ui': view.adUI }"
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
      <ModalProgressBar v-if="view.modal.progressBar" />
      <AppBar @toggle-drawer="toggleDrawer" />
      <BackgroundStar v-if="!showSupernova" />
      <v-touch
        class="l-view"
        v-on="swipeHandlers"
      >
        <template v-if="showSupernova">
          <SupernovaOverlay />
        </template>
        <template v-else>
          <HeaderChallengeDisplay />
          <HeaderResources />
          <component
            :is="page"
            id="page"
          />
        </template>
      </v-touch>
      <BottomTabBar />
    </div>
  </div>
</template>