'usee client'

type Props = {
  info: string
}

export default function CardInfo({ info }: Props) {
  return <span className="text-sm text-gray-400 hover:text-white">{info.length <= 20 ? info : info.slice(0, 20).concat('...')}</span>
}
