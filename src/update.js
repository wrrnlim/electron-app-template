const { ipcRenderer } = require('electron');

ipcRenderer.on('updater-data', (event, status) => {
    document.getElementById('status_text').innerHTML = status;
});

ipcRenderer.on('version', (event, version) => {
    document.getElementById('version_text').innerHTML = version;
});

ipcRenderer.on('show-buttons', (event) => {
    document.getElementById('restartBtn').hidden = false;
    document.getElementById('laterBtn').hidden = false;
});

document.getElementById('restartBtn').addEventListener('click', () => {
    ipcRenderer.send('restart-app');
});

document.getElementById('laterBtn').addEventListener('click', () => {
    ipcRenderer.send('close-update-window');
});
