const fs = require('fs');
const path = require('path');
let aiUsers = new Set();
const pathLog = path.join(__dirname, '../config/AI_state.json')
const c = require('ansi-colors')

function loadAIState(){
    try {
        if (fs.existsSync(pathLog)){
            const raw = fs.readFileSync(pathLog, 'utf-8')
            const ids = JSON.parse(raw)
            aiUsers = new Set(ids)
            console.log(`✅ Đã load ` + c.cyanBright(aiUsers.size) + ` users trong AI-Mode`)
        }
    } catch (error) {
        console.error(error)
    }
}

function clearAllAIState(){
    const dir = path.join(__dirname, '../database')
    try {
        const files = fs.readdirSync(dir)
        for (const file of files){
            const filePath = path.join(dir, file)
            fs.unlinkSync(filePath)
        }
        console.log(c.redBright("Đã xoá toàn bộ dữ liệu của AI với người dùng"))
    } catch (error){
        console.error(error)
    }
}

function saveAIState() { // Hàm nội bộ, không dùng ở bên ngoài
    try {
      fs.writeFileSync(pathLog, JSON.stringify([...aiUsers], null, 2));
    } catch (err) {
      console.error('❌ Không thể ghi AI State:', err);
    }
  }

async function flagChecking(userId, checked) {
    if (checked){
        // AI Mode
        console.log(c.green(`AI Mode is online for ${userId}`))
        aiUsers.add(userId)
    } else {
        // Normal Mode
        console.log(c.gray(`AI Mode is offline for ${userId}`))
        aiUsers.delete(userId)
    }
    saveAIState()
}

async function isAIMode(userId) {
    return aiUsers.has(userId)
}

module.exports = { flagChecking, isAIMode, loadAIState, clearAllAIState }