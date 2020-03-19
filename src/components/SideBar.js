const { html, $ } = require('@forgjs/noframework');
const Icon = require('./Icon');
const {
  globalEvents,
  Events: {
    GO_TO,
  },
} = require('../GlobalEvents');

const Link = (title) => {
  const DomElement = html`<div>${title}</div>`;
  DomElement.addEventListener('click', () => {
    globalEvents.emit(GO_TO, title);
  });
  return DomElement;
};

const Folder = ({
  name,
  links,
}) => {
  const DomElement = html`
    <div class="folder open">
      <div class="title">
        <span class="chevron">${Icon('chevron-right')}</span>
        <span>${Icon('folder')} ${name}</span>
      </div>
      <div class="links">
        ${links.map((link) => Link(link))}
      </div>
    </div>
  `;

  $('.title', DomElement).addEventListener('click', () => {
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
    ${Object.values(folders).map(Folder)}
  </div>`;


  return DomElement;
};

module.exports = SideBar;
