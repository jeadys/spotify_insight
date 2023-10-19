'use client'

import { useSession } from 'next-auth/react'
import SpotifyPlayer from 'react-spotify-web-playback'

import { usePlaybackStore } from '@/store/usePlayback'

export const Playback = () => {
  const { data: session } = useSession()
  const offset = usePlaybackStore((state) => state.offset)
  const trackQueue = usePlaybackStore((state) => state.queue)
  const isPlaying = usePlaybackStore((state) => state.isPlaying)

  if (!session?.accessToken) return null

  return (
    <SpotifyPlayer
      magnifySliderOnHover={false}
      callback={(state) => {
        usePlaybackStore.setState({ offset: state.track.uri, queue: trackQueue, isPlaying: state.isPlaying })
      }}
      play={isPlaying}
      layout="responsive"
      offset={trackQueue.indexOf(offset)}
      token={session.accessToken}
      uris={trackQueue}
      persistDeviceSelection={true}
      syncExternalDevice={true}
      styles={{
        activeColor: '#fff',
        bgColor: '#191a20',
        color: '#fff',
        loaderColor: '#fff',
        sliderHeight: 8,
        sliderColor: '#93c5fd',
        sliderTrackColor: '#c7d5ed',
        sliderHandleColor: '#fff',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
    />
  )
}
