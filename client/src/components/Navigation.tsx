import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../spotify";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import Search from "./Search";

export default function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      title: "Profile",
      link: "/",
    },
    {
      title: "Library",
      link: "/library",
    },
    {
      title: "Discover",
      link: "/discover",
    },
  ];

  return (
    <ul className="w-full flex flex-row text-white gap-10 mb-5 sticky top-0 py-5">
      {items.map((item) => (
        <li
          key={item.title}
          className={`${pathname === item.link ? "text-blue-400 " : ""}`}
        >
          <Link to={item.link}>{item.title}</Link>
        </li>
      ))}

      <li className="ml-auto">
        <Search />
        {/* <span onClick={logout} className="cursor-pointer">
          Logout
        </span> */}
      </li>
    </ul>
  );
}
