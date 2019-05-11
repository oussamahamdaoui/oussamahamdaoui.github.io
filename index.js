const startCode = document.querySelector('textarea').value;
const consoleDiv = document.querySelector('#text');
const input = document.querySelector('#input');

document.body.addEventListener('click', ()=>{
  input.focus();
});
input.focus();

function setEndOfContenteditable(contentEditableElement)
{
    const range = document.createRange();//Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
    const selection = window.getSelection();//get the selection object (allows you to change selection)
    selection.removeAllRanges();//remove any selections already made
    selection.addRange(range);//make the range you have just created the visible selection
}

const levenshteinDistance = (a, b) => {
  const distanceMatrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
  for (let i = 0; i <= a.length; i += 1) {
    distanceMatrix[0][i] = i;
  }
  for (let j = 0; j <= b.length; j += 1) {
    distanceMatrix[j][0] = j;
  }
  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      distanceMatrix[j][i] = Math.min(
        distanceMatrix[j][i - 1] + 1,
        distanceMatrix[j - 1][i] + 1,
        distanceMatrix[j - 1][i - 1] + indicator,
      );
    }
  }
  return distanceMatrix[b.length][a.length];
}



const type = (text)=>{
  if(!text) return;
  let index = 0
  const i = setInterval(()=>{
    if(index > text.length - 3){
      clearInterval(i);
    }
    else{
      consoleDiv.textContent += text.slice(index * 2, (index + 1) * 2);
      index++;
    }
  }, 0)
}

consoleDiv.append(startCode);
type(content.home());



input.addEventListener('keydown', (e)=>{
  const inp = input.innerHTML.toLowerCase();
  const keys = Object.keys(content);
  if(e.keyCode === 13){
    e.preventDefault();
    const hiddenAndPublic = {...content, ...hidden};
    if(hiddenAndPublic[inp]){
      consoleDiv.innerHTML = '';
      const isText = hiddenAndPublic[inp]();
      if(isText){
        consoleDiv.append(startCode);
        type(isText);
      }
      input.innerHTML = '';
    }
    else{
      const closest = keys.filter(command => levenshteinDistance(command, inp) < 3)[0];
      input.innerHTML = '';
      if(closest){
        type(`You sloud try '${closest}' 😉 \n`);
      }
      else{
        /// oups 404
      }
    }
  
  }
  if(e.keyCode === 9){
    e.preventDefault();
    const helper = keys.filter(e => e.startsWith(input.innerHTML.toLowerCase()))[0];
    if(helper){
      input.innerHTML = helper;
      setEndOfContenteditable(input);
    }
  }
  if(e.keyCode === 38){
    e.preventDefault();
    const index = keys.indexOf(inp);
    input.innerHTML = keys[index + 1] || keys[0];
    setEndOfContenteditable(input);
  }
  if(e.keyCode === 40){
    e.preventDefault();
    const index = keys.indexOf(inp);
    input.innerHTML = keys[index - 1] || keys[keys.length - 1];
    setEndOfContenteditable(input);
  }
});




Object.keys(content).forEach(command => {
  Object.defineProperty(window, command, {
    get:()=>{
      content.clear("");
      content.log(content[command]());
    }
  })
})


