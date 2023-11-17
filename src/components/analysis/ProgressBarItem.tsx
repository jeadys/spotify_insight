'use client'

type Props = {
  leftTitle: string
  rightTitle: string
  value: number
}

export const ProgressBarItem = ({ leftTitle, rightTitle, value }: Props) => {
  const percentage = Math.round(value * 100)

  return (
    <li className="mb-2 flex w-full items-center gap-5 capitalize text-white">
      <h4 className="line-clamp-1 flex-1 break-all text-right ">{leftTitle}</h4>

      <div className="h-2 flex-grow rounded-full bg-gray-800">
        <div className="relative -top-1 h-4 w-2 rounded-full bg-blue-300" style={{ left: `calc(${percentage}% - 0.5rem / 2)` }}></div>
      </div>

      <h4 className="line-clamp-1  flex-1 break-all text-left">{rightTitle}</h4>
    </li>
  )
}
