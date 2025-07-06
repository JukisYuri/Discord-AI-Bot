const { SlashCommandBuilder } = require('discord.js')
const { flagChecking } = require('../events/flag')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('open-chat')
        .setDescription('Sử dụng Gemini AI để nói chuyện'),
    async execute(interaction){
        const userId = interaction.user.id
        await interaction.reply('Đã bật chế độ sử dụng AI, chủ nhân có thể nhắn những gì ngài thích, hãy lưu ý rằng ngài sẽ không được dùng một vài Slash Command trong quá trình đang nhắn với AI nhé, hehe~')
        await flagChecking(userId, true)
    },
}