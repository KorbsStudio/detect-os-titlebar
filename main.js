const {app, BrowserWindow} = require('electron')
const path = require('path');

var osvar = process.platform;
if (osvar == 'darwin') { /* Detecting OS */
    console.log("you are on a mac os");
    app.whenReady().then(() => {createWindowMac()})
}else if(osvar == 'win32'){
    console.log("you are on a windows os")
    app.whenReady().then(() => {createWindowWin()})
}else{
    console.log("unknown os")
    app.whenReady().then(() => {createWindowLinux()})
}

function createWindowWin () { /* Windows */
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
function createWindowMac () { /* macOS */
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}
function createWindowLinux () { /* Linux */
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