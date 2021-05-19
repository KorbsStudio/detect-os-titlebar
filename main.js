const {app, BrowserWindow} = require('electron')
const path = require('path');

var osvar = process.platform; /* Detecting OS */
if (osvar == 'darwin') {app.whenReady().then(() => {createWindowMac()})
}else if(osvar == 'win32'){app.whenReady().then(() => {createWindowWin()})
}else{app.whenReady().then(() => {createWindowLinux()})}

function createWindowWin () { /* Windows */
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    closable: true,
    maximizable: true,
    minimizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  mainWindow.loadFile('index.html')
}
function createWindowMac () { /* macOS */
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    closable: true,
    maximizable: true,
    minimizable: true,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  mainWindow.loadFile('index.html')
}
function createWindowLinux () { /* Linux */
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    closable: true,
    maximizable: true,
    minimizable: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  mainWindow.loadFile('index.html');
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.insertCSS('#titlebar{display: none !important;}') /* Remove Windows Titlebar if OS is Linux */
 });
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})