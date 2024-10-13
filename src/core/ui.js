import VueTouch from "vue-touch";

import GameUIComponent from "@/components/GameUIComponent";
import { DEV } from "@/env";
import { state } from "./ui.init";

Vue.mixin({
  computed: {
    $viewModel() {
      return state.view;
    }
  },
  created() {
    if (this.update) {
      this.on$(GAME_EVENT.UPDATE, this.update);
      if (GameUI.initialized) {
        this.update();
      }
    }

    // Following is used to force the recomputation of computed values
    // from this fiddle https://codepen.io/sirlancelot/pen/JBeXeV
    const recomputed = Object.create(null);
    const watchers = this._computedWatchers;

    if (!watchers) return;

    for (const key in watchers) makeRecomputable(watchers[key], key, recomputed);

    this.$recompute = key => recomputed[key] = !recomputed[key];
    Vue.observable(recomputed);
  },
  destroyed() {
    EventHub.ui.offAll(this);
  },
  methods: {
    format,
    formatX,
    formatPow,
    formatInt,
    formatMass,
    emitClick() {
      this.$emit("click");
    },
    emitInput(val) {
      this.$emit("input", val);
    },
    emitClose() {
      this.$emit("close");
    },
    on$(event, fn) {
      EventHub.ui.on(event, fn, this);
    }
  }
});

// This function is also from the fiddle above
function makeRecomputable(watcher, key, recomputed) {
  const original = watcher.getter;
  recomputed[key] = true;

  // eslint-disable-next-line no-sequences
  watcher.getter = vm => (recomputed[key], original.call(vm, vm));
}

const ReactivityComplainer = {
  complain() {
    this.checkReactivity(player, "player");
  },
  checkReactivity(obj, path) {
    if (obj === undefined || obj === null) {
      return;
    }
    if (obj.__ob__ !== undefined) {
      throw new Error(`Boi you fukked up - ${path} became REACTIVE (oh shite)`);
    }
    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      const prop = obj[key];
      if (typeof prop === "object") {
        this.checkReactivity(prop, `${path}.${key}`);
      }
    }
  }
};

Vue.use(VueTouch, {
  name: "v-touch"
});

export const GameUI = {
  events: [],
  flushPromise: undefined,
  initialized: false,
  dispatch(event, args) {
    const index = this.events.indexOf(event);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
    if (event !== GAME_EVENT.UPDATE) {
      this.events.push([event, args]);
    }
    if (this.flushPromise) return;
    this.flushPromise = Promise.resolve()
      .then(this.flushEvents.bind(this));
  },
  flushEvents() {
    this.flushPromise = undefined;
    for (const event of this.events) {
      EventHub.ui.dispatch(event[0], event[1]);
    }
    EventHub.ui.dispatch(GAME_EVENT.UPDATE);
    if (DEV) {
      ReactivityComplainer.complain();
    }
    this.events = [];
  },
  update() {
    this.dispatch(GAME_EVENT.UPDATE);
  }
};

(function() {
  const methodStrategy = Vue.config.optionMergeStrategies.methods;
  // eslint-disable-next-line max-params
  Vue.config.optionMergeStrategies.methods = (parentVal, childVal, vm, key) => {
    const result = methodStrategy(parentVal, childVal, vm, key);
    const hasUpdate = val => val && val.update;
    if (!hasUpdate(parentVal) || !hasUpdate(childVal)) return result;
    result.update = function() {
      parentVal.update.call(this);
      childVal.update.call(this);
    };
    return result;
  };
}());

export const ui = new Vue({
  el: "#ui",
  components: {
    GameUIComponent
  },
  data: state,
  render: h => h(GameUIComponent)
});