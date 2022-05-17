const config = require("../../config.json")

module.exports = async (bot,message) => {
    if(message.author.bot || message.type.channel === "dm") return;

    let prefix = config.bot.prefix
    let args = message.content.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()

    let arquivoCommand = bot.commands.get(cmd)

    try {
        arquivoCommand.run(bot,message,args)
    } catch(e) {
        console.log(e.stack)
    }
}