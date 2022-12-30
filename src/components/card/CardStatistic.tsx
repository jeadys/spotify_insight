'usee client'

type Props = {
  statistic: string
}

export default function CardStatistic({ statistic }: Props) {
  return <span className="mt-5 hidden rounded-md bg-cyan-100 px-2 py-1 text-xs font-medium sm:block">{statistic}</span>
}
