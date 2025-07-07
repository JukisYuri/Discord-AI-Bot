const fs = require('fs')
const { DateTime } = require('luxon')

async function trackLog(aiStatus, user, message, destinateChannelId, client) {
    try {
    const destinateChannel = await client.channels.fetch(destinateChannelId)
    if (destinateChannel.isTextBased()){
        await takeLogToJson(aiStatus, user, message)
        await destinateChannel.send(`[${aiStatus}] ${user.username}: ${message}`) 
        }
    } catch (err) {
        console.error(err)
    }
}

async function takeLogToJson(aiStatus, user, message) {
    try {
    const logEntry = {
        status: aiStatus,
        user: user.username,
        timestamp: DateTime.now().setZone("Asia/Ho_Chi_Minh").toISO(),
        message: message
    }
    fs.appendFileSync('./src/database/trackinglog.jsonl', JSON.stringify(logEntry) + '\n')
    } catch (err){
    console.error(err)
    }
}

module.exports = { trackLog, takeLogToJson }