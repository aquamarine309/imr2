<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "OptionsTab",
  components: {
    PrimaryButton
  }
};
</script>

<template>
  <div>
    <div class="c-options-title">
      Save
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
        onclick="GameStorage.importSave(prompt('Input your save.'))"
      >
        Import Save
      </PrimaryButton>
    </div>
  </div>
</template>

<style>
.c-options-title {
  font-size: 16px;
  margin-bottom: 4px;
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