const { SlashCommandBuilder } = require('discord.js')
const { authorId } = require('../config/myconfig.json')
const { setFlagCheck, getFlagCheck } = require('../events/flagcodebase')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('untrackproject')
        .setDescription('Cho phép AI mất khả năng hiểu toàn bộ codebase, nhưng bù lại sẽ lấy lại token nhớ'),
    async execute(interaction){
        const userId = interaction.user.id
        if (userId === authorId){
            if (getFlagCheck() === true){
                setFlagCheck(false)
                await interaction.reply("Đã tắt tính năng nhớ Codebase cho hầu gái, với người dùng là Author")
            } else {
                await interaction.reply("Ngài đã tắt nó rồi ạ, không cần tắt lại nữa đâu")
            }
        } else {
            await interaction.reply("Chủ nhân không phải là Author, nên không được dùng tính năng này")
        }
    }
}