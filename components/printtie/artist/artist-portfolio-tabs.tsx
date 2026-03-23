"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type TabKey = "selling" | "all" | "ended";

type PortfolioWork = {
  work_id: string;
  title: string;
  meta: string;
  price: number | null;
  priceLabel: string;
  cta: "장바구니" | "상세보기";
  img: string;
  status: "selling" | "ended";
};

export function ArtistPortfolioTabs({ worksTotal }: { worksTotal: number }) {
  const [tab, setTab] = useState<TabKey>("selling");
  const [works, setWorks] = useState<PortfolioWork[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // artistId not available here; component is used on artist page so we derive from location
        const path = typeof window !== 'undefined' ? window.location.pathname : '';
        const match = path.match(/\/artists\/(.+)/);
        const artistId = match ? match[1] : undefined;
        const q = new URLSearchParams();
        q.set('sort', 'new');
        q.set('limit', '50');
        if (artistId) q.set('artistId', artistId);
        const res = await fetch(`/api/works?${q.toString()}`);
        if (!res.ok) throw new Error('작품을 불러오지 못했습니다.');
        const payload = await res.json();
        const data = payload.data ?? [];
        if (!isMounted) return;
        const mapped: PortfolioWork[] = data.map((w: any) => ({
          work_id: w.work_id ?? w.id ?? String(Math.random()),
          title: w.title ?? '제목 없음',
          meta: '',
          price: w.price ? Number(w.price) : null,
          priceLabel: w.price ? `₩${Number(w.price).toLocaleString()}` : '—',
          cta: '상세보기',
          img: w.thumbnail_url ?? 'https://via.placeholder.com/520x300',
          status: w.is_purchased ? 'ended' : 'selling',
        }));
        setWorks(mapped);
      } catch (err: any) {
        setError(err?.message ?? '서버 에러');
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const visible = useMemo(() => {
    if (!works) return [];
    if (tab === "all") return works;
    if (tab === "ended") return works.filter((w) => w.status === "ended");
    return works.filter((w) => w.status === "selling");
  }, [works, tab]);

  return (
    <section className="w-full bg-cyan-50 px-[32px] py-[40px]">
      <div className="w-full flex flex-row items-center justify-between mb-[20px]">
        <h2 className="text-cyan-900 font-atkinson">포트폴리오</h2>
        <div className="flex flex-row gap-[12px]">
          <Button
            variant="outline"
            onClick={() => setTab("selling")}
            className={
              tab === "selling"
                ? "h-[40px] px-[16px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none font-atkinson"
                : "h-[40px] px-[16px] bg-white border border-cyan-100 text-cyan-700 shadow-sm rounded-none font-atkinson"
            }
          >
            판매중
          </Button>
          <Button
            variant="outline"
            onClick={() => setTab("all")}
            className={
              tab === "all"
                ? "h-[40px] px-[16px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none font-atkinson"
                : "h-[40px] px-[16px] bg-white border border-cyan-100 text-cyan-700 shadow-sm rounded-none font-atkinson"
            }
          >
            전체
          </Button>
          <Button
            variant="outline"
            onClick={() => setTab("ended")}
            className={
              tab === "ended"
                ? "h-[40px] px-[16px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none font-atkinson"
                : "h-[40px] px-[16px] bg-white border border-cyan-100 text-cyan-700 shadow-sm rounded-none font-atkinson"
            }
          >
            종료
          </Button>
        </div>
      </div>

      <div className="w-full bg-white border border-cyan-100 p-[16px] shadow-pt-sm">
        <div className="flex flex-row items-center justify-between mb-[12px]">
          <div className="text-cyan-700 font-atkinson">필터 · 정렬</div>
          <div className="text-cyan-500 font-atkinson">총 {worksTotal}개 작품</div>
        </div>

        {loading && <div className="p-6 text-cyan-700">작품을 불러오는 중입니다...</div>}
        {error && <div className="p-6 text-red-600">{error}</div>}

        <div className="w-full grid grid-cols-3 gap-[16px]">
          {(visible || []).slice(0, 3).map((w) => (
            <article key={w.work_id} className="bg-white border border-cyan-100 p-[12px] shadow-pt-sm">
              <Image
                src={w.img}
                alt={w.title}
                width={520}
                height={300}
                className="w-full h-[200px] object-cover mb-[12px]"
                unoptimized
              />
              <h4 className="text-cyan-900 mb-[8px] font-atkinson">{w.title}</h4>
              <p className="text-cyan-700 mb-[8px] font-atkinson text-[13px]">{w.meta}</p>
              <div className="flex flex-row items-center justify-between">
                <span className="text-cyan-900 font-atkinson">{w.priceLabel}</span>
                <Button
                  className={
                    w.cta === "장바구니"
                      ? "h-[36px] px-[12px] bg-cyan-600 border border-transparent text-white shadow rounded-none font-atkinson"
                      : "h-[36px] px-[12px] bg-white border border-cyan-100 text-cyan-700 shadow-sm rounded-none font-atkinson"
                  }
                  variant={w.cta === "장바구니" ? "default" : "outline"}
                >
                  {w.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="w-full flex flex-row items-center justify-center mt-[20px]">
          <Button
            variant="outline"
            className="h-[40px] px-[20px] bg-white border border-cyan-100 text-cyan-700 shadow-sm rounded-none font-atkinson"
          >
            더 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
