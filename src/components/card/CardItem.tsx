import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function CardItem({ children }: Props) {
  return (
    <div className="py-4 flex flex-col items-center text-center sm:bg-slate-800 rounded-lg sm:shadow sm:hover:bg-slate-700 transition ease-in-out">
      {children}
    </div>
  );
}
