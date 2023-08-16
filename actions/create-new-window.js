const electron = require('electron')
const { BrowserWindow } = electron

function createAddWindow(addWindow) {
  addWindow = new BrowserWindow({
    width: 500,
    height: 400,
    title: 'Add New Todo',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  addWindow.loadURL(`file://${__dirname}/../views/add.html`)
}

module.exports = createAddWindow
// export newWindow
