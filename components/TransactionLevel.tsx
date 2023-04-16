import { ISOLATION_LEVELS } from "@/types";
import { FC } from "react";

const TransactionLevel: FC<{
  transactionLevel: ISOLATION_LEVELS;
  setTransactionLevel: (str: ISOLATION_LEVELS) => void;
}> = ({ transactionLevel, setTransactionLevel }) => {
  return (
    <div>
      <h2 className="text-lg">Current Transaction Level: {transactionLevel}</h2>
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
          defaultValue={transactionLevel || "REPEATABLE READ"}
          className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
        >
          <option value="READ UNCOMMITTED">READ UNCOMMITTED</option>
          <option value="READ COMMITTED">READ COMMITTED</option>
          <option value="REPEATABLE READ">REPEATABLE READ</option>
          <option value="SERIALIZABLE">SERIALIZABLE</option>
        </select>
      </div>
    </div>
  );
};

export default TransactionLevel;
