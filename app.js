const electron = require('electron')
// assets
const menuTemplate = require('./utils/menu-template')
const createAddWindow = require('./actions')
// constants
const { PLATFORM, GLOBAL_CONFIG } = require('./config')
const { EVENTS, MENU_VALUES } = require('./constants')

const { app, BrowserWindow, Menu, ipcMain } = electron

let mainWindow
let addWindow

app.on(EVENTS.READY, () => {
  mainWindow = new BrowserWindow({})
  mainWindow.loadURL(`file://${__dirname}/views/main.html`)
  mainWindow.on(EVENTS.CLOSE, () => app.quit())

  const mainMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(mainMenu)
})

if (process.platform === PLATFORM.mac) {
  menuTemplate.unshift({
    label: MENU_VALUES.ELECTRON.label,
  })
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: MENU_VALUES.VIEW.label,
    submenu: [
      {
        label: MENU_VALUES.DEV_TOOLS.label,
        accelerator:
          process.platform === PLATFORM.mac ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools()
        },
      },
    ],
  })
}

ipcMain.on('note:add', (event, note) => {
  mainWindow.webContents.send('note:add', note)
  addWindow.close()
})

module.exports = mainWindow
