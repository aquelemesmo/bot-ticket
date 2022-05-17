const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../config.json")

module.exports = async (bot, interaction) => {
    if(interaction.isSelectMenu()) {
        if(interaction.values[0] === `${config.ticket.value}`) {
            interaction.deferUpdate()
            const channel = await interaction.message.guild.channels.create(`ticket-${interaction.user.discriminator}`, {
                parent: `${config.ticket_info.parent}`,
                type: `${config.ticket_info.type}`,
                permissionsOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    },
                    {
                        id: bot.user.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    },
                ]
            })
    
            const row = new MessageActionRow().addComponents(new MessageButton().setCustomId("close-ticket").setLabel("Fechar ticket").setStyle("DANGER"))
    
            const sendEmbedToChannel = new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Área do atendimento")
            .setDescription("Aqui você pode mandar sua dúvida que o suporte irá te atender a qualquer momento.")
            channel.send({embeds: [sendEmbedToChannel], components: [row]})
        }
    }
    if(interaction.isButton()) {
        if(interaction.customId === "close-ticket") {
            interaction.deferUpdate()
            interaction.channel.send("> O ticket vai ser deletado em 5 segundos")
            setTimeout(() => {
                interaction.channel.delete()
            }, 5000)
        }
    }
}