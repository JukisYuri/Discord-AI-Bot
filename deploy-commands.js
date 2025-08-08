// Được sử dụng khi thay đổi bất kì commands gì
const { REST, Routes } = require('discord.js')
const { clientId, guildId, bot_token } = require('./src/config/myconfig.json')
const c = require('ansi-colors')
const fs = require('fs')
const path = require('path')

const commands = []
const commandsPath = path.join(__dirname, 'src', 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')) //Dùng fs để đọc tất cả file thư mục chứa trong commands, sau đó lọc file có đuôi .js

for (const file of commandFiles) {
	const command = require(path.join(commandsPath, file))
	commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(bot_token);

(async () => {
	try {
		console.log(`Analysis ${commands.length} application (/) commands`)
		for (const chunkGuild of guildId){
			const data = await rest.put(
				Routes.applicationGuildCommands(clientId, chunkGuild),
				{ body: commands },
			)
			console.log(c.greenBright(`Successfully reloaded ${data.length} application (/) commands in ${chunkGuild}.`))
		}
	} catch (error) {
		console.error(error)
		console.log(c.redBright(`Failed at refreshing ${commands.length} application (/) commands in ${chunkGuild}.`))
	}
})();
