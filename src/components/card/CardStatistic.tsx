'usee client'

type Props = {
  statistic: string
}

export default function CardStatistic({ statistic }: Props) {
  return <span className="text-sm text-gray-400 line-clamp-1">{statistic}</span>
}
