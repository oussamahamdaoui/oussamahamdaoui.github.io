const { html, $ } = require('@forgjs/noframework');

const PlayGround = () => {
  const DomElement = html`<div class="hide playground">
    <canvas width="400px" height="400px"></canvas>
  </div>`;
  return DomElement;
};

module.exports = PlayGround;
