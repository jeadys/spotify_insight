import { Link } from "react-router-dom";

export default function Sectiontitle({ title, seeAll }) {
  return (
    <>
      <div className="mb-5">
        <span className="font-semibold text-xl text-white">{title}</span>

        <Link
          to={seeAll}
          className="font-light text-sm text-gray-300 hover:text-white transition ease-in-out uppercase float-right cursor-pointer"
        >
          See All
        </Link>
      </div>
    </>
  );
}
