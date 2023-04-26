type Props = {
  children: React.ReactNode
}
export default function List({ children }: Props) {
  return <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 5xl:grid-cols-6">{children}</ul>
}
