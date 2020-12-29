const { $, html } = require('@forgjs/noframework');
const marked = require('marked');
const hljs = require('highlight.js');
const CustomPages = require('../CustomPages');
const { globalEvents, Events: { GO_TO } } = require('../GlobalEvents');

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight(code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    const ret = hljs.highlight(validLanguage, code).value;
    return ret;
  },
  langPrefix: 'hljs ',
  pedantic: false,
  gfm: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  headerIds: false,
});

const Center = () => {
  const DomElement = html`<div class="page">
    <div class="content">
      ${Object.values(CustomPages)}
    </div>
  </div>`;

  const contentElement = $('.content', DomElement);
  let current = null;
  const pages = { ...CustomPages };

  globalEvents.subscribe(GO_TO, async (link) => {
    if (current === link) return;
    if (pages[current]) {
      pages[current].classList.add('hide');
    }
    current = link;
    if (!pages[current]) {
      const res = await fetch(`md/${link}.md`);
      const md = await res.text();
      pages[current] = html`<div>${marked.parse(md)}</div>`;
      contentElement.appendChild(pages[current]);
    }
    pages[current].classList.remove('hide');
    contentElement.scrollTop = 0;
  });
  return DomElement;
};

module.exports = Center;
