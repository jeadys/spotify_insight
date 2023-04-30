'use client'

import { useStore } from '@/hooks/useStore'
import type { AttributeType } from 'store/useGenerator'
import { initialGeneratorState } from 'store/useGenerator'
import { useGeneratorStore } from 'store/useGenerator'

type Props = {
  title: AttributeType
  description: string
  min: number
  max: number
  step: number
  gap: number
}

export default function GeneratorSlider({ title, description, min, max, step, gap }: Props) {
  const setRangeValue = useGeneratorStore((state) => state.setRangeValue)
  // Custom useStore hook needed for persist storage to work with NextJS Hydration
  const minValue = useStore(useGeneratorStore, (state) => state[title].min) ?? initialGeneratorState[title].min
  const maxValue = useStore(useGeneratorStore, (state) => state[title].max) ?? initialGeneratorState[title].max

  const minPos = ((minValue - min) / (max - min)) * 100
  const maxPos = ((maxValue - min) / (max - min)) * 100

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = parseFloat(e.target.value)
    // the new min value is the value from the event.
    // it should not exceed the current max value!
    const newMaxVal = Math.min(max, Math.max(maxValue, value + gap))
    const newMinVal = Math.max(0, Math.min(newMaxVal - gap, value))
    setRangeValue(title, newMinVal, newMaxVal)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = parseFloat(e.target.value)
    // the new max value is the value from the event.
    // it must not be less than the current min value!
    const newMinVal = Math.max(min, Math.min(minValue, value - gap))
    const newMaxVal = Math.min(max, Math.max(newMinVal + gap, value))
    setRangeValue(title, newMinVal, newMaxVal)
  }

  return (
    <div className="flex w-full flex-col gap-10 rounded-md bg-gray-900 p-5">
      <header>
        <h2 className="text-xl font-bold capitalize text-white">{title}</h2>
        <h3 className="text-white">{description}</h3>
      </header>
      <div className="wrapper">
        <div className="input-wrapper">
          <input className="input" type="range" value={minValue} min={min} max={max} step={step} onChange={handleMinChange} />
          <input className="input" type="range" value={maxValue} min={min} max={max} step={step} onChange={handleMaxChange} />
        </div>

        <div className="control-wrapper">
          <div className="control flex items-center justify-center border-2 border-blue-500 bg-gray-1200" style={{ left: `${minPos}%` }}>
            <span className="text-sm text-white">{minValue}</span>
          </div>
          <div className="rail bg-gray-800">
            <div className="inner-rail bg-blue-300" style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }} />
          </div>
          <div className="control flex items-center justify-center border-2 border-blue-500 bg-gray-1200" style={{ left: `${maxPos}%` }}>
            <span className="text-sm text-white">{maxValue}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
