'usee client'

type Props = {
  info: string
}

export default function CardInfo({ info }: Props) {
  return <span className="text-sm text-gray-400 line-clamp-1 hover:text-white">{info}</span>
}
