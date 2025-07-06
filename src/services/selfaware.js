const fs = require('fs')
const path = require('path')

// const commandsFolder = path.join(__dirname, '../commands')
// const configFolder = path.join(__dirname, '../config')
// const eventsFolder = path.join(__dirname, '../events')
// const modelFolder = path.join(__dirname, '../model')
// const servicesFolder = path.join(__dirname, '../services')
// const ultilsFolder = path.join(__dirname, '../utils')

// const commandsFile = fs.readdirSync(commandsFolder).filter(file => file.endsWith('.js'))
// const configFile = fs.readdirSync(configFolder).filter(file => file.endsWith('.json'))
// const eventsFile = fs.readdirSync(eventsFolder).filter(file => file.endsWith('.js'))
// const modelFile = fs.readdirSync(modelFolder).filter(file => file.endsWith('.js'))
// const servicesFile = fs.readdirSync(servicesFolder).filter(file => file.endsWith('.js'))
// const ultilsFile = fs.readdirSync(ultilsFolder).filter(file => file.endsWith('.js'))

// codebase.js

async function readAllFilesFromFolder(folders) {
    const result = []
    for (const {nameFolder , path: folderPath, filterFolder} of folders){
        if (!fs.existsSync(folderPath)) continue
        const files = fs.readdirSync(folderPath).filter(file => file.endsWith(filterFolder))

        for (const file of files){
            const fullPath = path.join(folderPath, file)
            const content = fs.readFileSync(fullPath, 'utf-8')
            result.push({folder: nameFolder, file, content})
        }
    }
    return result
}

async function readOtherFileOutOfSrc(files){
    const result = []
    for (const {nameFile, path: filePath} of files){
        if (!fs.existsSync(filePath)) continue
        const content = fs.readFileSync(filePath, 'utf-8')
        result.push({file: nameFile, content})
    }
    return result
}

module.exports = { readAllFilesFromFolder, readOtherFileOutOfSrc }

