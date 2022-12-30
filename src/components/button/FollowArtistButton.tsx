'use client '

import { useState } from 'react'

import clsx from 'clsx'
import { getSession } from 'next-auth/react'

const followArtistForCurrentUser = async (artistId: string): Promise<SpotifyApi.FollowArtistsOrUsersResponse | undefined> => {
  const session = await getSession()
  if (!session) return undefined

  return await fetch(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessToken}`,
    },
  })
}

const unfollowArtistForCurrentUser = async (artistId: string): Promise<SpotifyApi.UnfollowArtistsOrUsersResponse | undefined> => {
  const session = await getSession()
  if (!session) return undefined

  return await fetch(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessToken}`,
    },
  })
}

type Props = {
  artistId: string
  isArtistFollowed: boolean
}

export default function FollowArtistButton({ artistId, isArtistFollowed }: Props) {
  const [followState, setFollowState] = useState(isArtistFollowed)

  const follow = async () => {
    await followArtistForCurrentUser(artistId)

    setFollowState(true)
  }

  const unfollow = async () => {
    await unfollowArtistForCurrentUser(artistId)

    setFollowState(false)
  }

  return (
    <button
      className={clsx('rounded-md py-1 px-6 text-white', {
        'bg-blue-600': followState,
        'border border-white': !followState,
      })}
      onClick={followState ? unfollow : follow}
    >
      {followState ? 'Following' : 'Follow'}
    </button>
  )
}
