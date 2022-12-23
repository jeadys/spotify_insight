'use client'

type Props = {
  name: string
}

export default function CardName({ name }: Props) {
  return <span className="text-sm font-medium text-white">{name.length <= 20 ? name : name.slice(0, 20).concat('...')}</span>
}
