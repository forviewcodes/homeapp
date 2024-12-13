export const runtime = 'edge';
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URL;
if (!uri) {
  throw new Error("MONGODB_URL environment variable is not set");
}
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    const dbInfo = await client.db().admin().listDatabases();

    res.status(200).json({
      message: "Successfully connected to MongoDB!",
      databases: dbInfo.databases,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to connect to MongoDB" });
  } finally {
    await client.close();
  }
}
