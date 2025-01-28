<script>
export default {
  name: "HeaderChallengeDisplay",
  data() {
    return {
      isActive: false,
      name: "",
      goal: new Decimal(),
      pending: new Decimal(),
      next: new Decimal(),
      isCapped: false
    };
  },
  methods: {
    update() {
      const challenge = Challenges.current;
      this.isActive = challenge !== undefined;
      if (!this.isActive) return;
      this.name = challenge.name;
      this.goal = challenge.goal;
      this.isCapped = challenge.isCapped;
      const pending = challenge.pendingCompletions;
      const cannotComplete = pending.lte(challenge.completions) || this.isCapped;
      this.pending = cannotComplete ? new Decimal(0) : pending.minus(challenge.completions);
      this.next = cannotComplete ? this.goal : challenge.goalAt(pending);
    }
  }
};
</script>

<template>
  <div
    v-if="isActive"
    class="o-challenge-header"
  >
    <span>You are now in [{{ name }}] Challenge! Go over {{ formatMass(goal) }} to complete.</span>
    <br>
    <span v-if="isCapped">(Capped)</span>
    <span v-else>+{{ format(pending, 0) }} completions (next at {{ formatMass(next) }})</span>
  </div>
</template>