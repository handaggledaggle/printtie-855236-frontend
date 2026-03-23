export type WorkSort = "new" | "popular" | "price_asc" | "price_desc";

export type WorkSummary = {
  work_id: string;
  title: string;
  thumbnail_url: string;
  price: number | null;
  created_at: string; // ISO8601
  is_subscribed: boolean;
  is_purchased: boolean;
  like_count: number;
  artist_name: string;
};

export type ArtistProfile = {
  artist_id: string;
  name: string;
  profile_image_url: string;
  bio: string | null;
  followers_count: number;
  works_count: number;
  subscribers_count: number;
  socials: { label: string; href: string }[];
  exhibition_history: string[];
};
