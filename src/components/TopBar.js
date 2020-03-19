const { html, $, EventManager } = require('@forgjs/noframework');
const Icon = require('./Icon');
const {
  globalEvents,
  Events: {
    GO_TO,
  },
} = require('../GlobalEvents');

const Tab = ({
  title,
  selected,
}, evtM) => {
  const DomElement = html`<div class="tab ${selected ? 'selected' : ''}">
    <div class="title">${title}</div>
    <div class="close">${Icon('x')}</div>
  </div>`;

  evtM.subscribe('select-tab', (te) => {
    if (te === title) {
      DomElement.classList.add('selected');
    } else {
      DomElement.classList.remove('selected');
    }
  });

  DomElement.addEventListener('click', () => {
    evtM.emit('select-tab', title);
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
    <div class="search">
      ${Icon('search')}
      <input type="text" placeholder="Search...">
    </div>
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
    evtM.emit('select-tab', title);
    currentTab = title;
  });

  evtM.subscribe('select-tab', (title) => {
    currentTab = title;
  });

  evtM.subscribe('selected-tab', (title) => {
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
    }
    tabs = tabs.filter((tab) => tab !== title);
    globalEvents.emit(GO_TO, currentTab);
  });

  return DomElement;
};

module.exports = TopBar;
