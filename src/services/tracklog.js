const fs = require('fs')
const { DateTime } = require('luxon')

async function trackLog(guild, channel, aiStatus, user, message, destinateChannelId, client) {
    try {
    const messageContent = message.content
    const destinateChannel = await client.channels.fetch(destinateChannelId)
    const baseContext = `[${guild}] **${user.username}**: ${messageContent}`
    let attachmentLinks = null
    if (destinateChannel.isTextBased()){
        if (message.attachments.size > 0) {
            attachmentLinks = message.attachments.map(att => att.url).join('\n')
            await destinateChannel.send(`${baseContext}\n${attachmentLinks}`)
        } else {
            await destinateChannel.send(`${baseContext}`) 
        }
        await appendGuildLogToJson(guild, channel, user, messageContent, attachmentLinks)
        await appendAILogToJson(aiStatus, user)
        await detectChannelId(channel)
        }
    } catch (err) {
        console.error(err)
    }
}

async function appendAILogToJson(aiStatus, user) {
    try {
        let logAIEntry = {
            status: aiStatus,
            user: user.username,
            timestamp: DateTime.now().setZone("Asia/Ho_Chi_Minh").toISO(),
        }
    fs.appendFileSync('./src/database/trackinglog.jsonl', JSON.stringify(logAIEntry) + '\n')
    } catch (err){
        console.error(err)
    }
}

async function appendGuildLogToJson(guild, channel, user, messageContent, attachmentLinks){
    try {
        let logGuildEntry = {
            server: `${guild} - ${channel.name}`,
            user: user.username,
            timestamp: DateTime.now().setZone("Asia/Ho_Chi_Minh").toISO(),
            message: messageContent,
            ...(attachmentLinks !== null && { attachments: attachmentLinks })
        }
    fs.appendFileSync('./src/database/trackinglog2.jsonl', JSON.stringify(logGuildEntry) + '\n')
    } catch (err){
        console.error(err)
    }
}

async function detectChannelId(channel) {
    try {
        let logChannelId = {
            channel: `${channel.name}`,
            ID: `${channel.id}`
        }
        const filePath = './src/database/channelId.jsonl'
        if (!fs.existsSync(filePath)){
            fs.writeFileSync(filePath, '')
        }
        const lines = fs.readFileSync('./src/database/channelId.jsonl', 'utf8').split('\n').filter(Boolean)
        let exist = false
        for (const line of lines){
            const obj = JSON.parse(line)
            if (logChannelId.ID === obj.ID){
                exist = true
                break;
            }
        }
        if (!exist){
            fs.appendFileSync('./src/database/channelId.jsonl', JSON.stringify(logChannelId) + '\n')
        }
    } catch (err){
        console.error(err)
    }
}

module.exports = { trackLog, appendAILogToJson, appendGuildLogToJson, detectChannelId }