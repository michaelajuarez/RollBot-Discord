// Made by: Michael Juarez

require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client()
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  var tmp = msg.content.toUpperCase()
  var authorRole = msg.member.roles.highest.name
  var author = msg.member.id
  var rollTaker = "162997214199676928"
  let students = []
  if (tmp === "!ROLL" && (authorRole === "@the_boys" || author === "162997214199676928" || author == "172143655518208000")) {
    msg.channel.send("React to this!")
    .then(function (botMsg) {
      botMsg.react('✋')

      const filter = (reaction, user) => {
        return reaction.emoji.name === '✋' && user.id != botMsg.author.id
      }
      const collector = botMsg.createReactionCollector(filter, { time: 5000})

      console.log('Beginning to collect...')
      collector.on('collect', (reaction, user) => {
        console.log(`Collected "${reaction.emoji.name}" from ${user.tag}`)
        students.push(user.username)
      })
      collector.on('end', collected => {
        console.log(`Collected "${students.length}" items`)
        botMsg.edit("Alright, that's all for now folks!")
        
        // For some reason, sending a DM breaks the bot
        // const rollTaker = client.users.cache.get(rollTaker)
        // rollTaker.send('Test')

        // So, for now, I decided to just have it print out in the channel in which it is called. Will need to fix later.
        students.sort()
        var printArr = students.join('\n')
        msg.channel.send('>>> __***Rollcall:***__\n' + printArr)
      })
    })
  }
})

client.login(process.env.BOT_TOKEN)