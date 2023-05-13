"use client";
import Header from "@/components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [link, setLink] = useState("");

  const gradeRepo = (e) => {
    setLoading(true);
    let ret;
    e.preventDefault();
    const regex1 = /^https:\/\/github\.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+$/;
    let url = document.querySelector("#url").value;
    if (regex1.test(url)) {
      const regex = /https:\/\/github\.com\/(.+)\/(.+)/;
      const match = url.match(regex);
      setRepoOwner(match[1]);
      setRepoName(match[2]);
      setLink(url);
      if (match) {
        const user = match[1];
        const repo = match[2];
        const newItem = {
          owner: user,
          name: repo,
        };
        axios
          .post("https://githubgrade-production.up.railway.app/api", newItem)
          .then((r) => {
            ret = r.data;
            setData(ret);
          });
      } else {
        alert("Please input a valid Github URL");
        setLoading(false);
      }
    } else {
      setLoading(false);
      alert("Please input a valid Github URL");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [data]);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center grow">
        {loading && (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        )}
        <>
          <div className="glass px-[8vw] py-16 pb-8 sm:px-24">
            <form
              className="flex flex-col items-center gap-9"
              onSubmit={(e) => gradeRepo(e)}
            >
              <input
                className="input text-base px-4 py-2 rounded"
                id="url"
                placeholder="Add a Github repo url"
              />
              <button className="btn px-7 py-2 max-w-max rounded transition-all">
                Grade
              </button>
            </form>
          </div>
          {data && (
            <div className="glass px-[8vw] sm:px-24 py-9 mt-8">
              <Link
                href={link}
                target="_blank"
                className="flex items-center justify-center text-neutral-300 hover:text-white transition-all font-bold text-xl mb-3"
              >
                {repoOwner}/{repoName}
              </Link>
              <div className="text-center text-white font-bold text-2xl mb-4">
                Overall: {data.Overall}
              </div>
              <div className="grid grid-cols-2 gap-x-1 sm:gap-x-2 gap-y-1 text-neutral-300 sm:text-lg">
                <div>Stars: {data.Star}</div>
                <div>Forks: {data.Fork}</div>
                <div>Commits: {data.Commits}</div>
                <div>Issue: {data.Issue}</div>
                <div>Update: {data.Update}</div>
                <div>Watcher: {data.Watcher}</div>
                <div>Pull Requests: {data.Prs}</div>
              </div>
            </div>
          )}
        </>
      </main>
    </>
  );
}
