'use client'

type Props = {
  title: string
  value: string | number
  description?: string
  large?: boolean
}

export default function MetadataItem({ title, value }: Props) {
  return (
    <li className="capitalize">
      <h3 className="text-xl font-bold text-blue-300">{value}</h3>
      <h4 className="text-gray-300">{title}</h4>
    </li>
  )
}
