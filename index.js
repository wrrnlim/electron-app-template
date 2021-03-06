/**
 * Electron related code
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const electron = require('electron');

const {
  app, BrowserWindow, ipcMain, shell, Menu,
} = electron; // ES6 destructuring -> equivalent to app = electron.app etc
const { autoUpdater } = require('electron-updater');

const debug = /--debug/.test(process.argv[2]);

let mainWindow;
let updateWindow;
const version = `v${app.getVersion()}`;
// eslint-disable-next-line no-console
console.log(`Starting ${version}`);

/**
 * Create the update window
 */
function createUpdateWindow() {
  if (!updateWindow) { // Prevent update window from being created multiple times
    updateWindow = new BrowserWindow({
      width: 400,
      height: 250,
      title: 'Updater',
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
      icon: './assets/icons/icon.ico', // TODO change icon path
    });
    updateWindow.loadFile('src/update.html');
    /* Wait for contents to load then set status */
    updateWindow.webContents.on('did-finish-load', () => {
      updateWindow.webContents.send('version', version);
    });
  } else {
    updateWindow.focus();
  }
  updateWindow.on('closed', () => { // set updateWindow to null so it can be created again
    updateWindow = null;
  });
}

/* Menus */
const menuTemplate = [ // TODO change menu items
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        accelerator: 'CmdOrCtrl+Q',
        role: 'quit',
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        role: 'reload',

      },
      { type: 'separator' },
      {
        label: 'Actual Size',
        accelerator: 'CmdOrCtrl+0',
        role: 'resetZoom',
      },
      {
        label: 'Zoom In',
        accelerator: 'CmdOrCtrl+=',
        role: 'zoomIn',
      },
      {
        label: 'Zoom Out',
        accelerator: 'CmdOrCtrl+-',
        role: 'zoomOut',
      },
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
    ],
  }, {
    label: 'Help',
    submenu: [
      {
        label: 'About',
        click: () => {
          shell.openExternal('https://github.com/wrrnlim/electron-app-template'); // TODO change URL
        },
      },
      {
        label: 'Report an Issue',
        click: () => {
          shell.openExternal('https://github.com/wrrnlim/electron-app-template/issues/new/choose'); // TODO change URL
        },
      },
      {
        label: 'Open Developer Tools',
        accelerator: 'CmdOrCtrl+Shift+I',
        role: 'toggleDevTools',
      },
      { type: 'separator' },
      {
        label: `App Version: ${version}`,
        enabled: false,
      },
      {
        label: 'Check for Updates',
        click: () => {
          createUpdateWindow();
          autoUpdater.checkForUpdatesAndNotify();
        },
      },
    ],
  },
];

/**
 * Create main window - Event based programming syntax
 */
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    title: 'Electron App Template', // TODO change window title
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    icon: './assets/img/icon.ico', // TODO change icon path
  });

  /* Open links in external browser */
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  /* Load index.html */
  mainWindow.loadFile('src/index.html');

  /* Open Dev Tools if --debug flag passed */
  if (debug) {
    mainWindow.webContents.openDevTools();
    // add debug menu items if needed
  }

  /* Menus */
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});

/**
 * Show status on update window
 */
function showStatus(status) {
  updateWindow.webContents.send('updater-data', status);
}

app.on('window-all-closed', () => {
  app.quit();
});

/**
 * Auto updater
 */
autoUpdater.on('checking-for-update', () => {
  showStatus('Checking for updates...');
});
autoUpdater.on('update-available', () => {
  showStatus('Update found! Download will begin shortly.');
});
autoUpdater.on('update-not-available', () => {
  showStatus('You have the newest version!');
});
autoUpdater.on('error', (err) => {
  showStatus(`Error in auto-updater. ${err}`);
});
autoUpdater.on('download-progress', (progressObj) => {
  showStatus(`Downloading: ${progressObj.percent.toFixed(2)}%`);
});
autoUpdater.on('update-downloaded', () => {
  updateWindow.webContents.send('show-buttons');
  showStatus('Update downloaded. Restart app to apply update.');
});

/**
 * IPC Listeners
 */
ipcMain.on('restart-app', () => {
  // eslint-disable-next-line no-undef
  autoUpdater.quitAndInstall(isSilent = true, isForceRunAfter = true);
});

ipcMain.on('close-update-window', () => {
  updateWindow.close();
});
