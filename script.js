const version = document.getElementById("version");
const notification = document.getElementById("notification");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

window.electron.ipcRenderer.send("app_version");

window.electron.ipcRenderer.on("app_version", (event, arg) => {
  window.electron.ipcRenderer.removeAllListeners("app_version");
  version.innerText = "Version " + arg.version;
});

window.electron.ipcRenderer.on("update_available", () => {
  window.electron.ipcRenderer.removeAllListeners("update_available");
  message.innerText = "A new update is available. Downloading now...";
  notification.classList.remove("hidden");
});

window.electron.ipcRenderer.on("update_downloaded", () => {
  window.electron.ipcRenderer.removeAllListeners("update_downloaded");
  message.innerText =
    "Update Downloaded. It will be installed on restart. Restart now?";
  restartButton.classList.remove("hidden");
  notification.classList.remove("hidden");
});

function closeNotification() {
  notification.classList.add("hidden");
}

function restartApp() {
  window.electron.ipcRenderer.send("restart_app");
}
