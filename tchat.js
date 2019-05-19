
const makeid = (length) => {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const hash = (txt) => {
  var hash = 0, i, chr;
  if (txt.length === 0) return hash;
  for (i = 0; i < txt.length; i++) {
    chr   = txt.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};
const getColorFromUsername = (username) => {
  const h = hash(username);
  -2147483648
  const color =  (h - (-2147483648)) * 16777215 / (2147483647 - (-2147483648));
  return '#'+Math.floor(color).toString(16);
  
}
const getUsernameFromKey = (key, lenght = 8) =>{
  return key.slice(0,lenght);
}

const readFileAsync = () => {
  
  return new Promise((resolve, reject) => {
    const file = document.querySelector('#file-input');
    const changeFunction = (e)=>{
      if(window.FileReader) {
        var file  = e.target.files[0];
        var reader = new FileReader();
        if (file && file.type.match('image.*')) {
          reader.readAsDataURL(file);
        } 
        reader.onloadend = function (e) {
          const file = document.querySelector('#file-input');
          file.value = '';
          resolve(reader.result)
          
        }
      }
    }
    file.onchange = changeFunction;
  
    file.click();
  })
  
  
}

const createMessageElement = (messageObj, me) => {
  const messageElement = document.createElement('span');
  const username = document.createElement('span');
  const messageContent = document.createElement('span');
  messageElement.classList.add('message');
  username.classList.add('username');
  if(messageObj.message){
    messageContent.textContent = messageObj.message + '\n';
  }
  if(messageObj.image){
    const img = document.createElement('img');
    img.src = messageObj.image;
    img.classList.add('img');
    messageContent.append(img, '\n')
  }
  
  username.textContent = (me ? "me      " : getUsernameFromKey(messageObj.publicKey)) +  ' : ';
  messageElement.style.color = getColorFromUsername(getUsernameFromKey(messageObj.publicKey));
  messageElement.append(username);
  messageElement.append(messageContent);
  return messageElement;
}


const startTchat = async () => {
  off = true;
  type(`
Wellcome in the tchat, say hi and see if there are people connected
type $img to add an image
To exit the tchat type exit
`);

  const user = {
    publicKey:makeid(18),
  }
  const socketServer = 'https://oniontchat.herokuapp.com'; 
  const socket = io(socketServer);
  const thcatMessages = document.createElement('span');
  thcatMessages.classList.add('messsahe')
  consoleRoot.append('\n', thcatMessages);

  socket.on('message', (msg) => {
      const paresdMsg = JSON.parse(msg);
      thcatMessages.prepend(createMessageElement(paresdMsg));
   
  })

  const listener =  async (e)=>{
    const inp = input.value.toLowerCase();
    if(e.keyCode === 13){
      e.preventDefault();
      const message = {
        publicKey: user.publicKey,
      }

      if(inp === 'exit'){
        off = false;
        input.value = '';
        startCodeAppender();
        type(content.home());
        input.removeEventListener('keydown',listener);
        return;
      }
      if(inp.slice(0,1) === '$'){
        if(inp === '$img') {
          const img = await readFileAsync();
          message.image = img;
        }
      }
      else {
        message.message = inp;
      }
      socket.emit('message', JSON.stringify(message));
      input.value = '';
      thcatMessages.prepend(createMessageElement(message, true));
      
    }
  }

  input.addEventListener('keydown',listener)
}