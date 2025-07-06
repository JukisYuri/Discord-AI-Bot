const { readAllFilesFromFolder, readOtherFileOutOfSrc } = require("../services/selfaware")
const path = require('path')

const foldersToRead = [
    { nameFolder: 'commands', path: path.join(__dirname, '../commands'), filterFolder: '.js' },
    { nameFolder: 'config', path: path.join(__dirname, '../config'), filterFolder: '.json' },
    { nameFolder: 'events', path: path.join(__dirname, '../events'), filterFolder: '.js' },
    { nameFolder: 'model', path: path.join(__dirname, '../model'), filterFolder: '.js' },
    { nameFolder: 'services', path: path.join(__dirname, '../services'), filterFolder: '.js' },
    { nameFolder: 'utils', path: path.join(__dirname, '../utils'), filterFolder: '.js' }
]

const fileOutSrcToRead = [
    { nameFile: 'index', path: path.join(__dirname, '..', '..', 'index.js')},
    { nameFile: 'deploy-commands', path: path.join(__dirname, '..', '..', 'deploy-commands.js')}
]

async function getAllFilesFromCodeBase(){
    return await readAllFilesFromFolder(foldersToRead)
}

async function getAllContentOutOfSrc() {
    return await readOtherFileOutOfSrc(fileOutSrcToRead)
}

module.exports = { getAllFilesFromCodeBase, getAllContentOutOfSrc }