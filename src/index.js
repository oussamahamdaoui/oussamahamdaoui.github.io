const { html } = require('@forgjs/noframework');
require('babel-polyfill');
const {
  globalEvents, Events: {
    GO_TO,
  },
} = require('./GlobalEvents');
const pages = require('./pages');

const SideBar = require('./components/SideBar');
const TopBar = require('./components/TopBar');
const Center = require('./components/Center');
const Footer = require('./components/Footer');

const App = () => {
  const DomElement = html`<div class="app">
    ${TopBar()}
    <div class="resizable">
      ${SideBar(pages)}
      ${Center()}
    </div>
    ${Footer()}
  </div>`;
  return DomElement;
};

document.body.appendChild(App());
globalEvents.emit(GO_TO, 'snake.js');
