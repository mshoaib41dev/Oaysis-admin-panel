import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { path } = req.body;

    try {
      // Perform revalidation logic here
      await res.revalidate(path);
      return res.json({ revalidated: true });
    } catch (err) {
      return res.status(500).send("Error revalidating");
    }
  } else {
    return res.status(405).send("Method Not Allowed");
  }
}
