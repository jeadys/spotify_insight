'use client'

type Props = {
  title: string
  description?: string
  children: React.ReactNode
}

export default function SectionWrapper({ title, description, children }: Props) {
  return (
    <section>
      <header className="sticky top-0 z-10 bg-gray-1300 py-5 capitalize text-white sm:py-10">
        <h2 className="text-2xl font-black sm:text-3xl">{title}</h2>
        <h3 className="text-gray-300">{description}</h3>
      </header>
      {children}
    </section>
  )
}
