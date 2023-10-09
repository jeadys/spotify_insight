type Props = {
  children: React.ReactNode
}

export default function TrackList({ children }: Props) {
  return <ul className="w-full">{children}</ul>
}
