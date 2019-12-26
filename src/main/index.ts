'use strict'

import { app, protocol, BrowserWindow, nativeImage } from 'electron'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'
import electronDebug from 'electron-debug'
import path from 'path'

const isDevelopment = process.env.NODE_ENV !== 'production'

let win: BrowserWindow | null

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])
const iconUrl = isDevelopment
  ? path.join(__dirname, '../../public/favicon.ico')
  : path.join(__dirname, 'public/favicon.ico')

const icon = nativeImage.createFromPath(iconUrl)

const createWindow = async () => {
  win = new BrowserWindow({
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
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools()
      try {
        electronDebug({ showDevTools: true })
        await installVueDevtools(true)
      } catch (error) {
        console.log('error', error)
      }
    }
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
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
