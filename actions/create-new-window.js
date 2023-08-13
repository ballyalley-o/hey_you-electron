const electron = require('electron')
const { BrowserWindow } = electron

function createAddWindow(newWindow) {
  newWindow = new BrowserWindow({
    width: 500,
    height: 400,
    title: 'Add New Todo',
  })
  newWindow.loadURL(`file://${__dirname}/../views/add.html`)
  return newWindow
}

module.exports = createAddWindow
