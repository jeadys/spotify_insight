import { useState } from 'react'

import { HeartIcon } from '@heroicons/react/solid'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { removeAlbumForCurrentUser, saveAlbumForCurrentUser } from '../../lib/spotify'

type Props = {
  id: string
  saved: boolean
}

export default function SaveAlbumButton({ id, saved }: Props) {
  const [saveState, setSaveState] = useState<boolean>(saved)
  const queryClient = useQueryClient()

  const { mutateAsync: saveAlbum } = useMutation(saveAlbumForCurrentUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['saved-albums'])
      queryClient.invalidateQueries(['is-album-saved'])
      setSaveState(true)
    },
  })

  const { mutateAsync: removeAlbum } = useMutation(removeAlbumForCurrentUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['saved-albums'])
      queryClient.invalidateQueries(['is-album-saved'])
      setSaveState(false)
    },
  })

  const save = async () => await saveAlbum(id)

  const remove = async () => await removeAlbum(id)

  return (
    <HeartIcon
      className={`${saveState ? 'text-green-500' : 'stroke-white text-transparent'} h-6 w-6 cursor-pointer`}
      onClick={saveState ? remove : save}
    />
  )
}
