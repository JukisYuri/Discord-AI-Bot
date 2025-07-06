const fs = require('fs')
const { DateTime } = require('luxon')
const path = require('path')

// Hàm ghi log
function writeMemoryLog({ userId, prompt, response }) {
    const logPath = path.join(__dirname, '../database', `${userId}.json`)
    const logEntry = {
      userId,
      timestamp: DateTime.now().setZone("Asia/Ho_Chi_Minh").toISO(),
      prompt,
      response
    }
  
    let existingLog = []
  
    try {
      if (fs.existsSync(logPath)) {
        const file = fs.readFileSync(logPath, 'utf-8')
        if (file.trim()){ // giúp phát hiện file rỗng hay không
            existingLog = JSON.parse(file)
        } else {
            console.error('File log ban đầu rỗng, bắt đầu ghi lại log mới')
        }
      }
    } catch (err) {
      console.error('❌ Lỗi khi đọc log:', err)
    }
  
    existingLog.push(logEntry)
  
    try {
      fs.writeFileSync(logPath, JSON.stringify(existingLog, null, 2))
    } catch (err) {
      console.error('❌ Lỗi khi ghi log:', err)
    }
  }

function getMemoryLog(userId, maxMessages){
    const logPath = path.join(__dirname, '../database', `${userId}.json`)
    const messages = []

    // Đọc tin nhắn từ log
    try {
      if (!fs.existsSync(logPath)) return []
      const content = fs.readFileSync(logPath, 'utf-8')
      if (!content.trim()) return []
      const all = JSON.parse(content)
      for (const entry of all.slice(-maxMessages)) {
          messages.push({
            role: "user",
            parts: [{ text: `🧾 [UserID: ${entry.userId}] 🕒 [Time: ${entry.timestamp}]\n💬 ${entry.prompt}` }]
          })
    
          messages.push({
            role: "model",
            parts: [{ text: entry.response }]
          })
        }
      return messages
  } catch (error) {
    console.error(error)
  }
} 

  module.exports = { writeMemoryLog, getMemoryLog }