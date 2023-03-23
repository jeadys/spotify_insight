'use client'

type props = {
  className?: string
}

export default function MusicBar({ className = '' }: props) {
  return (
    <div className={`flex justify-between ${className}`}>
      <span className="musicbar h-full w-1 origin-bottom animate-musicbar bg-white"></span>
      <span className="musicbar h-full w-1 origin-bottom animate-musicbar bg-white"></span>
      <span className="musicbar h-full w-1 origin-bottom animate-musicbar bg-white"></span>
    </div>
  )
}
