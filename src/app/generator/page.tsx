import GeneratorRangeSlider from '@/components/generator/GeneratorRangeSlider'
import GeneratorSearch from '@/components/generator/GeneratorSearch'
import GeneratorSeed from '@/components/generator/GeneratorSeed'
import Section from '@/components/layout/Section'

export default async function Generator() {
  return (
    <>
      <Section title="Seeds" description="Seeds based on artists and tracks">
        <GeneratorSearch>
          <GeneratorSeed />
        </GeneratorSearch>
      </Section>

      <Section title="Attributes" description="Fine tune based on attributes.">
        <div className="grid gap-5 sm:grid-cols-2">
          <GeneratorRangeSlider
            title="acousticness"
            description="A confidence measure of whether the track is acoustic."
            min={0}
            max={100}
            step={1}
            gap={20}
          />
          <GeneratorRangeSlider
            title="danceability"
            description="Based on tempo, rhythm stability, beat strength, and overall regularity."
            min={0}
            max={100}
            step={1}
            gap={20}
          />
          <GeneratorRangeSlider
            title="energy"
            description="Represents a perceptual measure of intensity and activity."
            min={0}
            max={100}
            step={1}
            gap={20}
          />
          <GeneratorRangeSlider
            title="instrumentalness"
            description="Values above 50 represent instrumental tracks."
            min={0}
            max={100}
            step={1}
            gap={20}
          />
          <GeneratorRangeSlider
            title="popularity"
            description="Based on the total number of plays the track has had and how recent those plays are."
            min={0}
            max={100}
            step={1}
            gap={20}
          />
          <GeneratorRangeSlider
            title="valence"
            description="High values correspond to positivity and happiness, while low values correspond to negativity and sadness."
            min={0}
            max={100}
            step={1}
            gap={20}
          />
        </div>
      </Section>
    </>
  )
}
