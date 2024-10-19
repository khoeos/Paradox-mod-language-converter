import { ElectronAPI } from '@electron-toolkit/preload'

interface api {
  on: (channel: string, callback: (data: unknown) => void) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: api
  }
}
