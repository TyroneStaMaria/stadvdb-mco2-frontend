// pages/api/return-string.ts
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// Export the API route handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/movie/${req.query.id}`
  );
  res.status(200).send(data[0]);
};
