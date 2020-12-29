/* eslint-disable no-param-reassign */
const { $ } = require('@forgjs/noframework');

const Resizable = (element) => {
  const resizer = $('.resizer', element);
  let startX;
  let startWidth;

  const doDrag = (e) => {
    element.style.width = `${startWidth + e.clientX - startX}px`;
  };

  const stopDrag = () => {
    window.document.documentElement.classList.remove('resizing');
    window.removeEventListener('mousemove', doDrag, false);
    window.removeEventListener('mouseup', stopDrag, false);
  };

  const initDrag = (e) => {
    window.document.documentElement.classList.add('resizing');
    startX = e.clientX;
    startWidth = parseInt(window.getComputedStyle(element).width, 10);
    window.addEventListener('mousemove', doDrag, false);
    window.addEventListener('mouseup', stopDrag, false);
  };

  resizer.addEventListener('mousedown', initDrag, false);
};

module.exports = Resizable;
