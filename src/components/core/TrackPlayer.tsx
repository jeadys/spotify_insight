'use client'

import { useEffect, useState } from 'react'

import { createPortal } from 'react-dom'
import SpotifyPlayer from 'react-spotify-web-playback'

type Props = {
  token: string | undefined
  trackQueue: string[]
  trackOffset: string
  setPlayingTrack: React.Dispatch<React.SetStateAction<string>>
}

export default function TrackPlayer({ token, trackQueue, trackOffset, setPlayingTrack }: Props) {
  const offset = trackQueue.indexOf(trackOffset)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setPlay(true)
  }, [trackQueue, trackOffset])

  if (!token) return null
  return createPortal(
    <SpotifyPlayer
      magnifySliderOnHover={false}
      callback={(state) => {
        if (!state.isPlaying) {
          setPlay(false)
        }
        setPlayingTrack(state.track.uri)
      }}
      play={play}
      offset={offset}
      token={token}
      uris={trackQueue}
      persistDeviceSelection={true}
      syncExternalDevice={true}
      styles={{
        activeColor: '#fff',
        bgColor: '#1e293b',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#0284c7',
        sliderHeight: 8,
        sliderHandleColor: '#fff',
        sliderTrackColor: '#c7d5ed',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
    />,
    document.getElementById('trackplayer') as Element | DocumentFragment
  )
}
