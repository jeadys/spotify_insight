import Link from 'next/link'
import { DotProps } from 'recharts'

export const CustomScatterShape = ({ cx, cy, image, id }: DotProps & { image?: string; id?: string }) => {
  const imageSize = 35

  return (
    <svg width={imageSize} height={imageSize} x={cx! - imageSize / 2} y={cy! - imageSize / 2} className="rounded-md">
      <Link href={`/track/${id}`}>
        <image href={image || '/images/nocover.webp'} width={imageSize} height={imageSize} clipPath="inset(0% round 0.375rem)" />
      </Link>
    </svg>
  )
}
