type Props = {
  children: React.ReactNode
}

export const TopList = ({ children }: Props) => {
  return <ul className="flex flex-col gap-5 rounded-lg bg-gray-1200 p-5">{children}</ul>
}
