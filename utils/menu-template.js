const electron = require('electron')
const { createAddWindow } = require('../actions')
const { app } = electron
const addWindow = require('../app')

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
