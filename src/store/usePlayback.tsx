import { create } from 'zustand'

type PlaybackState = {
  offset: string
  queue: string[]
}

type PlaybackActions = {
  setPlayback: (offset: string, queue: string[]) => void
}

const initialState: PlaybackState = {
  offset: '',
  queue: [],
}

export const usePlaybackStore = create<PlaybackState & PlaybackActions>()((set) => ({
  ...initialState,

  setPlayback: (offset: string, queue: string[]) => set(() => ({ offset: offset, queue: queue })),
}))
