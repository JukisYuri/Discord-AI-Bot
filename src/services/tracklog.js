const fs = require('fs')
const { DateTime } = require('luxon')

async function trackLog(aiStatus, user, message, destinateChannelId, client) {
    try {
    const messageContent = message.content
    const destinateChannel = await client.channels.fetch(destinateChannelId)
    const baseContext = `[${aiStatus}] ${user.username}: ${messageContent}`
    let attachmentLinks = null
    if (destinateChannel.isTextBased()){
        if (message.attachments.size > 0) {
            attachmentLinks = message.attachments.map(att => att.url).join('\n')
            await destinateChannel.send(`${baseContext}\n${attachmentLinks}`)
        } else {
            await destinateChannel.send(`${baseContext}`) 
        }
        await takeLogToJson(aiStatus, user, messageContent, attachmentLinks)
        }
    } catch (err) {
        console.error(err)
    }
}

async function takeLogToJson(aiStatus, user, messageContent, attachmentLinks) {
    try {
    const logEntry = {
        status: aiStatus,
        user: user.username,
        timestamp: DateTime.now().setZone("Asia/Ho_Chi_Minh").toISO(),
        message: messageContent,
        attachments: attachmentLinks
    }
    fs.appendFileSync('./src/database/trackinglog.jsonl', JSON.stringify(logEntry) + '\n')
    } catch (err){
    console.error(err)
    }
}

module.exports = { trackLog, takeLogToJson }