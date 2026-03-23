import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    artist_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    profile_image_url TEXT,
    bio TEXT,
    followers_count INTEGER DEFAULT 0,
    works_count INTEGER DEFAULT 0,
    subscribers_count INTEGER DEFAULT 0,
    socials JSONB DEFAULT '[]'::jsonb,
    exhibition_history JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
}

// GET /api/artists?artistId=kim-sujin
export async function GET(request: Request) {
  await ensureTable();
  try {
    const url = new URL(request.url);
    const artistId = url.searchParams.get("artistId");

    if (artistId) {
      const rows = await sql`
        SELECT artist_id, name, profile_image_url, bio, followers_count, works_count, subscribers_count, socials, exhibition_history
        FROM artists WHERE artist_id = ${artistId}
      `;
      if (rows.length === 0) {
        return NextResponse.json({ error: "작가를 찾을 수 없습니다." }, { status: 404 });
      }
      return NextResponse.json(rows[0]);
    }

    // list with simple pagination
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Math.min(Number(url.searchParams.get("limit") || "20"), 100);
    const offset = (Math.max(1, page) - 1) * limit;

    const rows = await sql`
      SELECT artist_id, name, profile_image_url, bio, followers_count, works_count, subscribers_count, socials, exhibition_history
      FROM artists ORDER BY followers_count DESC NULLS LAST LIMIT ${limit} OFFSET ${offset}
    `;

    return NextResponse.json({ data: rows, page, limit });
  } catch (err) {
    return NextResponse.json({ error: "서버 에러로 작가 목록을 불러올 수 없습니다." }, { status: 500 });
  }
}

// POST to create/update artist (upsert by artist_id)
export async function POST(request: Request) {
  await ensureTable();
  try {
    const body = await request.json();
    const {
      artist_id,
      name,
      profile_image_url = null,
      bio = null,
      followers_count = 0,
      works_count = 0,
      subscribers_count = 0,
      socials = [],
      exhibition_history = [],
    } = body;

    if (!artist_id || !name) {
      return NextResponse.json({ error: "artist_id와 name이 필요합니다." }, { status: 400 });
    }

    const rows = await sql`
      INSERT INTO artists (artist_id, name, profile_image_url, bio, followers_count, works_count, subscribers_count, socials, exhibition_history)
      VALUES (${artist_id}, ${name}, ${profile_image_url}, ${bio}, ${followers_count}, ${works_count}, ${subscribers_count}, ${JSON.stringify(socials)}, ${JSON.stringify(exhibition_history)})
      ON CONFLICT (artist_id) DO UPDATE SET
        name = EXCLUDED.name,
        profile_image_url = EXCLUDED.profile_image_url,
        bio = EXCLUDED.bio,
        followers_count = EXCLUDED.followers_count,
        works_count = EXCLUDED.works_count,
        subscribers_count = EXCLUDED.subscribers_count,
        socials = EXCLUDED.socials,
        exhibition_history = EXCLUDED.exhibition_history
      RETURNING artist_id, name, profile_image_url, bio, followers_count, works_count, subscribers_count, socials, exhibition_history
    `;

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "작가 생성/수정 중 오류가 발생했습니다." }, { status: 500 });
  }
}
