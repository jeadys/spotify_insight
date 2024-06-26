import Image from 'next/image'

import { Header } from '@/components/layout/Header'
import { getCurrentUsersProfile } from '@/server/api/user'

export const ProfileHeader = async () => {
  const userProfile = await getCurrentUsersProfile()

  return (
    <Header>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Image
          src={userProfile.images?.[1]?.url || '/images/nocover.webp'}
          alt={userProfile.display_name || ''}
          width="0"
          height="0"
          sizes="100vw"
          priority={true}
          className="h-52 w-52 flex-grow-0 rounded-full object-cover sm:h-60 sm:w-60"
        />

        <div className="capitalize text-white">
          <h2>{userProfile.type}</h2>
          <h1 className="line-clamp-1 break-all text-3xl font-black sm:text-4xl">{userProfile.display_name}</h1>
        </div>
      </div>
    </Header>
  )
}
