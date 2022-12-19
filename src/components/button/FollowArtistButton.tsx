'use client '

import { useState } from 'react'

import { HeartIcon } from '@heroicons/react/solid'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { followArtistForCurrentUser, unfollowArtistForCurrentUser } from '../../lib/spotify'

type Props = {
  id: string
  followed: boolean
}

export default function FollowArtistButton({ id, followed }: Props) {
  const [followState, setFollowState] = useState<boolean>(followed)
  const queryClient = useQueryClient()

  const { mutateAsync: followArtist } = useMutation(followArtistForCurrentUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['followed-artists'])
      queryClient.invalidateQueries(['is-artist-followed', id])
      setFollowState(true)
    },
  })

  const { mutateAsync: unfollowArtist } = useMutation(unfollowArtistForCurrentUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['followed-artists'])
      queryClient.invalidateQueries(['is-artist-followed', id])
      setFollowState(false)
    },
  })

  const save = async () => await followArtist(id)

  const remove = async () => await unfollowArtist(id)

  return (
    <HeartIcon
      className={`${followState ? 'text-green-500' : 'stroke-white text-transparent'} mx-auto h-6 w-6 cursor-pointer`}
      onClick={followState ? remove : save}
    />
  )
}
