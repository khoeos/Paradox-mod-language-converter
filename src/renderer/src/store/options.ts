import { GameId } from '@global/constants'
import { ConvertMode } from '@global/types'
import { create } from 'zustand'

interface OptionState {
  game: GameId
  setGame: (game: GameId) => void

  path: string
  setPath: (path: string) => void

  outputPath: string
  setOutputPath: (outputPath: string) => void

  sourceLanguage: string
  setSourceLanguage: (sourceLanguage: string) => void

  targetLanguage: string[]
  setTargetLanguage: (targetLanguage: string[]) => void
  toggleTargetLanguage: (targetLanguage: string) => void
  setLanguage(targetLanguage: string, value: boolean): void

  mode: ConvertMode
  setMode: (mode: ConvertMode) => void

  checkFiles: boolean
  setCheckFiles: (checkFiles: boolean) => void

  deepCheck: boolean
  setDeepCheck: (deepCheck: boolean) => void
}

const useOptionsStore = create<OptionState>()((set) => ({
  game: 'stl',
  setGame: (game: GameId): void => set({ game }),

  path: '',
  setPath: (path: string): void => set({ path }),

  outputPath: '',
  setOutputPath: (outputPath: string): void => set({ outputPath }),

  sourceLanguage: 'en',
  setSourceLanguage: (sourceLanguage: string): void => set({ sourceLanguage }),

  targetLanguage: [],
  setTargetLanguage: (targetLanguage: string[]): void => set({ targetLanguage }),
  toggleTargetLanguage: (targetLanguage: string): void =>
    set((state) => ({
      targetLanguage: state.targetLanguage.includes(targetLanguage)
        ? state.targetLanguage.filter((lang) => lang !== targetLanguage)
        : [...state.targetLanguage, targetLanguage]
    })),
  setLanguage: (targetLanguage: string, value: boolean): void => {
    set((state) => ({
      targetLanguage: value
        ? [...state.targetLanguage, targetLanguage]
        : state.targetLanguage.filter((lang) => lang !== targetLanguage)
    }))
  },

  mode: ConvertMode.ADD_TO_CURRENT,
  setMode: (mode: ConvertMode): void => set({ mode }),

  checkFiles: false,
  setCheckFiles: (checkFiles: boolean): void => set({ checkFiles }),

  deepCheck: false,
  setDeepCheck: (deepCheck: boolean): void => set({ deepCheck })
}))

export default useOptionsStore
