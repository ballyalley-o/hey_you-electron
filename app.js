const electron = require('electron')
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

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 500,
    height: 400,
    title: MENU_VALUES.ADD_NOTE.label,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  addWindow.loadURL(`file://${__dirname}/views/add.html`)
  addWindow.on(EVENTS.CLOSE, () => (addWindow = null))
}

ipcMain.on('note:add', (event, note) => {
  mainWindow.webContents.send('note:add', note)
  addWindow.close()
})

const menuTemplate = [
  {
    label: 'File',
  },
  {
    label: 'Menu',
    submenu: [
      {
        label: 'New Note',
        accelerator: 'CmdOrCtrl+N',
        click() {
          createAddWindow()
        },
      },
      {
        label: 'Delete Note',
        accelerator: 'CmdOrCtrl+D',
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click() {
          app.quit()
        },
      },
    ],
  },
]

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
