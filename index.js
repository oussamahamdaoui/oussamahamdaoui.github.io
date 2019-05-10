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

const hidden = {
  briks(){
    return `
Sorry, this is comming soon, I promis you will be amazed!
`;
  },

  missingPage(){

  }

};

const Console =  {
  contact(){
    return hidden.briks();
  },
  menu(){
    return `Menu:
    • home: brings you 🏠
    • projects: see all my amazing projects 🚀
    • about-me: If you want to know more about me 🙃
    • contact: If you want to say Hi 👋
    • menu: shows the menu 💡
`;
  },
  home (){
    return `Hello my name is Oussama I'm a computer scientist and a web developer.
I design and code beautifull and sometimes usefull things.
You want to know more  about me and my work? Here are some commands that you can try:
  • home: brings you 🏠
  • projects: see all my amazing projects 🚀
  • about-me: If you want to know more about me 🙃
  • contact: If you want to say Hi 👋
  • menu: shows the menu 💡
P.S. start typing and hit tab for autocompletion.
`;
  },
  projects(){
    return `My Projects:
Here are listed my GitHub projects, most of them are still work in preogress:
  • ForgJs is a JavaScript lightweight object validator, that uses valibation rules that are easly understandable by humans
  • RCode is a JavaScript exercice engen that helps you write custom exercises.
  • simple-Doodle a funny animation made with HTM CSS and JavaScript
  • spandita-malik.com is a website I coded for the best photograph ever go check it out.
If you want to know more about one of these projects type the name and hit enter

P.S. This is not case sensitive, no need to capitalize the names,
If you are lazy just type the bigining of the word and hit tab then enter.
Also you seem intrested so, i think you should know that there are some easter eggs hidden here and there,
try to find them all. 
Good luck 👍.
`;
  },
  "about-me": () => {
    return `You want to know more about me 😭?
My name is Oussama Hamdaoui, im a computer scientist, I live and study in Lille France, its an amazing place if you love 🌧️. I have studied Math and Physics in school but I ended up choosing computer science (the best of all)
My main intrests are computer scince, football, traveling and... fooood 🍔.
Curently I'm working as webdevelopper at AXA, since I started there in 2018 I have learned a loot about clean code, Test Drive and Deveop, agile...
Like every developer I have a favorite language, JavaScript but I often have to use Java, C# or Python (realy cool languge by the way) for more old school stuff.
Sins you know me now, please feel free to check the contact section if you want to say hi.
Now that we are friends I can give you a hint, one of the hidden easter egg is "briks" try typing that in the console and see what happens.
`
  }
}

consoleDiv.append(startCode);
type(Console.home());



input.addEventListener('keydown', (e)=>{
  if(e.keyCode === 13){
    e.preventDefault();
    const inp = input.innerHTML.toLowerCase();
    const hiddenAndPublic = {...Console, ...hidden};
    if(hiddenAndPublic[inp]){
      consoleDiv.innerHTML = '';
      consoleDiv.append(startCode);
      type(hiddenAndPublic[inp]());
      input.innerHTML = '';
    }
    else{
      const closest = Object.keys(Console).filter(command => levenshteinDistance(command, inp) < 3)[0];
      input.innerHTML = '';
      if(closest){
        type(`Did you mean '${closest}' 😉? \n`);
      }
      else{
        /// oups 404
      }
    }
  
  }
  if(e.keyCode === 9){
    e.preventDefault();
    const helper = Object.keys(Console).filter(e => e.startsWith(input.innerHTML.toLowerCase()))[0];
    if(helper){
      input.innerHTML = helper;
      setEndOfContenteditable(input);
    }
  }
})


Object.keys(Console).forEach(command => {
  Object.defineProperty(window, command, {
    get:()=>{
      console.clear("");
      console.log(Console[command]());
    }
  })
})


