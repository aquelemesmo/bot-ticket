const { Client, Collection } = require("discord.js")
const fs = require("node:fs")
const bot = new Client({intents: 32767})
const config = require("./config.json")
bot.commands = new Collection()

fs.readdir("./src/commands", (err, files) => {
    if(err) console.error(err)
    let arquivojs = files.filter(f => f.split(".").pop() === "js")
    arquivojs.forEach((f, i) => {
        let props = require(`./src/commands/${f}`)
        bot.commands.set(props.help.name, props)
    })
})

fs.readdir("./src/events", (err, files) => {
    if(err) console.error(err)
    files.forEach((f, i) => {
        let props = require(`./src/events/${f}`)
        let eventName = f.split(".")[0]
        bot.on(eventName, props.bind(null, bot))
    })
})


bot.login(config.bot.token)