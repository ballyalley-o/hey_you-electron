const electron = require('electron')
// constants
const { PLATFORM, GLOBAL_CONFIG } = require('./config')
const { EVENTS, MENU_VALUES } = require('./constants')

const { app, BrowserWindow, Menu, ipcMain } = electron

let mainWindow
let addWindow

app.on(EVENTS.READY, () => {
  mainWindow = new BrowserWindow({
    width: GLOBAL_CONFIG.WIDTH,
    height: GLOBAL_CONFIG.HEIGHT,
    //  newer versions of electron require this,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
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
    // newer versions of electron require this,
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
    label: MENU_VALUES.FILE.label,
  },
  {
    label: MENU_VALUES.MENU.label,
    submenu: [
      {
        label: MENU_VALUES.ADD_NOTE.label,
        accelerator: MENU_VALUES.ADD_NOTE.accelerator,
        click() {
          createAddWindow()
        },
      },
      {
        role: MENU_VALUES.RELOAD.value,
      },
      {
        label: MENU_VALUES.DELETE_NOTE.label,
        accelerator: MENU_VALUES.DELETE_NOTE.accelerator,
        click() {
          mainWindow.webContents.send('note:clear')
        },
      },
      {
        label: MENU_VALUES.QUIT.label,
        accelerator: MENU_VALUES.QUIT.accelerator,
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
          process.platform === PLATFORM.mac.value
            ? PLATFORM.mac.accelerator
            : PLATFORM._def.accelerator,
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools()
        },
      },
    ],
  })
}
