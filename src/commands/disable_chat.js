const { SlashCommandBuilder } = require('discord.js')
const { flagChecking } = require('../events/flag')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disable-chat')
        .setDescription('Tắt sử dụng Gemini AI mode'),
    async execute(interaction){
        const userId = interaction.user.id
        await interaction.reply('Đã tắt chế độ sử dụng AI, hẹn gặp lại nhé thưa chủ nhân, hihi~')
        await flagChecking(userId, false)
    },
}