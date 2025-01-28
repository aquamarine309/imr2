<script>
import RankButton from "./RankButton";
import MassUpgradeRow from "@/components/MassUpgradeRow";
import MassSoftcapRow from "./MassSoftcapRow";

export default {
  name: "MassTab",
  components: {
    RankButton,
    MassUpgradeRow,
    MassSoftcapRow
  },
  data() {
    return {
      ragePowersUnlocked: false
    };
  },
  computed: {
    rankRows() {
      const ranks = RankType.all;
      const result = [];
      const isOdd = ranks.length % 2 !== 0;
      for (let i = 0; i + 1 < ranks.length; i += 2) {
        result.push([ranks[i], ranks[i + 1]]);
      }
      if (isOdd) {
        result.push([ranks.last()]);
      }
      return result;
    },
    mainUpgrades() {
      return [
        MassUpgrade.muscler,
        MassUpgrade.booster,
        MassUpgrade.stronger,
        MassUpgrade.overpower
      ];
    },
    secondUpgrades() {
      return [
        MassUpgrade.tickspeed
      ];
    },
    softcaps() {
      return MassSoftcap;
    }
  },
  methods: {
    update() {
      this.ragePowersUnlocked = PlayerProgress.rageUnlocked();
    }
  }
};
</script>

<template>
  <div>
    <div
      v-for="(ranks, index) in rankRows"
      :key="index + 'rank'"
      class="l-rank-row"
    >
      <RankButton :rank="ranks[0]" />
      <RankButton
        v-if="ranks.length === 2"
        :rank="ranks[1]"
      />
    </div>
    <MassUpgradeRow
      v-for="upgrade in mainUpgrades"
      :key="upgrade.name"
      :upgrade="upgrade"
    />
    <div
      v-if="ragePowersUnlocked"
      class="c-second-upgrades"
    >
      <MassUpgradeRow
        v-for="upgrade in secondUpgrades"
        :key="upgrade.name"
        :upgrade="upgrade"
      />
    </div>
    <div>
      <MassSoftcapRow
        v-for="softcap in softcaps"
        :key="softcap.id"
        :softcap="softcap"
      />
    </div>
  </div>
</template>

<style>
.c-second-upgrades {
  margin-top: 40px;
}
</style>