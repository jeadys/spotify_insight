import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import React from "react";

type Props = {
  title: string;
  breadcrumb?: string;
  seeAll?: string;
  children: React.ReactNode;
  timeRange?: string;
  setTimeRange?: Dispatch<SetStateAction<string>>;
};

export default function SectionWrapper({
  title,
  breadcrumb,
  seeAll,
  children,
  timeRange,
  setTimeRange,
}: Props) {
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
    <div>
      <div className="flex mb-5">
        <h2 className="font-semibold text-xl text-white">
          {/* {breadcrumb && (
            <span className="text-slate-400">
              <Link className="hover:underline hover:text-white" to="/">
                Profile
              </Link>
              <span className="mx-2">/</span>
            </span>
          )} */}
          {title && (
            <>
              {seeAll ? (
                <Link className="hover:underline" to={seeAll}>
                  {title}
                </Link>
              ) : (
                <span>{title}</span>
              )}
            </>
          )}
        </h2>

        {seeAll && (
          <Link
            to={seeAll}
            className="font-light text-sm text-gray-300 hover:text-white transition ease-in-out uppercase cursor-pointer ml-auto"
          >
            See All
          </Link>
        )}

        {timeRange && setTimeRange && (
          <ul className="flex flex-row justify-center gap-5 text-white ml-auto">
            {timeRangeBtns.map((timeRangeBtn) => (
              <li key={timeRangeBtn.range}>
                <button
                  className={`bg-sky-900 py-2 px-4 text-sm rounded-full ${
                    timeRange === timeRangeBtn.range
                      ? "bg-sky-600 cursor-default"
                      : "hover:bg-sky-700 bg-sky-900 transition ease-in-out"
                  }`}
                  onClick={() => setTimeRange(timeRangeBtn.range)}
                >
                  {timeRangeBtn.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {children}
    </div>
  );
}
