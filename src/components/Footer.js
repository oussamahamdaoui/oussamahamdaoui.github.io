const { html, $ } = require('@forgjs/noframework');
const Icon = require('./Icon');

const Footer = () => {
  const DomElement = html`<div class="footer">
    <div>© ${(new Date()).getFullYear()} Oussama Hamdaoui</div>
    <div class="url"></div>

    <div class="center"></div>
    
    <div>${Icon('github')}</div>
    <div>${Icon('linkedin')}</div>
    <div>${Icon('twitter')}</div>
    <div class="time"></div>
    <div>LF</div>
    <div>UTF-8</div>
    <div class="pos">Ln:000, Col:000</div>
  </div>`;
  const posElement = $('.pos', DomElement);
  const timeElement = $('.time', DomElement);
  const urlElement = $('.url', DomElement);

  document.body.addEventListener('mousemove', (e) => {
    posElement.innerText = `Ln:${(e.clientY % 100).toString().padStart(3, '0')}, Col:${(e.clientX % 100).toString().padStart(3, '0')}`;
  });

  const updateTime = () => {
    const time = new Date();
    timeElement.innerText = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')} `;
    urlElement.innerText = document.location.pathname;
    requestAnimationFrame(updateTime);
  };

  updateTime();


  return DomElement;
};

module.exports = Footer;
