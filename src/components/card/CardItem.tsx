'use client'

type Props = {
  children: React.ReactNode
}

export default function CardItem({ children }: Props) {
  return (
    <div className="flex flex-col items-center rounded-lg py-4 text-center transition ease-in-out sm:bg-slate-800 sm:shadow sm:hover:bg-slate-700">
      {children}
    </div>
  )
}
