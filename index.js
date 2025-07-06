const { Client, Events, GatewayIntentBits, Collection, ActivityType } = require('discord.js')
const { isAIMode, loadAIState } = require('./src/events/flag')
const { bot_token } = require('./src/config/myconfig.json')
const fs = require('fs')
const path = require('path')
const { modelAI } = require('./src/model/model')
const { destinate_channel_Id } = require('./src/config/myconfig.json')
const { whiteListAllowedCommands } = require('./src/config/allowedcommands')

const client = new Client({ intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.DirectMessages
]})
client.commands = new Collection()
const commandsPath = path.join(__dirname, 'src', 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for(const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command)
    } else {
        console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
}

client.once(Events.ClientReady, readyClient => {
    loadAIState()
    client.user.setActivity('Yuri, Xin chào chủ nhân', { type: ActivityType.Listening })
	console.log(`Đã sẵn sàng! Logged với tư cách ${readyClient.user.tag}, Author: JukisYuri`);
});

client.on(Events.InteractionCreate, async interaction => {
    const user = interaction.user
    const commandName = interaction.commandName
    const isActive = await isAIMode(user.id) // Phải bắt buộc thêm await vì bên kia là phương thức async function
    if (!whiteListAllowedCommands().includes(commandName) && isActive){
        return interaction.reply({
            content: "Bạn đang ở trong AI Mode. Dùng Slash-Command /disable-chat để tắt tính năng này",
            ephemeral: true
        })
    }
    try {
        const command = client.commands.get(interaction.commandName)
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
    }
})

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.content.startsWith('/')) return;

    const channelId = message.channel.id
    const userId = message.author.id
    const user = await client.users.fetch(userId)
    const aiStatus = await isAIMode(userId)
    console.log(`[${aiStatus}] ${user.username}: ${message.content}`)

    if (aiStatus) {
      try {
        if (channelId === destinate_channel_Id){
            await modelAI(client, userId ,message.content)
        } else {
            console.log(`Người dùng ${userId} (hay ${user.username}) không nhắn trùng kênh, nên AI đã bỏ qua tin nhắn ấy`)
        }
      } catch (err) {
        console.error('Lỗi AI:', err)
      }
    }
  })

client.login(bot_token);