const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { modelResult } = require("./model");

let windowRef;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 675,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });
  mainWindow.loadFile("./index.html");
  mainWindow.webContents.openDevTools();

  windowRef = mainWindow;
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("open-dialog", (event) => {
  console.log("Open Dialog");
  dialog
    .showOpenDialog(windowRef, {
      filters: ["wav"],
      properties: ["openFile"],
    })
    .then(async (res) => {
      if (res.canceled) {
        return;
      }
      const file = res.filePaths[0];
      event.reply("file-selected", file);
      const transcribedText = await modelResult(file);
      event.reply("transcibe-text", transcribedText);
    })
    .catch((err) => {
      event.reply("file-error", "Some error occured");
    });
});
