const hidden = {
  briks(){
    startBriks();
    return false;
  },

};

const content =  {
  menu(){
    return `
    • menu: shows the menu 💡
    • home: brings you 🏠
    • projects: see all my amazing projects 🚀
    • about-me: If you want to know more about me 🙃
    • contact: If you want to say Hi 👋
    
`;
  },
  home (){
    return `Hello my name is Oussama I'm a computer scientist and a web developer.
I design and code beautifull and sometimes usefull things.
You want to know more  about me and my work? Here are some commands that you can try:

  • menu: shows the menu 💡
  • home: brings you 🏠
  • projects: see all my amazing projects 🚀
  • about-me: If you want to know more about me 🙃
  • contact: If you want to say Hi 👋

Tips to help you navigate:

  • Up and Down arrows will move you throught the menu pages
  • Hit tab to complete a command
  • The console is case insensitive
`;
  },

  projects(){
    return `My Projects:

Here are listed my GitHub projects, most of them are still work in preogress:
  • ForgJs: is a JavaScript lightweight object validator, that uses valibation rules that are easly understandable by humans
  • RCode: is a JavaScript exercice engen that helps you write custom exercises.
  • simple-Doodle: a funny animation made with HTM CSS and JavaScript
  • spandita-malik.com: is a website I coded for the best photograph ever go check it out.
  • twit-tor: (comming soon) is a paper on a new way of using onion protection to send anonymous messages

Type the name to know more about the project

There are some smal projects that I have hidden as easter eggs,
try to find them (there is a hint in the about-me section 😉).
`;
  },
  "about-me": () => {
    return `You want to know more about me 😭?
My name is Oussama Hamdaoui, im a computer scientist, I live and study in Lille France, its an amazing place if you love 🌧️. I have studied Math and Physics in school but I ended up choosing computer science (the best of all)
My main intrests are computer scince, football, traveling and... fooood 🍔.
Curently I'm working as webdevelopper at AXA, since I started there in 2018 I have learned a loot about clean code, Test Drive and Deveop, agile...
Like every developer I have a favorite language, JavaScript but I often have to use Java, C# or Python (realy cool languge by the way) for more old school stuff.
Sins you know me now, please feel free to check the contact section if you want to say hi.
Here is the hint as promissed type "briks" and see what happens.
`
  },
contact(){
    return '';
  }
}