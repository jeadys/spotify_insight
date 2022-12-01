type Props = {
  image: string
  alt: string
  rounded?: boolean
}

export default function CardImage({ image, alt, rounded }: Props) {
  console.log(alt)
  return <img src={image} className={`mb-5 object-cover ${rounded ? 'h-32 w-32 rounded-full' : 'h-48 w-48 rounded-md'}`} alt={alt} />
}
