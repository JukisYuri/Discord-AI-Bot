const { SlashCommandBuilder } = require('discord.js')
const { helpCommands } = require('../events/tutorial')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Cách dùng các Commands'),
    async execute(interaction){
        const userId = interaction.user.id
        const msg = await helpCommands(userId)
        await interaction.reply({ embeds: [msg] })
    },
}