const { html, $, EventManager } = require('@forgjs/noframework');
const Icon = require('./Icon');
const {
  globalEvents,
  Events: {
    GO_TO,
    NEXT_TAB,
    PREV_TAB,
    CLOSE_TAB,
  },
} = require('../GlobalEvents');

const Tab = ({
  title,
  selected,
}, evtM) => {
  const DomElement = html`<div class="tab ${selected ? 'selected' : ''}" tabindex="0">
    <div class="title">${title}</div>
    <div class="close">${Icon('x')}</div>
  </div>`;

  evtM.subscribe('selected-tab', (te) => {
    if (te === title) {
      DomElement.classList.add('selected');
      DomElement.focus();
    } else {
      DomElement.classList.remove('selected');
    }
  });

  evtM.subscribe('close-tab', (t) => {
    if (title === t) {
      DomElement.remove();
    }
  });

  DomElement.addEventListener('click', () => {
    evtM.emit('selected-tab', title);
  });

  DomElement.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return;
    evtM.emit('selected-tab', title);
  });

  $('.close', DomElement).addEventListener('click', (e) => {
    e.stopPropagation();
    evtM.emit('close-tab', title);
    DomElement.remove();
  });

  return DomElement;
};

const TopBar = () => {
  const evtM = new EventManager();
  let tabs = [];
  let currentTab = null;

  const DomElement = html`<div class="top-bar">
    <img src="images/me.jpeg">
    <h1>Oussama Hamdaoui</h1>
    <div class="tabs">
    </div>
  </div>`;

  const tabsElement = $('.tabs', DomElement);

  globalEvents.subscribe(GO_TO, (title) => {
    if (tabs.indexOf(title) === -1) {
      tabsElement.append(Tab({
        title,
        selected: true,
      }, evtM));
      tabs.push(title);
    }
    currentTab = title;
    evtM.emit('selected-tab', title);
  });

  evtM.subscribe('selected-tab', (title) => {
    if (currentTab === title) return;
    currentTab = title;
    globalEvents.emit(GO_TO, title);
  });

  evtM.subscribe('close-tab', (title) => {
    if (currentTab === title) {
      const next = tabs.indexOf(title);
      if (tabs[next + 1]) {
        currentTab = tabs[next + 1];
      } else if (tabs[next - 1]) {
        currentTab = tabs[next - 1];
      }
      evtM.emit('selected-tab', currentTab);
    }
    tabs = tabs.filter((tab) => tab !== title);
    globalEvents.emit(GO_TO, currentTab);
  });

  globalEvents.subscribe(CLOSE_TAB, () => {
    if (tabs.length > 1) {
      evtM.emit('close-tab', currentTab);
    }
  });

  globalEvents.subscribe(NEXT_TAB, () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (tabs[currentIndex + 1]) {
      evtM.emit('selected-tab', tabs[currentIndex + 1]);
    } else if (tabs[0] !== currentTab) {
      evtM.emit('selected-tab', tabs[0]);
    }
  });

  globalEvents.subscribe(PREV_TAB, () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (tabs[currentIndex - 1]) {
      evtM.emit('selected-tab', tabs[currentIndex - 1]);
    } else if (tabs[tabs.length - 1] !== currentTab) {
      evtM.emit('selected-tab', tabs[tabs.length - 1]);
    }
  });

  return DomElement;
};

module.exports = TopBar;
