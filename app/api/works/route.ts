import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS works (
    id SERIAL PRIMARY KEY,
    work_id TEXT UNIQUE NOT NULL,
    artist_id TEXT NOT NULL,
    title TEXT NOT NULL,
    thumbnail_url TEXT,
    price NUMERIC,
    is_subscribed BOOLEAN DEFAULT false,
    is_purchased BOOLEAN DEFAULT false,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
}

// GET /api/works?artistId=kim-sujin&sort=new&page=1&limit=20
export async function GET(request: Request) {
  await ensureTable();
  try {
    const url = new URL(request.url);
    const artistId = url.searchParams.get("artistId");
    const sort = url.searchParams.get("sort") || "new"; // new | popular | price_asc | price_desc
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Math.min(Number(url.searchParams.get("limit") || "20"), 100);
    const offset = (Math.max(1, page) - 1) * limit;

    let orderBy = sql`created_at DESC`;
    if (sort === "popular") orderBy = sql`like_count DESC` as any;
    if (sort === "price_asc") orderBy = sql`price ASC NULLS LAST` as any;
    if (sort === "price_desc") orderBy = sql`price DESC NULLS LAST` as any;

    if (artistId) {
      const rows = await sql`
        SELECT work_id, title, thumbnail_url, price::TEXT AS price, created_at, is_subscribed, is_purchased, like_count
        FROM works WHERE artist_id = ${artistId}
        ORDER BY ${orderBy}
        LIMIT ${limit} OFFSET ${offset}
      `;
      return NextResponse.json({ data: rows, page, limit });
    }

    const rows = await sql`
      SELECT work_id, title, thumbnail_url, price::TEXT AS price, created_at, is_subscribed, is_purchased, like_count, artist_id
      FROM works
      ORDER BY ${orderBy}
      LIMIT ${limit} OFFSET ${offset}
    `;
    return NextResponse.json({ data: rows, page, limit });
  } catch (err) {
    return NextResponse.json({ error: "작품을 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

// POST to create a work
export async function POST(request: Request) {
  await ensureTable();
  try {
    const body = await request.json();
    const { work_id, artist_id, title, thumbnail_url = null, price = null } = body;
    if (!work_id || !artist_id || !title) {
      return NextResponse.json({ error: "work_id, artist_id, title이 필요합니다." }, { status: 400 });
    }

    const rows = await sql`
      INSERT INTO works (work_id, artist_id, title, thumbnail_url, price)
      VALUES (${work_id}, ${artist_id}, ${title}, ${thumbnail_url}, ${price})
      ON CONFLICT (work_id) DO UPDATE SET
        title = EXCLUDED.title,
        thumbnail_url = EXCLUDED.thumbnail_url,
        price = EXCLUDED.price
      RETURNING work_id, artist_id, title, thumbnail_url, price::TEXT AS price, created_at
    `;

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "작품 생성 중 오류가 발생했습니다." }, { status: 500 });
  }
}
