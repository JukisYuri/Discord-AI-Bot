const fs = require('fs')
const { DateTime } = require('luxon')

async function trackLog(aiStatus, user, message, destinateChannelId, client) {
    try {
    const messageContent = message.content
    const destinateChannel = await client.channels.fetch(destinateChannelId)
    if (destinateChannel.isTextBased()){
        await takeLogToJson(aiStatus, user, messageContent)
        await destinateChannel.send(`[${aiStatus}] ${user.username}: ${messageContent}`) 
        }
    } catch (err) {
        console.error(err)
    }
}

async function takeLogToJson(aiStatus, user, messageContent) {
    try {
    const logEntry = {
        status: aiStatus,
        user: user.username,
        timestamp: DateTime.now().setZone("Asia/Ho_Chi_Minh").toISO(),
        message: messageContent
    }
    fs.appendFileSync('./src/database/trackinglog.jsonl', JSON.stringify(logEntry) + '\n')
    } catch (err){
    console.error(err)
    }
}

module.exports = { trackLog, takeLogToJson }