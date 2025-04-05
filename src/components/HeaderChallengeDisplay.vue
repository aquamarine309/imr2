<script>
export default {
  name: "HeaderChallengeDisplay",
  data() {
    return {
      isActive: false,
      name: "",
      goal: "",
      pending: new Decimal(),
      next: "",
      isCapped: false,
      auto: false
    };
  },
  methods: {
    update() {
      const challenge = Challenges.current;
      this.isActive = challenge !== undefined;
      if (!this.isActive) return;
      this.auto = NeutronUpgrade.qol6.isBought;
      const formatGoal = challenge.type.formatGoal;
      this.name = challenge.name;
      this.goal = formatGoal(challenge.goal);
      this.isCapped = challenge.isCapped;
      if (this.auto || this.isCapped) return;
      const pending = challenge.pendingCompletions;
      const cannotComplete = pending.lte(challenge.completions) || this.isCapped;
      this.pending = cannotComplete ? new Decimal(0) : pending.minus(challenge.completions);
      this.next = formatGoal(cannotComplete ? challenge.goal : challenge.goalAt(pending));
    }
  }
};
</script>

<template>
  <div
    v-if="isActive"
    class="o-challenge-header"
  >
    <span>You are now in [{{ name }}] Challenge! Go over {{ goal }} to complete.</span>
    <br>
    <span v-if="isCapped">(Capped)</span>
    <span v-else-if="auto">(Automatically Completing)</span>
    <span v-else>+{{ format(pending, 0) }} completions (next at {{ next }})</span>
  </div>
</template>