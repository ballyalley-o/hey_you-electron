const menuTemplate = (app) => {
  return [
    {
      label: 'File',
    },
    {
      label: 'Menu',
      submenu: [
        {
          label: 'New Note',
          accelerator: 'CmdOrCtrl+N',
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
}

module.exports = menuTemplate
