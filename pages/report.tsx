import Layout from "@/components/Layout";
import TransactionLevel from "@/components/TransactionLevel";
import { ISOLATION_LEVELS, Movie } from "@/types";
import axios from "axios";
import { useState } from "react";

const Report = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [transactionLevel, setTransactionLevel] =
    useState<ISOLATION_LEVELS>("REPEATABLE READ");

  const tabItems = [
    { name: "Count", endpoint: "/api/movies/report/count" },
    { name: "Average", endpoint: "/api/movies/report/avg" },
    { name: "Max", endpoint: "/api/movies/report/max" },
    { name: "Min", endpoint: "/api/movies/report/min" },
  ];

  const handleReport = async (endpoint: string) => {
    setLoading(true);
    const { data } = await axios.get(
      endpoint + `?transactionLevel=${transactionLevel}`
    );
    setMovies(data);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-2xl">Generate reports</h1>
        <TransactionLevel
          transactionLevel={transactionLevel}
          setTransactionLevel={setTransactionLevel}
        />
        <ul
          role="tablist"
          className="hidden max-w-screen-xl mx-auto px-2.5 items-center gap-x-3 overflow-x-auto text-sm bg-gray-50 rounded-lg sm:flex justify-center"
        >
          {tabItems.map((item, idx) => (
            <li key={idx} className="py-2">
              <button
                role="tab"
                aria-controls={`tabpanel-${idx + 1}`}
                className={`py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-600 hover:bg-white active:bg-white/50 font-medium`}
                onClick={() => handleReport(item.endpoint)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-5 justify-center w-full">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-200 mt-5 w-[50%]">
              <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Year
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {movies[0]?.rank ? "Rank" : "Number of movies"}
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
                          {item.year}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          {item.rank ?? item.num_movies ?? ""}
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
    </Layout>
  );
};

export default Report;
