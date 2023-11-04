import dayjs from 'dayjs'

import { ScatterSelectOption } from '@/components/analysis/CustomScatterFilter'
import { formatTrackDuration } from '@/utils/formatTrackDuration'

export const formatAxisLabel = (tick: number, axis: ScatterSelectOption) => {
  if (axis === 'release') return dayjs.unix(tick).format('YYYY')
  if (axis === 'duration') return formatTrackDuration(tick)

  return tick.toString()
}
