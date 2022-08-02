import Link from "next/link";
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
          {title && (
            <>
              {seeAll ? (
                <Link href={seeAll}>
                  <a className="hover:underline">{title}</a>
                </Link>
              ) : (
                <span>{title}</span>
              )}
            </>
          )}
        </h2>

        {seeAll && (
          <Link href={seeAll}>
            <a className="font-light text-sm text-gray-300 hover:text-white transition ease-in-out uppercase cursor-pointer ml-auto">
              See All
            </a>
          </Link>
        )}

        {timeRange && setTimeRange && (
          <ul className="flex flex-row justify-center gap-5 text-white ml-auto">
            {timeRangeBtns.map((timeRangeBtn) => (
              <li key={timeRangeBtn.range}>
                <button
                  className={`text-sm uppercase underline-offset-8 decoration-4  ${
                    timeRange === timeRangeBtn.range
                      ? "underline decoration-sky-700 cursor-default"
                      : "hover:underline hover:decoration-sky-900"
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
