// pages/api/return-string.ts
import { NextApiRequest, NextApiResponse } from "next";

// Define an async function that returns a promise resolving to a string
async function getStringPromise(str: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Movie: " + str);
    }, 2000);
  });
}

// Export the API route handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query.name, new Date().toISOString());
  const result = await getStringPromise(req.query.name as string);
  res.status(200).send(result);
};
