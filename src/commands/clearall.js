const { SlashCommandBuilder } = require('discord.js')
const { clearAllAIState } = require('../events/flag')
const { authorId } = require('../config/myconfig.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearall')
        .setDescription('Dùng để xoá hết tất cả dữ liệu người dùng trong AI-Mode'),
    async execute(interaction){
        const checkIsAuthor = interaction.user.id
        if (checkIsAuthor === authorId){
            clearAllAIState()
            await interaction.reply("Đã xoá thành công toàn bộ dữ liệu người dùng với AI trừ prompt mở đầu")
        } else {
            await interaction.reply("Bạn không phải là author để sử dụng lệnh slash này")
        }
    },
}