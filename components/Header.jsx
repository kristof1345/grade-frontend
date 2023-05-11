import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-center items-center h-14 gap-24">
      <Link href="#">Rules</Link>
      <Link
        href="https://github.com/kristof1345/grade-frontend"
        target="_blank"
      >
        Github
      </Link>
      <Link href="https://github.com/kristof1345/github_grade" target="_blank">
        API
      </Link>
    </header>
  );
};

export default Header;
