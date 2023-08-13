const electron = require('electron')
// assets
const menuTemplate = require('./utils/menu-template')
// constants
const { PLATFORM } = require('./config')
const { EVENTS } = require('./constants')

const { app, BrowserWindow, Menu } = electron

let mainWindow

app.on(EVENTS.READY, () => {
  mainWindow = new BrowserWindow({})
  mainWindow.loadURL(`file://${__dirname}/main.html`)

  const mainMenu = Menu.buildFromTemplate(menuTemplate(app))
  Menu.setApplicationMenu(mainMenu)
})

if (process.platform === PLATFORM.mac) {
  menuTemplate(app).unshift({
    label: 'Electron',
  })
}
