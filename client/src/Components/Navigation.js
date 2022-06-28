import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { logout } from "../spotify";

export default function Navigation() {
  const { pathname } = useLocation();

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
    <ul className="w-full flex flex-row text-white gap-10 mb-5 sticky top-0">
      {items.map((item) => (
        <li
          key={item.title}
          className={`${pathname === item.link ? "text-blue-600" : ""} py-5`}
        >
          <Link to={item.link}>{item.title}</Link>
        </li>
      ))}
      <li onClick={logout} className="py-5 ml-auto cursor-pointer">
        Logout
      </li>
    </ul>
  );
}
