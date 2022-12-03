'use client'

type Props = {
  title: string
}

export default function BioTitle({ title }: Props) {
  return <span className="block font-semibold text-white md:text-lg">{title}</span>
}
