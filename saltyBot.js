'use strict';
// Extract the required classes from the discord.js module
const {Client, MessageEmbeds} = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs') 
let badWords = [];
client.login('');

client.on('ready', () => {
  console.log('CLIENT READY!');
  fs.readFile('Bad_words.txt', 'utf-8', (err, data) => { 
    if (err) throw err; 
  
    // Converting Raw Buffer to text 
    // data using tostring function. 
    //console.log(typeof(data)); 
    badWords = data.split(",");
    //badWords.push(data);
    for(let i = 0; i < badWords.length; i++){
      console.log(i + " " + badWords[i]);
    }
}); 

});
/**
 * 
 * @param {VoiceState} state the voice state
 */
function channelIsEmpty(state){
  if(state.channel.members.size === 0){
    console.log(`${state.channel.name} is now empty.`);
    return true;
  }else {
    return false;
  }
}

function wasASwitch(oldState, newState){
  if(newState.channel !== oldState.channel || oldState.channel === null){
    return true;
  }
  return false;
}
// FEDERICA HERE YES HERE IN THE TABLE BELOW REPLACE "HERE" WITH A WORD OF YOUR CHOICE;
// THIS WILL BE A NEW COMMAND
const commands = ["test", "instagram", "telegram", "sorry", "brent", "what", "author", "HERE"];
client.on('message', message => {
  console.log("Message detected")
  for(let i = 0; i < badWords.length; i++){
    if(message.content.toLocaleLowerCase().includes(badWords[i])){
      //console.log(message.content.includes(badWords[i]))
      //message.channel.send("Please mind your language!");
    }else{
      //console.log(badWords[i] + "=" + message.content.includes(badWords[i]));
    }
  }
  if(isACommand(message.content)){
    switch (message.content.substring(1)) {
      case commands[0]:
        message.channel.send("Ciao Federica!");
        break;
      case commands[1]:
        message.channel.send("📸Il mio instagram!📸\n⫸ https://www.instagram.com/lemonjsalt/ ⫷");
        break;
      case commands[2]:
        message.channel.send("🍋Il gruppo Telegram!🍋\n⫸ https://t.me/joinchat/IH6fjCv2MnFleKJS ⫷")
        break;
      case commands[3]:
        message.channel.send("🍋😭😭😭😭😭😭😭😭😭😭😭😭Nico is sorry🍋😭😭😭😭😭😭😭😭😭😭😭");
        break;
      case commands[4]:
        message.channel.send("Brent shut the fuck up\n https://media.discordapp.net/attachments/816016207902933063/816064014697234492/unknown.png?width=727&height=702\n https://www.instagram.com/brent_temmermans/ \n Don't forget to add this greek god on instagram!");
        break;
      case commands[5]:
        message.channel.send("https://blog.newrelic.com/wp-content/uploads/wait-what-meme-rage-face.jpg");
      break;
      case message.content === "Who'\s geil as fuck?":
        message.channel.send("Brent is geil as fuck!");
        break;
        case commands[6]:
        message.channel.send("@Inquation is my creator.\n https://github.com/NicoGrassetto\n https://www.researchgate.net/profile/Nico-Grassetto \n https://www.twitch.tv/inquati0n");
        break;
        case commands[7]:
        // FEDERICA HERE YES HERE; CREATE A VARIABLE WITH A MESSAGE AND REPLACE HERE WITH IT
        // BE CREATIVE YOU CAN EVEN PUT A LINK IF YOU FANCY!!!!!
        message.channel.send("YOU VARIABLE SHOULD REPLACE THIS MESSAGE");
        break;
      default:
        //TODO Handle some kind of exception here.
        break;
    }
  }
  if(message.content.startsWith('https://discord.gg/')){
    //The message is a Discord link and is deleted.
    message.delete();
    //Warn the user and decrease his score.
    //Then delete the bot's message after 5 seconds.
  if (message.channel.name !== '《🤖》commands' && message.author.id === '235088799074484224') {
    message.delete();
  }
  
  //Deletes Darwin's commands and Rythm's commands
  if (message.content.startsWith("!") && message.channel.name !== '《🤖》commands' || isACommand(message.content)) {
    message.delete();
  }
  }});




  let stdRooms = [];
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if(oldState.channel !== null && oldState.channel !== newState.channel){//oldState.channel !== newState.channel
      console.log(`${oldState.member.displayName} has left ${oldState.channel.name}`);
      if(oldState.channel.name === '🍋 » Lounge'){
        //Check if the channel is empty and if yes delete no micro
        if(channelIsEmpty(oldState)){
          oldState.guild.channels.cache.forEach(channel =>{
            if(channel.name === '🍋no-micro'){
              channel.delete();
            }
          });
        }
      }else if(/📚» Study Room [0-9]/.test(oldState.channel.name)){
        //Check whether the channel is empty or not.
        if(channelIsEmpty(oldState)){
          //If it is: delete it from guild.channels AND also from strooms
          oldState.guild.channels.cache.forEach(channel =>{
            if(channel.name === oldState.channel.name){
              let index = oldState.channel.name.split(" ")[2];
              //Delete it from duoRooms
              stdRooms.splice(index);
              channel.delete();
            }
          });
          oldState.guild.channels.cache.forEach(channel =>{
            if(channel.name === "📚study-room-" + index){
              let index = oldState.channel.name.split(" ")[2];
              //Delete it from duoRooms
              stdRooms.splice(index);
              channel.delete();
            }
          });
        }
      }
      
      
      
      else{};
    }
  
  
    //NOW WE ONLY TAKE INTO ACCOUNT NEW CONNECTIONS TO A CHANNEL
    if(newState.channel !== null && newState.channel !== oldState.channel){//newState.channel !== oldState.channel
      console.log(`${newState.member.displayName} has joined ${newState.channel.name}`);
      if(newState.channel.name === '🍋 » Lounge'){
        //if no one's in lounge create a no micro channel
        if(newState.channel.members.size === 1 && wasASwitch(oldState, newState)){
          newState.guild.channels.create('🍋no-micro', {type: 'text', parent: '554279368281686029'})
          .then()
          .catch();
        }
        //TODO replace ID by name
      }else if(newState.channel.name === '📚» Create Study Room:'){
        //Whenever someone joins the channel create a channel called Duo
       //TODO start from 1 rather than 0
        let roomName = '📚» Study Room ' + stdRooms.length;
        /**new block */
        if(newState.channel.members.size === 1 && wasASwitch(oldState, newState)){
          newState.guild.channels.create('📚study-room-' + stdRooms.length, {type: 'text', parent: '554279368281686029'})
          .then()
          .catch();
        }
        newState.guild.channels.create(roomName, {type: 'voice', parent: '554279368281686029', userLimit: 15})
        .then((nChannel) =>{
          newState.member.voice.setChannel(nChannel)
        })
        .catch();
        stdRooms.push(roomName);
        //Thereafter move the person to the newly created Duo channel.
        //TODO replace ID by name
      }else{};
    }
  });





















/**
 * Return true if the string is actually a command and false otherwise.
 * @param {String} string the string to check.
 */

function isACommand(string) {
  let args = string.split(" ");
  let prefix = args[0];
  if(prefix.startsWith(".")){
    let commandString = prefix.substring(1);
    for(let commandStr of commands){
      if(commandString === commandStr){
        return true;
      }
    }
    return false;
  }else{
    return false;
  }
}


//[🔥] Hot or Not Federica's version
client.on('message', message => {
  if (message.channel.id === '815384636746235934' || message.channel.id === '815384636746235934') {
    console.log("Message sent in 🔥hot-or-not");
    if(message.attachments.size > 0){
      console.log("Picture detected!");
      message.react('1️⃣');
      message.react('2️⃣');
      message.react('3️⃣');
      message.react('4️⃣');
      message.react('5️⃣');
    }else {
      message.delete();
    }
  }
});