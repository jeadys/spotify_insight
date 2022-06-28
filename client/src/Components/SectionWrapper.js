import React from "react";
import { Link } from "react-router-dom";

export default function SectionWrapper({
  title,
  breadcrumb,
  seeAll,
  children,
}) {
  return (
    <div>
      <div className="flex mb-5">
        <h2 className="font-semibold text-xl text-white">
          {breadcrumb && (
            <span className="text-slate-400">
              <Link className="hover:underline hover:text-white" to="/">
                Profile
              </Link>
              <span className="mx-2">/</span>
            </span>
          )}
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
      </div>
      {children}
    </div>
  );
}
