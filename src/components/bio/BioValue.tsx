'use client'

type Props = {
  value: string
}

export default function BioValue({ value }: Props) {
  return <span className="font-black text-blue-400 md:text-2xl">{value}</span>
}
