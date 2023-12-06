const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const url = require("url");
const path = require("path");
const fs = require('fs');
const updater = require("./updater")

const Store = require('electron-store');

process.on("uncaughtException", (e) => {
    console.trace(e)
})

const store = new Store();

Store.initRenderer();

const ConnectionService = require("./backend/util/services/connection-service")
const connection = new ConnectionService();

let mainWindow;

function createWindow() { 

    setTimeout(() => {
        updater();
    }, 5000);

    if(!fs.existsSync(path.join(app.getPath('appData'), "/application/config.json"))){
        store.set("profiles",[])
        store.set("tasks",[])
        store.set("proxies",[])
        store.set("settings",[])
    }

    if(!fs.existsSync(path.join(app.getPath('appData'), "/application/logs"))){
        fs.mkdirSync(path.join(app.getPath('appData'), "/application/logs"))
    }

    if(!fs.existsSync(path.join(app.getPath('appData'), "/application/logs/debug.txt"))){
        fs.writeFileSync(path.join(app.getPath('appData'), "/application/logs/debug.txt"), "")
    }

    if(!fs.existsSync(path.join(app.getPath('appData'), "/application/logs/error.txt"))){
        fs.writeFileSync(path.join(app.getPath('appData'), "/application/logs/error.txt"), "")

    }

    mainWindow = new BrowserWindow({
        width: 1400,
        height: 777,
        minHeight: 777,
        frame: true,
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + '/preload.js'

        }
    })

    Menu.setApplicationMenu(null);

    if (process.platform === 'win32')
    {
        app.setAppUserModelId(app.name)
    }
    

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    //mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    mainWindow.on('ready-to-show', async () => {})

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})

function openModal() {
    const { BrowserWindow } = require('electron');
    let modal = new BrowserWindow({ parent: mainWindow, modal: true, show: false })
    modal.loadURL('https://www.sitepoint.com')
    modal.once('ready-to-show', () => {
        modal.show()
    })
}

ipcMain.on('openModal', (event, arg) => {
    openModal()
})

ipcMain.on("startAllTask", (e, data) => {
    connection.startAllTasks()
});

ipcMain.on("startTasksByGroup", (e, data) => {
    connection.startAllTasksByGroup(data)
});

ipcMain.on("stopAllTask", (e, data) => {
    connection.stopAllTasks()
});

ipcMain.on("stopTasksByGroup", (e, data) => {
    connection.stopAllTasksByGroup(data)
})

ipcMain.on("startTaskByIdAndGroup", (e, data) => {
    connection.startSingleTask(data)
})

ipcMain.on("stopTaskByIdAndGroup", (e, data) => {
    connection.sendStopMessage(data)
})