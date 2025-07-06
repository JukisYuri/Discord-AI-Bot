const { SlashCommandBuilder } = require('discord.js')

const base = `https://discordapp.com/users/`
module.exports = {
    data: new SlashCommandBuilder()
        .setName('personalinfo')
        .setDescription('Tạo 1 đường link dẫn cho profile discord'),
    async execute(interaction){
        const userId = interaction.user.id
        await interaction.reply(`Link profile: ${base}${userId}`)
    }
}