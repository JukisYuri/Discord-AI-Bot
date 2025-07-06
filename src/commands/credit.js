const { SlashCommandBuilder } = require('discord.js')
const { myCredit } = require('../events/credit')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('credit')
        .setDescription('Thông tin toàn bộ về JukisYuri và bot'), // có dấu phẩy để kết thúc thuộc tính "data"
    async execute(interaction) {
        const authorCredit = await myCredit()
        await interaction.reply(authorCredit)
    },
}