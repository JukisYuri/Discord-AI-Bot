const { SlashCommandBuilder } = require('discord.js')
const { isAIMode } = require('../events/flag')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkstate')
        .setDescription('Kiểm tra trạng thái của AI-Mode đang là Online hay Offline'),
    async execute(interaction){
        const userId = interaction.user.id
        const aiState = await isAIMode(userId)
        if (aiState){
            await interaction.reply(`Chủ nhân đang ở trạng thái online của AI-Mode`)
        } else {
            await interaction.reply(`Chủ nhân đang ở trạng thái offline của AI-Mode`)
        }
    },
}