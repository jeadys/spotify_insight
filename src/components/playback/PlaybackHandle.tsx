'use client'

import { PauseIcon, PlayIcon } from '@heroicons/react/solid'

import MusicBar from '@/components/playback/MusicBar'
import { usePlaybackStore } from 'store/usePlayback'

type Props = {
  uri: string
  queue: string[]
}

export default function PlaybackHandle({ uri, queue }: Props) {
  const setPlayback = usePlaybackStore((state) => state.setPlayback)
  const offset = usePlaybackStore((state) => state.offset)

  return (
    <>
      {offset === uri ? (
        <>
          <PauseIcon
            className="absolute hidden h-8 w-8 fill-white hover:cursor-pointer group-hover:block"
            onClick={() => setPlayback(uri, queue)}
          />

          <MusicBar className="absolute h-4 w-4 group-hover:hidden" />
        </>
      ) : (
        <PlayIcon
          className="absolute hidden h-8 w-8 fill-white hover:cursor-pointer group-hover:block"
          onClick={() => setPlayback(uri, queue)}
        />
      )}
    </>
  )
}
