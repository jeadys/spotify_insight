'use client '

import { useState } from 'react'

import { getSession } from 'next-auth/react'
import type { FollowArtistsOrUsersResponse, UnfollowArtistsOrUsersResponse } from 'spotify-api'

const followArtistForCurrentUser = async (artistId: string): Promise<FollowArtistsOrUsersResponse | undefined> => {
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

const unfollowArtistForCurrentUser = async (artistId: string): Promise<UnfollowArtistsOrUsersResponse | undefined> => {
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
      className={`cursor-pointer rounded-md py-1 px-6 text-white ${followState ? 'bg-blue-600' : 'border border-white'}`}
      onClick={followState ? unfollow : follow}
    >
      {followState ? 'Following' : 'Follow'}
    </button>
  )
}
