const {app, BrowserWindow} = require('electron')
const path = require('path');

if (path.sep === "\\") {
    app.whenReady().then(() => {createWindowWin()}) /* If the OS is Windows, it will run "createWindowWin" */
} else {
app.whenReady().then(() => {createWindowLinux()}) /* If the OS is Windows, it will run "createWindowLinux" */
}

function createWindowWin () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')

}

function createWindowLinux () {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      frame: true,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    mainWindow.loadFile('index.html')
  
  }



app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
