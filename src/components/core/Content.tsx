'use client'

type Props = {
  children: React.ReactNode
}

export default function Content({ children }: Props) {
  return (
    <>
      <div className="min-h-screen bg-gray-900 font-maven">
        <div className="min-h-screen">
          <div className="mx-auto max-w-8xl p-5">{children}</div>
        </div>
      </div>
    </>
  )
}
