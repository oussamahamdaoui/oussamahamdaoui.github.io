const { EventManager } = require('@forgjs/noframework');
const hotkeys = require('hotkeys-js');

const Events = {
  GO_TO: 'go-to',
  PREV_TAB: 'PREV_TAB',
  NEXT_TAB: 'NEXT_TAB',
  CLOSE_TAB: 'CLOSE_TAB',
  NEX_PAGE: 'NEXT_PAGE',
  PREV_PAGE: 'PREV_PAGE',
};

const eventManager = new EventManager();

hotkeys('alt+w', (e) => {
  e.preventDefault();
  eventManager.emit(Events.CLOSE_TAB);
});

hotkeys('alt+tab', (e) => {
  e.preventDefault();
  eventManager.emit(Events.NEXT_TAB);
});

hotkeys('alt+shift+tab', (e) => {
  e.preventDefault();
  eventManager.emit(Events.PREV_TAB);
});

module.exports = {
  globalEvents: eventManager,
  Events,
};
