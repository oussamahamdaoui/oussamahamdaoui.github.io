const { $, html } = require('@forgjs/noframework');
const marked = require('marked');
const hljs = require('highlight.js');
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
    <div class="numbers">
      ${Array(23).fill(null).map((e, i) => html`<span>${i + 1}</span>`)}
    </div>
    <div class="content">
    
    </div>
  </div>`;

  const contentElement = $('.content', DomElement);
  let current = null;

  globalEvents.subscribe(GO_TO, async (link) => {
    if (current === link) return;
    current = link;
    const res = await fetch(`md/${link}.md`);
    const md = await res.text();
    contentElement.innerHTML = marked.parse(md);
  });


  return DomElement;
};

module.exports = Center;
