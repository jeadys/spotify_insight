import Image from 'next/image'

import Header from '@/components/layout/Header'
import { getCurrentUsersProfile } from '@/server/api'

export default async function ProfileHeader() {
  const userProfile = await getCurrentUsersProfile()

  return (
    <Header>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Image
          src={userProfile.images?.[0]?.url || '/images/nocover.webp'}
          alt={userProfile.display_name || ''}
          width="0"
          height="0"
          sizes="100vw"
          className="h-52 w-52 flex-grow-0 rounded-full object-cover sm:h-60 sm:w-60"
        />

        <div className="capitalize text-white">
          <h2>{userProfile.type}</h2>
          <h1 className="text-3xl font-black sm:text-4xl">{userProfile.display_name}</h1>
        </div>
      </div>
    </Header>
  )
}
