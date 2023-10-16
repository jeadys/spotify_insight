'use client'

import { formatTrackDuration } from '@/utils/formatTrackDuration'

type Props = {
  trackDuration: number
}
export const TrackDuration = ({ trackDuration }: Props) => {
  return <span className="ml-auto text-white duration:hidden">{formatTrackDuration(trackDuration)}</span>
}
