'use client'

type Props = {
  title: string
  value: number | string
}

export const FeatureItem = ({ title, value }: Props) => {
  return (
    <li className="flex h-24 flex-col justify-center rounded-md bg-gray-800 p-5 text-center capitalize sm:h-28">
      <h3 className="text-2xl font-bold text-blue-300 sm:text-3xl">{value}</h3>
      <h4 className="text-base text-white">{title}</h4>
    </li>
  )
}
