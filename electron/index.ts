// Native
import path from 'path';

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, dialog } from 'electron';
import isDev from 'electron-is-dev';

const { Worker } = require('worker_threads');

const height = 800;
const width = 1280;

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width,
    height,
    autoHideMenuBar: true,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegrationInWorker: true
    }
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : path.join(__dirname, '../src/out/index.html');

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }
  // Open the DevTools.
  window.webContents.openDevTools({ mode: 'detach' });

  ipcMain.on('openDialog', () => {
    dialog
      .showOpenDialog({ properties: ['openDirectory'] })
      .then((result) => {
        if (!result.canceled) {
          window.webContents.send('folder', result);
        }
      })
      .catch((err) => console.log(err));
  });
  ipcMain.on('translate', (event: IpcMainEvent, request: any) => {
    const workerPath = path.resolve(__dirname, 'worker.js');
    const worker = new Worker(workerPath);

    // Envoie la requête de traduction au worker
    worker.postMessage(request);

    // Récupère les logs une fois la traduction terminée
    worker.on('message', (result: any) => {
      event.sender.send('translate', result);
    });

    // Gestion des erreurs
    worker.on('error', (error: any) => {
      console.error('Worker error:', error);
      event.sender.send('translate', { success: false, error });
    });

    // Gestion de la fin du worker
    worker.on('exit', (code: any) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});
