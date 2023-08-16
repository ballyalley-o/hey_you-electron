const MENU_VALUES = {
  label: 'Menu',

  ELECTRON: {
    label: 'Electron',
  },
  FILE: {
    label: 'File',
  },
  MENU: {
    label: 'Menu',
  },

  VIEW: {
    label: 'Developer',
  },
  DEV_TOOLS: {
    label: 'Developer Tools',
  },
  ADD_NOTE: {
    label: 'Add a Note',
    value: 'add-note',
    accelerator: 'CmdOrCtrl+N',
  },
  DELETE_NOTE: {
    label: 'Delete All',
    value: 'delete-note',
    accelerator: 'CmdOrCtrl+D',
  },
  QUIT: {
    label: 'Quit',
    value: 'quit',
    accelerator: 'CmdOrCtrl+Q',
  },
  RELOAD: {
    label: 'Reload',
    value: 'reload',
  },
}

module.exports = MENU_VALUES
