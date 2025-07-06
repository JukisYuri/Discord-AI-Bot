const fs = require('fs')
const path = require('path')

const { GoogleGenerativeAI } = require('@google/generative-ai')
const { splitMessage } = require('../utils/splitmessages')
const { destinate_channel_Id } = require('../config/myconfig.json')
const { gemini_api_token } = require('../config/myconfig.json')
const { writeMemoryLog, getMemoryLog } = require('../utils/writelog')
const { createBasePromptForUser } = require('../services/basepersonal_users')
const { authorId } = require('../config/myconfig.json')
const { createBasePromptForAuthor } = require('../services/basepersonal_author')
const { getAllFilesFromCodeBase, getAllContentOutOfSrc } = require('../config/codebase')
const { getFlagCheck } = require('../events/flagcodebase')

// --------
const pathUser = path.join(__dirname, '../config/personaluser.json')
const pathBot = path.join(__dirname, '../config/personalbot.json')
const pathAuthor = path.join(__dirname, '../config/personalauthor.json')
// readFileSync là đọc nội dung trong file, còn readdirSync là liệt kê file trong thư mục
const personalUser = JSON.parse(fs.readFileSync(pathUser), 'utf-8')
const personalBot = JSON.parse(fs.readFileSync(pathBot), 'utf-8')
const personalAuthor = JSON.parse(fs.readFileSync(pathAuthor), 'utf-8')

const genAI = new GoogleGenerativeAI(gemini_api_token)

async function modelAI(client, userId, textInput) {
    let retries = 3
    const selectSystemInstruction = userId === authorId ? createBasePromptForAuthor(personalAuthor, personalBot) : createBasePromptForUser(personalUser, personalBot)

    let codeBaseContext = "Không có thông tin"
    let codeBaseContentOutOfSrc = "Không có thông tin"
    if (getFlagCheck() === true){
      if (userId === authorId){
        const files = await getAllFilesFromCodeBase()
        const filesOutOfSrc = await getAllContentOutOfSrc()
        codeBaseContext = files.map(f => `📁 [${f.folder}] ${f.file}\n${f.content}`).join('\n\n')
        codeBaseContentOutOfSrc = filesOutOfSrc.map(f => `📄 ${f.file}\n${f.content}`).join('\n\n')
      }
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction : `${selectSystemInstruction}\n\n 
      Và đây là những dòng code tạo ra chính bạn: ${codeBaseContext}\n\n
      Và đây cũng là những dòng code tạo ra chính bạn, nhưng ở bên ngoài thư mục source code: ${codeBaseContentOutOfSrc}\n\n
      ⚠️ Nếu tất cả đều là "Không có thông tin", bạn không được đoán. Hãy thành thật rằng bạn không có quyền truy cập codebase. Người kiểm tra bạn có thể là chính Author, là người có UserID là 607183227911667746.`
    })
    const destinateChannel = await client.channels.fetch(destinate_channel_Id)
    const memoryLog = getMemoryLog(userId, 20)

    while (retries--){
      try {
        memoryLog.push({
          role: "user",
          parts: [{ text: textInput }]
        })
      const result = await model.generateContent({contents: memoryLog})
      const response = result.response
      const text = response.text()

      if (text.length > 0){
        const chunkMessages = splitMessage(text)
        for (const chunk of chunkMessages){
          await destinateChannel.send(chunk)
        }
        writeMemoryLog({
          userId,
          prompt: textInput,
          response: text
        })
      }
      return;
    } catch (error){
      if (error.status == 503 && retries > 0) {
        console.warn("Phía Gemini Server bị quá tải")   
        await new Promise(res => setTimeout(res, 2000))
        continue; 
    }
    console.error(error)
    await destinateChannel.send("AI bị ngu rồi, thông cảm, hãy thử lại xem")
    return;
  }
}
}

module.exports = { modelAI }
