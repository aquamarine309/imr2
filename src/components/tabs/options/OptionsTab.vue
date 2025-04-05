<script>
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "OptionsTab",
  components: {
    PrimaryButton,
    PrimaryToggleButton
  },
  data() {
    return {
      starUnlocked: false,
      starBG: false,
      adUI: false
    }
  },
  watch: {
    starBG(value) {
      player.options.starBG = value;
    },
    adUI(value) {
      player.options.adUI = value;
    }
  },
  methods: {
    update() {
      this.starUnlocked = Stars.isUnlocked;
      this.starBG = player.options.starBG;
      this.adUI = player.options.adUI;
    }
  }
};
</script>

<template>
  <div>
    <div class="c-options-title">
      Save & Load
    </div>
    <div class="l-options-row">
      <PrimaryButton
        class="c-options-btn"
        onclick="GameStorage.save()"
      >
        Save Game
      </PrimaryButton>
      <PrimaryButton
        class="c-options-btn"
        onclick="GameStorage.exportToClipboard()"
      >
        Export Save
      </PrimaryButton>
      <PrimaryButton
        class="c-options-btn"
        onclick="Modal.import.show()"
      >
        Import Save
      </PrimaryButton>
    </div>
    <div class="l-options-row">
      <PrimaryButton
        class="c-options-btn"
        onclick="GameStorage.exportAsOldVersion()"
      >
        Export to Old
      </PrimaryButton>
      <PrimaryButton
        class="c-options-btn"
        onclick="GameStorage.hardReset()"
      >
        Hard Reset
      </PrimaryButton>
    </div>
    <br>
    <div class="c-options-title">
      Visual
    </div>
    <div class="l-options-row">
      <PrimaryToggleButton
        v-if="starUnlocked"
        class="c-options-btn"
        v-model="starBG"
        label="Show Star:"
      />
      <PrimaryToggleButton
        class="c-options-btn"
        v-model="adUI"
        label="AD-like UI:"
      />
    </div>
  </div>
</template>

<style scoped>
.c-options-title {
  font-size: 13px;
  margin-bottom: 4px;
  width: 100%;
  text-align: left;
}

.l-options-row {
  display: flex;
  flex-direction: row;
  margin: 2px 0;
}

.c-options-btn {
  flex: 1;
  padding: 1px;
  margin: 2px;
  height: 55px;
}
</style>