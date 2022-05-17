const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js")
const config = require("../../config.json")

module.exports.run = async (bot,message,args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply(config.mensagem.sem_permissao)
    if(!message.guild.me.permissions.has("ADMINISTRATOR")) return message.reply(config.mensagem.sem_permissao_bot)

    const canal = message.mentions.channels.first()

    if(!canal) return message.reply(config.mensagem.mencionar_canal)

    const row = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId("ticket-id").setPlaceholder(config.ticket.placeholder).addOptions([{label: config.ticket.label,description: config.ticket.description,value: config.ticket.value}]))
    
    const embed = new MessageEmbed()
    .setColor(config.ticket_embed.color)
    .setTitle(config.ticket_embed.title)
    .setDescription(config.ticket_embed.description)
    canal.send({embeds: [embed], components: [row]})
}

module.exports.help = {
    name: "ticket"
}