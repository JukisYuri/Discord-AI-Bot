// Được sử dụng khi thay đổi bất kì commands gì
const { REST, Routes } = require('discord.js')
const { clientId, guildId, bot_token } = require('./src/config/myconfig.json')
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
		console.log(`Started refreshing ${commands.length} application (/) commands.`)
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		)
		console.log(`Successfully reloaded ${data.length} application (/) commands.`)
	} catch (error) {
		console.error(error)
	}
})();
