const readline = require('readline')
const c = require('ansi-colors')

let flag = false
async function responeTerminal(client) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    async function processTerminal(){
    rl.question(c.magentaBright("DestinateChannel ID: "), async (id) => {
        let destinateChannelId = id.trim()
        if (destinateChannelId){ 
            console.log(c.yellow("[Start]") + c.green(" Bây giờ hãy nhắn tin thử")) 
        } else {
            console.log(c.yellow("[End]") + c.green(" Đã kết thúc việc nhắn tin")) 
            rl.close()
            return;
        }
        rl.setPrompt('')
        rl.prompt()

    rl.on('line', async (line) => {
        const message = line.trim()
        if (message === 'exit'){
            console.log(c.yellow("[End]") + c.green(" Đã kết thúc việc nhắn tin")) 
            rl.close()
            return;
        }
        if (message === 'restart'){
            flag = true
            rl.removeAllListeners('line')
            console.log(c.yellow("[Restart]") + c.green(" Đã Restart"))
            processTerminal()
            return;
        }
        try {
            const destinateChannel = await client.channels.fetch(destinateChannelId)
            await destinateChannel.send(message)
            console.log(c.yellow("[Sent]") + c.green(` ✔`))
        } catch (e){
            console.error(c.red('Failed to send:'), err)
        }
        rl.prompt()
    })
    })
    }
    processTerminal()
}

module.exports = { responeTerminal }