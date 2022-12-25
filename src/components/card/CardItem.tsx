'use client'

type Props = {
  children: React.ReactNode
}

export default function CardItem({ children }: Props) {
  return <li className="py-4 text-center">{children}</li>
}
