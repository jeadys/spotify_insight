import { create } from 'zustand'

type PlaybackType = {
  offset: string
  queue: string[]
  setPlayback: (trackOffset: string, trackQueue: string[]) => void
}

export const usePlaybackStore = create<PlaybackType>((set) => ({
  offset: '',
  queue: [],
  setPlayback: (trackOffset: string, trackQueue: string[]) => set(() => ({ offset: trackOffset, queue: trackQueue })),
}))
