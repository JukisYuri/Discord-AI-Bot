const { isAIMode } = require("./flag")

async function helpCommands(userId) {
  const checkState = await isAIMode(userId)
  if (checkState) {
  return `\nVì chủ nhân đang ở trong AI-Mode nên câu lệnh sẽ được update như sau:
  \`\`\`
  /checkstate      → Kiểm tra trạng thái
  /clearall        → Xoá toàn bộ data (Author)
  /disable-chat    → Tắt chế độ AI Chat
  /trackproject    → Ghi nhớ toàn bộ codebase (Author)
  /untrackproject  → Quên toàn bộ codebase (Author) \`\`\`
  `
  } else {
    return `\nVì chủ nhân đang __không__ ở trong AI-Mode nên câu lệnh sẽ được update như sau:
    \`\`\`
    /checkstate      → Kiểm tra trạng thái
    /clearall        → Xoá toàn bộ data (Author)
    /credit          → Thông tin về bot
    /open-chat       → Bật chế độ AI Chat
    /disable-chat    → Tắt chế độ AI Chat
    /trackproject    → Ghi nhớ toàn bộ codebase (Author)
    /untrackproject  → Quên toàn bộ codebase (Author)
    /ping            → Kiểm tra ping 
    /personalinfo    → Tạo một đường dẫn trang cá nhân\`\`\`
    `
  }
}

module.exports = { helpCommands }