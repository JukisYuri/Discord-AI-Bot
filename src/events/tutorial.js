const { isAIMode } = require("./flag")
const { EmbedBuilder } = require('discord.js')

async function helpCommands(userId) {
  const checkState = await isAIMode(userId)
  let respone = null
  if (checkState) {
    respone = new EmbedBuilder()
      .setTitle('🪐 Danh sách commands ☄️')
      .setColor('Random')
      .addFields({
        name: '👑 Lệnh khả dụng với AI-Mode',
        value: `
      **/checkstate**       → Kiểm tra trạng thái
      **/clearall**         → Xoá toàn bộ data (Author)
      **/disable-chat**     → Tắt chế độ AI Chat
      **/trackproject**     → Ghi nhớ toàn bộ codebase (Author)
      **/untrackproject**   → Quên toàn bộ codebase (Author)
    `
      })
      .setFooter({text: 'Bạn có thể dùng /disable-chat để có thể sử dụng các QOL khác..'})
  } else {
    respone = new EmbedBuilder()
     .setTitle('🔥 Danh sách commands 💥')
     .addFields({
      name: '🪭 Lệnh khả dụng khi không ở AI-Mode',
      value: `
    **/checkstate**      → Kiểm tra trạng thái
    **/clearall**        → Xoá toàn bộ data (Author)
    **/credit**          → Thông tin về bot
    **/open-chat**       → Bật chế độ AI Chat
    **/disable-chat**    → Tắt chế độ AI Chat
    **/trackproject**    → Ghi nhớ toàn bộ codebase (Author)
    **/untrackproject**  → Quên toàn bộ codebase (Author)
    **/ping**            → Kiểm tra ping 
    **/personalinfo**    → Tạo một đường dẫn trang cá nhân
    `
     })
     .setFooter({text: 'Hãy dùng lệnh /open-chat để trò chuyện cùng AI nào'})
  }
  return respone
}

module.exports = { helpCommands }