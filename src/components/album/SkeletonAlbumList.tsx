import List from '@/components/layout/List'
import ListItem from '@/components/layout/ListItem'

type Props = {
  contentAmount: number
}

export default function SkeletonAlbumList({ contentAmount }: Props) {
  const skeletons = new Array(contentAmount).fill(null).map((_, index) => (
    <ListItem key={index}>
      <div className="h-24 w-24 rounded-md bg-gray-1100 object-cover sm:h-32 sm:w-32"></div>

      <div className="flex flex-col gap-3">
        <div className="h-4 w-32 rounded-md bg-gray-1100"></div>
        <div className="flex gap-3">
          <div className="h-4 w-10 rounded-md bg-gray-1100"></div>
          <div className="h-4 w-10 rounded-md bg-gray-1100"></div>
        </div>
      </div>
    </ListItem>
  ))

  return <List>{skeletons}</List>
}
