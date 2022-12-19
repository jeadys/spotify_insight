type Props = {
  tooltip: string
  children: React.ReactNode
}

export default function ToolTip({ tooltip, children }: Props) {
  return (
    <div className="group/tooltip relative">
      {children}
      <div className="invisible absolute inline-flex cursor-default whitespace-nowrap rounded bg-gray-800 p-2 text-xs text-white opacity-0 shadow-md transition-all duration-500 group-hover/tooltip:visible group-hover/tooltip:opacity-100">
        {tooltip}
      </div>
    </div>
  )
}
