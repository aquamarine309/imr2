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
      adUI: false,
      language: "en"
    };
  },
  watch: {
    starBG(value) {
      player.options.starBG = value;
    },
    adUI(value) {
      player.options.adUI = value;
    },
    language(value) {
      player.options.language = value;
      i18n.locale = value;
    }
  },
  methods: {
    update() {
      this.starUnlocked = Stars.isUnlocked;
      this.starBG = player.options.starBG;
      this.adUI = player.options.adUI;
      this.language = player.options.language;
    },
    toggleLanguage() {
      switch (this.language) {
        case "zh":
          this.language = "en";
          break;
        case "en":
          this.language = "zh";
          break;
        default:
          throw new Error("Unexpected Language");
      }
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
        {{ $t("save_game") }}
      </PrimaryButton>
      <PrimaryButton
        class="c-options-btn"
        onclick="GameStorage.exportToClipboard()"
      >
        {{ $t("export_save") }}
      </PrimaryButton>
      <PrimaryButton
        class="c-options-btn"
        onclick="Modal.import.show()"
      >
        {{ $t("import_save") }}
      </PrimaryButton>
    </div>
    <div class="l-options-row">
      <PrimaryButton
        class="c-options-btn"
        onclick="GameStorage.exportAsOldVersion()"
      >
        {{ $t("export_to_old") }}
      </PrimaryButton>
      <PrimaryButton
        class="c-options-btn"
        onclick="Modal.hardReset.show()"
      >
        {{ $t("hard_reset") }}
      </PrimaryButton>
    </div>
    <br>
    <div class="c-options-title">
      Visual
    </div>
    <div class="l-options-row">
      <PrimaryToggleButton
        v-if="starUnlocked"
        v-model="starBG"
        class="c-options-btn"
        i18n-key="show_star_X"
      />
      <PrimaryToggleButton
        v-model="adUI"
        class="c-options-btn"
        i18n-key="ad_ui_X"
      />
      <PrimaryButton
        class="c-options-btn"
        @click="toggleLanguage"
      >
        {{ $t("language_X", { language: $t("this_language") }) }}
      </PrimaryButton>
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
  width: calc(100% / 3 - 4px);
  padding: 1px;
  margin: 2px;
  height: 55px;
}
</style>