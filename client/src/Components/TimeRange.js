export default function TimeRange({ timeRange, setTimeRange }) {
  const timeRangeBtns = [
    {
      title: "This month",
      range: "short",
    },
    {
      title: " Last 6 months",
      range: "medium",
    },
    {
      title: "All time",
      range: "long",
    },
  ];

  return (
    <ul className="flex flex-row justify-center gap-5 text-white">
      {timeRangeBtns.map((timeRangeBtn) => (
        <li key={timeRangeBtn.range}>
          <button
            className={`bg-sky-900 py-2 px-4 text-sm rounded-full ${
              timeRange === timeRangeBtn.range
                ? "bg-sky-600"
                : "hover:bg-sky-800 transition ease-in-out"
            }`}
            onClick={() => setTimeRange(timeRangeBtn.range)}
          >
            {timeRangeBtn.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
