/**
 * Electron related code
 */
const electron = require('electron');
const { app, BrowserWindow, ipcMain, shell, Menu } = electron; // ES6 destructuring -> equivalent to app = electron.app etc
const { autoUpdater } = require("electron-updater");


let mainWindow, data, updateWindow;
const version = `v${app.getVersion()}`;
console.log(`Starting ${version}`);

/* Menus */
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Exit',
                accelerator: 'CmdOrCtrl+Q',
                role: 'quit'
            }
        ],
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                role: 'reload'

            },
            { type: 'separator' },
            {
                label: 'Actual Size',
                accelerator: 'CmdOrCtrl+0',
                role: 'resetZoom'
            },
            {
                label: 'Zoom In',
                accelerator: 'CmdOrCtrl+=',
                role: 'zoomIn'
            },
            {
                label: 'Zoom Out',
                accelerator: 'CmdOrCtrl+-',
                role: 'zoomOut'
            },
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
        ]
    }, {
        label: 'Help',
        submenu: [
            { 
                label: 'About',
                click: () => {
                    shell.openExternal('https://github.com/wrrnlim/electron-app-template')
                }
            },
            {
                label: 'Report an Issue',
                click: () => {
                    shell.openExternal('https://github.com/wrrnlim/electron-app-template/new/choose')
                }
            },
            {
                label: 'Open Developer Tools',
                accelerator: 'CmdOrCtrl+Shift+I',
                role: 'toggleDevTools'
            },
            { type: 'separator' },
            {
                label: 'App Version: ' + version,
                enabled: false
            },
            {
                label: 'Check for Updates',
                click: () => {
                    createUpdateWindow();
                    autoUpdater.checkForUpdatesAndNotify();
                }
            },
        ]
    }
]

/**
 * Create main window - Event based programming syntax 
 */
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: 'Electron App Template',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    /* Open links in external browser */
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    /* Load index.html */
    mainWindow.loadFile('src/index.html');

    /* Menus */
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
});

/**
 * Create the update window
 */
function createUpdateWindow() {
    if (!updateWindow) { // Prevent update window from being created multiple times
        updateWindow = new BrowserWindow({
            width: 400,
            height: 210,
            title: 'Updater',
            parent: mainWindow,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
            }
        });
        updateWindow.setMenu(null);
        updateWindow.loadFile('src/update.html');
        /* Wait for contents to load then set status */
        updateWindow.webContents.on('did-finish-load', () => {
            updateWindow.webContents.send('version', version);
        });
    }
    else {
        updateWindow.focus();
    }
    updateWindow.on('closed', () => { // set updateWindow to null so it can be created again
        updateWindow = null;
    });
}

/**
 * Show status on update window
 */
function showStatus(status) {
    updateWindow.webContents.send('updater-data', status);
}

/**
 * Auto updater
 */
autoUpdater.on('checking-for-update', () => {
    showStatus('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
    showStatus('Update found! Installation will begin shortly.');
})
autoUpdater.on('update-not-available', (info) => {
    showStatus('You have the newest version!');
})
autoUpdater.on('error', (err) => {
    showStatus('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
    showStatus('Downloading: ' + progressObj.percent.toFixed(2) + '%');
})
autoUpdater.on('update-downloaded', (info) => {
    showStatus('Update downloaded. Restart the app to apply update.');
});

/**
 * IPC Listeners
 */
ipcMain.on('app-restart', (event) => {
    mainWindow.loadFile('src/index.html');
});

ipcMain.on('open-folder', (event, path) => {
    console.log(path);
    shell.showItemInFolder(path);
});

ipcMain.on('format-done', (event, formattedData) => {
    data = formattedData;
    mainWindow.webContents.send('formatted-data', data);
    mainWindow.loadFile('src/save.html');
});

ipcMain.on('data-request', (event) => {
    mainWindow.webContents.send('formatted-data', data);
});
