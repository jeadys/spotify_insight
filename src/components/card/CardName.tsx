'use client'

type Props = {
  name: string
}

export default function CardName({ name }: Props) {
  return <span className="text-base font-medium text-white line-clamp-1">{name}</span>
}
