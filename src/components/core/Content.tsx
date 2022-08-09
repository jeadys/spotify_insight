import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Content({ children }: Props) {
  return (
    <>
      <div className="bg-gray-900 min-h-screen font-maven">
        <div className="min-h-screen">
          <div className="p-5 max-w-8xl mx-auto">{children}</div>
        </div>
      </div>
    </>
  );
}
