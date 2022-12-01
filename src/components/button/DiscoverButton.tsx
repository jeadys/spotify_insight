import Link from 'next/link'

type Props = {
  titleMessage: string
  buttonMessage: string
}

export default function DiscoverButton({ titleMessage, buttonMessage }: Props) {
  return (
    <span className="flex flex-col items-center text-white">
      <span>{titleMessage}</span>
      <Link href={`/discover`} passHref={true}>
        <a className="my-5 max-w-fit cursor-pointer rounded-full bg-cyan-600 py-2 px-5 font-semibold text-white">{buttonMessage}</a>
      </Link>
    </span>
  )
}
