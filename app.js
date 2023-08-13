const electron = require('electron')
// assets
const menuTemplate = require('./utils/menu-template')
const createAddWindow = require('./actions')
// constants
const { PLATFORM, GLOBAL_CONFIG } = require('./config')
const { EVENTS, MENU, SUB_MENU } = require('./constants')

const { app, BrowserWindow, Menu } = electron

exports.mainWindow
exports.addWindow

app.on(EVENTS.READY, () => {
  mainWindow = new BrowserWindow({})
  mainWindow.loadURL(`file://${__dirname}/views/main.html`)
  mainWindow.on(EVENTS.CLOSE, () => app.quit())

  const mainMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(mainMenu)
})

if (process.platform === PLATFORM.mac) {
  menuTemplate.unshift({
    label: MENU.ELECTRON.label,
  })
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'View',
    submenu: [
      {
        label: 'Developer Tools',
        accelerator:
          process.platform === PLATFORM.mac ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools()
        },
      },
    ],
  })
}
