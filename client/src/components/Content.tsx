import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Content({ children }: Props) {
  return (
    <>
      <div className="flex-1 overflow-hidden">
        <div className="flex-1 p-5 max-w-8xl mx-auto">{children}</div>
      </div>
    </>
  );
}
