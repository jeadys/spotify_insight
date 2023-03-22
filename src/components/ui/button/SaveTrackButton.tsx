import { useState } from 'react'

import { HeartIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { getSession } from 'next-auth/react'

/**
 * Save tracks for user
 *
 * PUT /v1/me/tracks?ids={ids}
 * https://developer.spotify.com/web-api/save-tracks-user/
 * @param {string} trackId The Spotify ID for the track.
 * @returns {Promise}
 */
const saveTrackForCurrentUser = async (trackId: string): Promise<SpotifyApi.SaveTracksForUserResponse | undefined> => {
  const session = await getSession()
  if (!session) return undefined

  return await fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessToken}`,
    },
  })
}

/**
 * Remove User’s Saved Tracks
 *
 * DELETE /v1/me/tracks?ids={ids}
 * https://developer.spotify.com/web-api/remove-tracks-user/
 * @param {string} trackId The Spotify ID for the track.
 * @returns {Promise}
 */
const removeTrackForCurrentUser = async (trackId: string): Promise<SpotifyApi.RemoveUsersSavedTracksResponse | undefined> => {
  const session = await getSession()
  if (!session) return undefined

  return await fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessToken}`,
    },
  })
}

type Props = {
  trackId: string
  isTrackSaved: boolean
}

export default function SaveTrackButton({ trackId, isTrackSaved }: Props) {
  const [saveState, setSaveState] = useState(isTrackSaved)

  const save = async (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation()
    await saveTrackForCurrentUser(trackId)
    setSaveState(true)
  }

  const remove = async (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation()
    await removeTrackForCurrentUser(trackId)
    setSaveState(false)
  }

  return (
    <button>
      <HeartIcon
        className={clsx('h-6 w-6', {
          'text-green-500': saveState,
          'stroke-white text-transparent': !saveState,
        })}
        onClick={saveState ? remove : save}
      />
    </button>
  )
}
