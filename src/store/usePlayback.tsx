import { create } from 'zustand'

type PlaybackState = {
  offset: string
  queue: string[]
  isPlaying: boolean
}

type PlaybackActions = {
  setPlayback: (offset: string, queue: string[], isPlaying: boolean) => void
}

const initialState: PlaybackState = {
  offset: '',
  queue: [],
  isPlaying: false,
}

export const usePlaybackStore = create<PlaybackState & PlaybackActions>()((set) => ({
  ...initialState,

  setPlayback: (offset: string, queue: string[], isPlaying: boolean) => set(() => ({ offset: offset, queue: queue, isPlaying })),
}))
