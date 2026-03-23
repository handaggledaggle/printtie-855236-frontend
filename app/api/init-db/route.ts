import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`CREATE TABLE IF NOT EXISTS artist (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW()
    )`;
    await sql`CREATE TABLE IF NOT EXISTS artists (
      id SERIAL PRIMARY KEY,
      artist_id INTEGER,
      bio TEXT,
      exhibition_history VARCHAR(255),
      followers_count VARCHAR(255),
      name VARCHAR(255),
      profile_image_url VARCHAR(255),
      socials VARCHAR(255),
      subscribers_count VARCHAR(255),
      works_count VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    )`;
    await sql`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW(),
      email VARCHAR(255) UNIQUE,
      name VARCHAR(255),
      password_hash VARCHAR(255)
    )`;
    await sql`CREATE TABLE IF NOT EXISTS works (
      id SERIAL PRIMARY KEY,
      artist_id INTEGER,
      created_at TIMESTAMP DEFAULT NOW(),
      is_purchased VARCHAR(255),
      is_subscribed VARCHAR(255),
      like_count VARCHAR(255),
      price INTEGER DEFAULT 0,
      text TEXT,
      thumbnail_url VARCHAR(255),
      title VARCHAR(255),
      work_id INTEGER
    )`;
    return NextResponse.json({ success: true, message: 'Tables initialized' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
