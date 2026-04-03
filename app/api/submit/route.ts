import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB || 'boop_forms';

let client: MongoClient;

async function getClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const submission = {
      ...body,
      submittedAt: new Date(),
      ip: req.headers.get('x-forwarded-for') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown',
    };

    const mongoClient = await getClient();
    const db = mongoClient.db(dbName);
    const collection = db.collection('discovery_forms');

    const result = await collection.insertOne(submission);

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 200 });
  } catch (error) {
    console.error('MongoDB submission error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // Optional: admin endpoint to view submissions (protect this in production!)
  try {
    const mongoClient = await getClient();
    const db = mongoClient.db(dbName);
    const collection = db.collection('discovery_forms');

    const submissions = await collection
      .find({})
      .sort({ submittedAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    console.error('MongoDB fetch error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
