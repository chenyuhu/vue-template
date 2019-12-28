'use strict'

import { app, protocol, BrowserWindow, nativeImage, ipcMain } from 'electron'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'
import electronDebug from 'electron-debug'
import path from 'path'

const isDevelopment = process.env.NODE_ENV !== 'production'

interface Win {
  main: BrowserWindow | null
  [propName: string]: BrowserWindow | null
}

const win: Win = { main: null }

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])
const iconUrl = isDevelopment
  ? path.join(__dirname, '../../public/favicon.ico')
  : path.join(__dirname, 'public/favicon.ico')

const icon: nativeImage = nativeImage.createFromPath(iconUrl)

const createWindow = async () => {
  win.main = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon,
    center: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: isDevelopment,
      webSecurity: isDevelopment
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.main.loadURL('http://localhost:8080/main.html')
    if (!process.env.IS_TEST) {
      win.main.webContents.openDevTools()
      try {
        electronDebug({ showDevTools: true })
        await installVueDevtools(true)
      } catch (error) {
        console.log('error', error)
      }
    }
  } else {
    createProtocol('app')
    win.main.loadURL('app://./main.html')
  }
  ipcMain.on('createWin', (event, arg) => {
    const { name } = arg
    if (win[name]) {
      win[name]!.focus()
    } else {
      win[name] = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        icon,
        center: true,
        transparent: true,
        webPreferences: {
          nodeIntegration: true,
          devTools: isDevelopment,
          webSecurity: isDevelopment
        }
      })
      const loadUrl = isDevelopment ? `http://localhost:8080/${name}.html` : `app://./${name}.html`
      win[name]!.loadURL(loadUrl)
    }
    win[name]!.on('closed', () => {
      win[name] = null
    })
  })
  win.main.on('closed', () => {
    win.main = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('ready', async () => {
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
