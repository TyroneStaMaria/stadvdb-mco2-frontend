import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { ISOLATION_LEVELS, Movie } from "@/types";
import Layout from "@/components/Layout";
import TransactionLevel from "@/components/TransactionLevel";

const inter = Inter({ subsets: ["latin"] });

async function getMovies(transactionLevel: ISOLATION_LEVELS): Promise<Movie[]> {
  console.log("Getting movie");
  const { data } = await axios.get(
    `/api/movies?transactionLevel=${transactionLevel}`
  );
  return data;
}

async function searchMovies(
  transactionLevel: ISOLATION_LEVELS,
  query?: string
): Promise<Movie[]> {
  console.log("Getting movie");
  const { data } = await axios.get(
    `/api/movies/search?transactionLevel=${transactionLevel}&search=${query}`
  );
  return data;
}

export default function Home() {
  const [transactionLevel, setTransactionLevel] =
    useState<ISOLATION_LEVELS>("REPEATABLE READ");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const movies = await searchMovies(transactionLevel, search);
    setMovies(movies);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const movies = await getMovies(transactionLevel);
      setMovies(movies);
      setLoading(false);
    })();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-2xl">View movies</h1>
        <TransactionLevel
          transactionLevel={transactionLevel}
          setTransactionLevel={setTransactionLevel}
        />
        <form onSubmit={handleSubmit} className="max-w-md px-4 mx-auto mt-12">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>

        <div className="flex gap-5 justify-center w-full">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Name
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Year
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Rank
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Actor 1
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Actor 2
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Actor 3
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <tr>Loading...</tr>
                    ) : (
                      movies?.map((item, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap px-4 py-2">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2">
                            {item.year}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2">
                            {item.rank}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2">
                            {item.actor1_first_name} {item.actor1_last_name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2">
                            {item.actor2_first_name} {item.actor2_last_name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2">
                            {item.actor3_first_name} {item.actor3_last_name}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
