'use client'

import { createContext, useContext } from 'react'

const UserProfileContext = createContext<SpotifyApi.UserObjectPrivate | null>(null)

export const UserProfileDetails = () => {
  return useContext(UserProfileContext)
}

type Props = {
  userProfile: SpotifyApi.UserObjectPrivate
  children: React.ReactNode
}

export default function UserProfileProvider({ userProfile, children }: Props) {
  return <UserProfileContext.Provider value={userProfile}>{children}</UserProfileContext.Provider>
}
