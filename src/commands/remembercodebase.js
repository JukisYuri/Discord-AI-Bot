const { SlashCommandBuilder } = require('discord.js')
const { authorId } = require('../config/myconfig.json')
const { setFlagCheck, getFlagCheck } = require('../events/flagcodebase')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trackproject')
        .setDescription('Cho phép AI có thể hiểu toàn bộ codebase, nhưng bù lại sẽ tốn token nhớ'),
    async execute(interaction){
        const userId = interaction.user.id
        if (userId === authorId){
            if (getFlagCheck() === false){
                setFlagCheck(true)
                await interaction.reply("Đã bật tính năng nhớ Codebase cho hầu gái, với người dùng là Author")
            } else {
                await interaction.reply("Ngài đã bật nó rồi ạ, không cần bật lại nữa đâu. Toàn bộ codebase em đều nhớ hết mà~")
            }
        } else {
            await interaction.reply("Chủ nhân không phải là Author, nên không được dùng tính năng này")
        }
    }
}