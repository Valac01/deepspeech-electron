const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel) => ipcRenderer.send(channel),
  on: (channel, listener) => ipcRenderer.on(channel, listener),
});
