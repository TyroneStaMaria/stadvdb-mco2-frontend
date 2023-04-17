import Layout from "@/components/Layout";
import TransactionLevel from "@/components/TransactionLevel";
import { ISOLATION_LEVELS } from "@/types";
import axios from "axios";
import React, { useState } from "react";

const DEFAULT_DATA = {
  name: "",
  year: "",
  rank: "",
  actor1_first_name: "",
  actor1_last_name: "",
  actor2_first_name: "",
  actor2_last_name: "",
  actor3_first_name: "",
  actor3_last_name: "",
};

const AddMovie = () => {
  const [transactionLevel, setTransactionLevel] =
    useState<ISOLATION_LEVELS>("REPEATABLE READ");
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setError(false);
      setSuccess(false);
      await axios.post(
        `/api/movies?transactionLevel=${transactionLevel}`,
        formData
      );
      setFormData(DEFAULT_DATA);
      setSuccess(true);
    } catch (err) {
      console.log(err)
      setError(true);
    }
  };
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-10 pb-10">
        <h1 className="text-2xl">Insert Movie</h1>
        <TransactionLevel
          transactionLevel={transactionLevel}
          setTransactionLevel={setTransactionLevel}
        />
        {success && (
          <h3 className="text-green-500">Movie added successfully</h3>
        )}
        {error && <h3 className="text-red-500">Error adding movie</h3>}
        <form onSubmit={handleSubmit} className="flex flex-col w-[50%]">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            required
          />

          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />

          <label htmlFor="rank">Rank</label>
          <input
            type="number"
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            id="rank"
            name="rank"
            value={formData.rank}
            onChange={handleChange}
            required
          />

          <label htmlFor="actor1_first_name">Actor 1 First Name</label>
          <input
            type="text"
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            id="actor1_first_name"
            name="actor1_first_name"
            value={formData.actor1_first_name}
            onChange={handleChange}
          />

          <label htmlFor="actor1_last_name">Actor 1 Last Name</label>
          <input
            type="text"
            id="actor1_last_name"
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            name="actor1_last_name"
            value={formData.actor1_last_name}
            onChange={handleChange}
          />

          <label htmlFor="actor2_first_name">Actor 2 First Name</label>
          <input
            type="text"
            id="actor2_first_name"
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            name="actor2_first_name"
            value={formData.actor2_first_name}
            onChange={handleChange}
          />

          <label htmlFor="actor2_last_name">Actor 2 Last Name</label>
          <input
            type="text"
            id="actor2_last_name"
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            name="actor2_last_name"
            value={formData.actor2_last_name}
            onChange={handleChange}
          />

          <label htmlFor="actor3_first_name">Actor 3 First Name</label>
          <input
            type="text"
            id="actor3_first_name"
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            name="actor3_first_name"
            value={formData.actor3_first_name}
            onChange={handleChange}
          />

          <label htmlFor="actor3_last_name">Actor 3 Last Name</label>
          <input
            type="text"
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            id="actor3_last_name"
            name="actor3_last_name"
            value={formData.actor3_last_name}
            onChange={handleChange}
          />

          <button type="submit" className="mt-5 bg-blue-600 p-5 text-white">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddMovie;
