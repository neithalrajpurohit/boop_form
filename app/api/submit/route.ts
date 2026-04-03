import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB || "boop_forms";

// Serverless-safe: cache client on global to survive hot reloads
declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

async function getClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  if (global._mongoClient) {
    return global._mongoClient;
  }

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });

  await client.connect();
  global._mongoClient = client;
  return client;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const submission = {
      ...body,
      submittedAt: new Date(),
      ip: req.headers.get("x-forwarded-for") || "unknown",
      userAgent: req.headers.get("user-agent") || "unknown",
    };

    const mongoClient = await getClient();
    const db = mongoClient.db(dbName);
    const collection = db.collection("discovery_forms");

    const result = await collection.insertOne(submission);

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("MongoDB submission error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const mongoClient = await getClient();
    const db = mongoClient.db(dbName);
    const collection = db.collection("discovery_forms");

    const submissions = await collection
      .find({})
      .sort({ submittedAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("MongoDB fetch error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
