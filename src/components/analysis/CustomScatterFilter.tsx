import { Dispatch, SetStateAction } from 'react'

type Props = {
  axis: ScatterSelectOption
  setAxis: Dispatch<SetStateAction<ScatterSelectOption>>
}

const ScatterSelectOptions = [
  'danceability',
  'energy',
  'popularity',
  'valence',
  'loudness',
  'instrumentalness',
  'acousticness',
  'tempo',
  'liveness',
  'speechiness',
  'duration',
  'release',
] as const

export type ScatterSelectOption = (typeof ScatterSelectOptions)[number]

export const CustomScatterFilter = ({ axis, setAxis }: Props) => {
  return (
    <>
      <select
        value={axis}
        onChange={(e) => setAxis(e.target.value as ScatterSelectOption)}
        className="w-full rounded-lg bg-gray-800 p-2.5 text-sm text-white"
      >
        {ScatterSelectOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  )
}
