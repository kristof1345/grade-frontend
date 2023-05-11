"use client";
import Header from "@/components/Header";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState();

  const gradeRepo = (e) => {
    let ret;
    e.preventDefault();
    let url = document.querySelector("#url").value;
    const regex = /https:\/\/github\.com\/(.+)\/(.+)/;
    const match = url.match(regex);
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

  console.log(data);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center grow">
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
      </main>
    </>
  );
}
