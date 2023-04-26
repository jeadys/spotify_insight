export default function SkeletonHeader() {
  return (
    <header className="flex animate-pulse flex-col gap-3 pt-5 sm:pt-10">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="h-52 w-52 rounded-full bg-gray-1200 sm:h-60 sm:w-60"></div>

        <div className="flex flex-col gap-2">
          <h2 className="h-4 w-16 rounded-full bg-gray-1200"></h2>
          <h1 className="h-10 w-32 rounded-full bg-gray-1200"></h1>
        </div>
      </div>
    </header>
  )
}
