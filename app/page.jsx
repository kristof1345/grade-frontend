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
    let url = document.querySelector("#url").value;
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
        .post("https://github-grade.herokuapp.com/api", newItem)
        .then((r) => {
          ret = r.data;
          setData(ret);
        });
    } else {
      alert("Please input a valid Github URL");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [data]);

  if (data) {
    console.log(data);
  }

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
          <div className="glass px-24 py-16 pb-8">
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
            <div className="glass px-24 py-9 mt-8">
              <Link
                href={link}
                target="_blank"
                className="flex items-center justify-center text-neutral-300 font-bold text-xl mb-3"
              >
                {repoOwner}/{repoName}
              </Link>
              <div className="text-center text-white font-bold text-2xl mb-4">
                Overall: {data.Overall}
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-neutral-300 text-lg">
                <div className="">Stars: {data.Star}</div>
                <div className="">Forks: {data.Fork}</div>
                <div className="">Commits: {data.Commits}</div>
                <div className="">Issue: {data.Issue}</div>
                <div className="">Update: {data.Update}</div>
                <div className="">Watcher: {data.Watcher}</div>
                <div className="">Pull Requests: {data.Prs}</div>
              </div>
            </div>
          )}
        </>
      </main>
    </>
  );
}
