import Image from 'next/image'

type Props = {
  image: string
  alt: string
  rounded?: boolean
}

export default function CardImage({ image, alt, rounded }: Props) {
  return (
    <Image
      src={image}
      alt={alt}
      width="0"
      height="0"
      sizes="100vw"
      className={`mb-5 w-full object-cover ${rounded ? 'h-32 w-32 rounded-full' : 'h-48 w-48 rounded-md'}`}
    />
  )
}
