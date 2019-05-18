const startCode = document.querySelector('textarea').value;
const consoleDiv = document.querySelector('#text');
const consoleRoot = document.querySelector('#console');
const input = document.querySelector('#input');
let currentPage = 'home';
let off = false;

document.body.addEventListener('click', ()=>{
  input.focus();
});
input.focus();

function setEndOfContenteditable(contentEditableElement)
{
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

let pandas = 0;

const type = (text)=>{
  if(!text) return;
  let index = 0
  const textArray = text.split(/(\s)/g);
  const i = setInterval(()=>{
    if(index > textArray.length - 1){
      clearInterval(i);
    }
    else{
      consoleDiv.append(toElement(textArray[index]));
      index++;
    }
  }, 0)
}

const startCodeAppender = () => {
  consoleDiv.innerHTML = '';
  consoleDiv.append(startCode);
  if(pandas !== 0){
    consoleDiv.append(`You made ${pandas} panda${pandas > 1 ? 's': '' } cry today, stop clicking on the links, type!\n\n`);
  }
}

const toElement = (txt) =>{
  if(txt[0] === '#'){
    const link = document.createElement('a');
    link.innerText = txt.slice(1);
    link.classList.add('console-link');

    link.addEventListener('click', ()=> {
      startCodeAppender()
      const key = link.innerText.slice(0,-1).toLocaleLowerCase();
      type({...content, ...projects}[key]())
      pandas ++;
    })
    return link;
  }
  return txt;
}


startCodeAppender();
type(content.home());



input.addEventListener('keydown', (e)=>{
  if(off){
    return;
  }
  const inp = input.value.toLowerCase();
  let keys = Object.keys(content);
  let hiddenAndPublic = {...content, ...hidden};
  
  if(currentPage === 'projects'){
    keys = [...Object.keys(projects), ...keys];
    hiddenAndPublic = {...hiddenAndPublic, ...projects}
  }
  if(e.keyCode === 13){
    e.preventDefault();
    if(hiddenAndPublic[inp]){
      consoleDiv.innerHTML = '';
      const isText = hiddenAndPublic[inp]();
      if(isText){
        startCodeAppender();
        type(isText);
      }
      input.value = '';
      currentPage = inp;
    }
    else{
      const closest = keys.filter(command => levenshteinDistance(command, inp) < 3)[0];
      input.value = '';
      if(closest){
        type(`You sloud try '${closest}' 😉 \n`);
      }
    }
  
  }
  if(e.keyCode === 9){
    e.preventDefault();
    const helper = keys.filter(e => e.startsWith(input.value.toLowerCase()))[0];
    if(helper){
      input.value = helper;
    }
  }
  if(e.keyCode === 38){
    e.preventDefault();
    const index = keys.indexOf(inp);
    input.value = keys[index + 1] || keys[0];
  }
  if(e.keyCode === 40){
    e.preventDefault();
    const index = keys.indexOf(inp);
    input.value = keys[index - 1] || keys[keys.length - 1];
  }
});





