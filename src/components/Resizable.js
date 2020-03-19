const { html } = require('@forgjs/noframework');

const Resirable = (elements) => {
  const DomElement = html`<div class="resizable">
    ${elements}
  </div > `;

  return DomElement;
};

module.exports = Resirable;
