const { EventManager } = require('@forgjs/noframework');

module.exports = {
  Events: {
    GO_TO: 'go-to',
  },
  globalEvents: new EventManager(),
};
