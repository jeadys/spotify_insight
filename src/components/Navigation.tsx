import Link from "next/link";
import { useRouter } from "next/router";

import Search from "./Search";

export default function Navigation() {
  const { pathname } = useRouter();

  const items = [
    {
      title: "Profile",
      link: "/profile",
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
    <ul className="w-full flex flex-row text-white gap-10 py-5">
      {items.map((item) => (
        <li
          key={item.title}
          className={`text-sm uppercase underline-offset-8 decoration-4 ${
            pathname === item.link
              ? "underline decoration-sky-700 cursor-default"
              : "hover:underline hover: decoration-sky-900"
          }`}
        >
          <Link href={item.link}>
            <a>{item.title}</a>
          </Link>
        </li>
      ))}

      <li className="ml-auto">
        <Search />
      </li>
    </ul>
  );
}
