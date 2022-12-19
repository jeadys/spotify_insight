'use client'

import { useContext, createContext, useState } from 'react'

import { useSession } from 'next-auth/react'

import TrackPlayer from '@/components/core/TrackPlayer'

const PlayTrackContext = createContext<string | undefined>(undefined)
const ChooseTrackContext = createContext((tracks: string[], track: string) => console.log(tracks, track))

export const PlayTrack = () => {
  return useContext(PlayTrackContext)
}

export const ChooseTrack = () => {
  return useContext(ChooseTrackContext)
}

type TrackProviderProps = {
  children: React.ReactNode
}

export default function PlayedTrackProvider({ children }: TrackProviderProps) {
  const { data: session } = useSession()
  const rickRolling = 'spotify:track:4cOdK2wGLETKBW3PvgPWqT' // Easter egg troll

  const [playingTrack, setPlayingTrack] = useState(rickRolling)
  const [trackQueue, setTrackQueue] = useState([rickRolling])

  const chooseTrack = (tracks: string[], track: string) => {
    setTrackQueue(tracks)
    setPlayingTrack(track)
  }

  return (
    <PlayTrackContext.Provider value={playingTrack}>
      <ChooseTrackContext.Provider value={chooseTrack}>
        <TrackPlayer
          token={session ? session.accessToken : undefined}
          trackQueue={trackQueue}
          trackOffset={playingTrack}
          setPlayingTrack={setPlayingTrack}
        />
        {children}
      </ChooseTrackContext.Provider>
    </PlayTrackContext.Provider>
  )
}
