export class PlayerProgress {
  static rageUnlocked() {
    return Currency.ragePowers.gt(0) || PlayerProgress.blackHoleUnlocked();
  }

  static blackHoleUnlocked() {
    return Currency.darkMatter.gt(0);
  }
}
