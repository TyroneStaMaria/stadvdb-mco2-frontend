// pages/api/return-string.ts
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// Export the API route handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/movies?transactionLevel=${req.query.transactionLevel}&page=${req.query.page}`
        );
        res.status(200).send(data);
      } catch (err) {
        console.log(err);
      }
      break;
    case "POST":
      try {
        const { data } = await axios.post(
          `http://localhost:3000/api/movies?transactionLevel=${req.query.transactionLevel}`,
          req.body
        );
        res.status(200).send(data);
      } catch (err) {
        console.log(err);
      }
      break;
    case "PUT":
      try {
        const { data } = await axios.put(
          `http://localhost:3000/api/movies/?transactionLevel=${req.query.transactionLevel}`,
          req.body
        );
        res.status(200).send(data);
      } catch (err) {
        console.log(err);
      }
    default:
      res.status(405).send("Method not allowed");
      break;
  }
};
