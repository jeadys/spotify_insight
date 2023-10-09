'use client'

import { PauseIcon, PlayIcon } from '@heroicons/react/solid'
import Image from 'next/image'

import MusicBar from '@/components/playback/MusicBar'
import { usePlaybackStore } from '@/store/usePlayback'
import clsx from 'clsx'

type Props = {
  showPlaybackControls?: boolean
  trackUri: string
  trackUris: string[]
  trackImage: string
  trackName: string
  imageSize?: 'small' | 'medium' | 'large'
}

export default function TrackPlaybackControl({ showPlaybackControls, trackUri, trackUris, trackImage, trackName, imageSize }: Props) {
  const setPlayback = usePlaybackStore((state) => state.setPlayback)
  const offset = usePlaybackStore((state) => state.offset)

  return (
    <div className="relative flex flex-shrink-0 items-center justify-center">
      <Image
        src={trackImage || '/images/nocover.webp'}
        alt={trackName}
        width="0"
        height="0"
        sizes="100vw"
        className={clsx('h-10 w-10 rounded-md object-cover group-hover:blur-xs', {
          'h-14 w-14': imageSize === 'medium',
        })}
      />

      {showPlaybackControls && (
        <>
          {offset === trackUri ? (
            <>
              <PauseIcon
                className="absolute hidden h-8 w-8 fill-white hover:cursor-pointer group-hover:block"
                onClick={() => setPlayback(trackUri, trackUris)}
              />

              <MusicBar className="absolute h-4 w-4 group-hover:hidden" />
            </>
          ) : (
            <PlayIcon
              className="absolute hidden h-8 w-8 fill-white hover:cursor-pointer group-hover:block"
              onClick={() => setPlayback(trackUri, trackUris)}
            />
          )}
        </>
      )}
    </div>
  )
}
