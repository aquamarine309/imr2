<script>
import ChallengeBox from "./ChallengeBox";

export default {
  name: "ChallengesTab",
  components: {
    ChallengeBox
  },
  computed: {
    challenges() {
      return Challenges.all;
    }
  }
};
</script>

<template>
  <div>
    <div class="l-challenges-layout">
      <ChallengeBox
        v-for="challenge in challenges"
        :key="challenge.id"
        :challenge="challenge"
      />
    </div>
  </div>
</template>

<style>

</style>