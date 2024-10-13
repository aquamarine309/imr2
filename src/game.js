window.onload = function() {
  GameUI.initialized = true;
  ui.view.initialized = true;
};

export function init() {
  GameStorage.init();
  GameLoop.start();
  Tabs.all.find(t => t.config.id === player.options.lastOpenTab)?.show(true);
}