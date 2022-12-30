'use client'

import { useState } from 'react'

import { HeartIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { getSession } from 'next-auth/react'

import ToolTip from '../core/ToolTip'

/**
 * Save albums for user
 *
 * PUT /v1/me/albums?ids={ids}
 * https://developer.spotify.com/web-api/save-albums-user/
 * @param {string} albumId The Spotify ID for the album.
 * @returns {Promise}
 */
export const saveAlbumForCurrentUser = async (albumId: string): Promise<SpotifyApi.SaveAlbumsForUserResponse | undefined> => {
  const session = await getSession()
  if (!session) return undefined

  return await fetch(`https://api.spotify.com/v1/me/albums?ids=${albumId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessToken}`,
    },
  })
}

/**
 * Remove Albums for Current User
 *
 * DELETE /v1/me/albums?ids={ids}
 * https://developer.spotify.com/web-api/remove-albums-user/
 * @param {string} albumId The Spotify ID for the album.
 * @returns {Promise}
 */
export const removeAlbumForCurrentUser = async (albumId: string): Promise<SpotifyApi.RemoveAlbumsForUserResponse | undefined> => {
  const session = await getSession()
  if (!session) return undefined

  return await fetch(`https://api.spotify.com/v1/me/albums?ids=${albumId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessToken}`,
    },
  })
}

type Props = {
  albumId: string
  isAlbumSaved: boolean
}

export default function SaveAlbumButton({ albumId, isAlbumSaved }: Props) {
  const [saveState, setSaveState] = useState(isAlbumSaved)

  const save = async () => {
    await saveAlbumForCurrentUser(albumId)
    setSaveState(true)
  }

  const remove = async () => {
    await removeAlbumForCurrentUser(albumId)
    setSaveState(false)
  }

  return (
    <button>
      <ToolTip tooltip={`${saveState ? 'Remove from library' : 'Save to library'}`}>
        <HeartIcon
          className={clsx('h-6 w-6', {
            'text-green-500': saveState,
            'stroke-white text-transparent': !saveState,
          })}
          onClick={saveState ? remove : save}
        />
      </ToolTip>
    </button>
  )
}
