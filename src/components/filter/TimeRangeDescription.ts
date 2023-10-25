type TimeRangeDescriptionProps = {
  timeRange: string
}

export const timeRangeDescriptions: { [key: string]: string } = {
  'short': '4 weeks',
  'medium': '6 months',
  'long': 'lifetime',
}

export const TimeRangeDescription = ({ timeRange }: TimeRangeDescriptionProps) => {
  return timeRangeDescriptions[timeRange] || ''
}
