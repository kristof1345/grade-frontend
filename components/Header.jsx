import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-center items-center h-16 gap-[6vw] sm:gap-24">
      {/* <Link className="nav-link transition-all px-3 py-1 rounded" href="/">
        Home
      </Link>
      <Link className="nav-link transition-all px-3 py-1 rounded" href="/rules">
        Rules
      </Link> */}
      <Link
        className="nav-link text-neutral-200 transition-all px-3 py-1 rounded"
        href="https://github.com/kristof1345/grade-frontend"
        target="_blank"
      >
        Github
      </Link>
    </header>
  );
};

export default Header;
