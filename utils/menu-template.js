const menuTemplate = (app) => {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Note',
          accelerator: 'CmdOrCtrl+N',
        },
        {
          label: 'Delete Note',
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
