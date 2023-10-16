'use client'

type Props = {
  title: string
  value: number
}

export const ProgressBarItem = ({ title, value }: Props) => {
  return (
    <li className="capitalize">
      <h4 className="mb-2 text-white">{title}</h4>
      <div className="dark:bg-neutral-00 h-2 rounded-full bg-gray-800">
        <div className="h-2 rounded-full bg-blue-300" style={{ width: `${value * 100}%` }}></div>
      </div>
    </li>
  )
}
