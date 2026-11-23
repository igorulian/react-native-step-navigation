const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)
const libModules = path.resolve(__dirname, '../node_modules')
config.watchFolders = [path.resolve(__dirname, '../src')]
config.resolver.nodeModulesPaths = [path.resolve(__dirname, 'node_modules')]
config.resolver.blockList = [new RegExp(`^${libModules.replace(/[/\\]/g, '[/\\\\]')}[/\\\\].*`)]
module.exports = config
