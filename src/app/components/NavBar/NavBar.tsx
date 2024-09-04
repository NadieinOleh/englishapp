import Link from "next/link";
import React from "react";

export const NavBar = () => {
  return (
    <div className="flex p-4 justify-between items-center">
      <Link href={"/"}>NavBar</Link>

      <button className="bg-slate-900 text-white px-6 py-2 rounded  flex justify-content items-center shadow-md">Sign In</button>
    </div>
  );
};
