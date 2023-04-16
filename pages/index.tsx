import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { ISOLATION_LEVELS } from "@/types";

const inter = Inter({ subsets: ["latin"] });

async function getMovie(name: string) {
  console.log("Getting movie");
  const { data } = await axios.get(`/api/movie?name=${name}`);
  return data;
}

export default function Home() {
  const [node1, setNode1] = useState(null);
  const [node2, setNode2] = useState(null);
  const [transactionLevel, setTransactionLevel] =
    useState<ISOLATION_LEVELS>("SERIALIZABLE");
  const [movieId, setMovieId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const [n1, n2] = await Promise.all([getMovie(movieId), getMovie(movieId)]);
    setNode1(n1);
    setNode2(n2);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-2xl">Case 1: Read both</h1>
      <div>
        <label htmlFor="name" className="block py-3 text-gray-500">
          Movie id
        </label>
        <div className="flex items-center p-2 border rounded-md">
          <input
            onChange={(event) => {
              setMovieId(event.target.value);
            }}
            type="id"
            id="id"
            className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
          />
        </div>
      </div>
      <div>
        <h2 className="text-lg">
          Current Transaction Level: {transactionLevel}
        </h2>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <select
            onChange={(event) => {
              setTransactionLevel(event.target.value as ISOLATION_LEVELS);
            }}
            defaultValue={"SERIALIZABLE"}
            className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
          >
            <option value="READ UNCOMMITTED">READ UNCOMMITTED</option>
            <option value="READ COMMITTED">READ COMMITTED</option>
            <option value="REPEATABLE READ">REPEATABLE READ</option>
            <option value="SERIALIZABLE">SERIALIZABLE</option>
          </select>
        </div>
      </div>
      <div>
        <button className="bg-blue-700 text-white p-4 " onClick={handleSubmit}>
          Read
        </button>
      </div>
      <div className="flex gap-5 justify-center w-full">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>
              <h2>Node 1</h2>
              {node1}
            </div>
            <div>
              <h2>Node 2</h2>
              {node2}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
