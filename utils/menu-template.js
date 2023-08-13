const electron = require('electron')
const { createAddWindow } = require('../actions')
const { app, ipcMain } = electron
const { addWindow, mainWindow } = require('../app')

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
          createAddWindow(addWindow)
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

module.exports = menuTemplate
