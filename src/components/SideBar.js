const { html, $, $$ } = require('@forgjs/noframework');
const Icon = require('./Icon');
const {
  globalEvents,
  Events: {
    GO_TO,
    NEX_PAGE,
    PREV_PAGE,
  },
} = require('../GlobalEvents');
const Resizable = require('./Resizable');

const Link = (title) => {
  const DomElement = html`<div class="link" tabindex="0">${title}</div>`;

  DomElement.getTitle = () => title;

  DomElement.addEventListener('click', () => {
    globalEvents.emit(GO_TO, title);
  });

  DomElement.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return;
    globalEvents.emit(GO_TO, title);
  });

  globalEvents.subscribe(GO_TO, (t) => {
    if (t === title) {
      DomElement.classList.add('selected');
    } else {
      DomElement.classList.remove('selected');
    }
  });
  return DomElement;
};

const Folder = ({
  name,
  links,
}) => {
  const DomElement = html`
  <div class="folder open">
    <div class="title" tabindex="0">
      <span class="chevron">${Icon('chevron-right')}</span>
      <span class="folder-icon">${Icon('folder')} ${name}</span>
    </div>
    <div class="links">${links.map((link) => Link(link))}</div>
  </div>`;

  $('.title', DomElement).addEventListener('click', () => {
    DomElement.classList.toggle('open');
  });

  $('.title', DomElement).addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return;
    DomElement.classList.toggle('open');
  });

  return DomElement;
};

const SideBar = (links) => {
  const folders = {

  };
  links.forEach((link) => {
    const folderName = link.split('/')[0];
    const fileName = link.split('/')[1];
    if (!folders[folderName]) {
      folders[folderName] = {
        links: [],
        name: folderName,
      };
    }
    folders[folderName].links.push(fileName);
  });

  const DomElement = html`<div class="side-bar">
    <div class="resizer"></div>
    ${Object.values(folders).map(Folder)}
  </div>`;

  globalEvents.subscribe(NEX_PAGE, () => {
    let nextLink = '';
    if ($('.selected', DomElement)) {
      const linkElements = $$('.link', DomElement);
      const nextLinkIndex = linkElements.indexOf($('.selected', DomElement)) + 1;
      if (nextLinkIndex < linkElements.length) {
        nextLink = linkElements[nextLinkIndex].getTitle();
        globalEvents.emit(GO_TO, nextLink);
      }
    }
  });

  globalEvents.subscribe(PREV_PAGE, () => {
    let nextLink = '';
    if ($('.selected', DomElement)) {
      const linkElements = $$('.link', DomElement);
      const prevLinkIndex = linkElements.indexOf($('.selected', DomElement)) - 1;
      if (prevLinkIndex >= 0) {
        nextLink = linkElements[prevLinkIndex].getTitle();
        globalEvents.emit(GO_TO, nextLink);
      }
    }
  });

  Resizable(DomElement);

  return DomElement;
};

module.exports = SideBar;
