import Image from "next/image";
import { PageShell } from "@/components/printtie/page-shell";
import { Button } from "@/components/ui/button";
import { ArtistPortfolioTabs } from "@/components/printtie/artist/artist-portfolio-tabs";

export default async function ArtistProfilePage({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) {
  const { artistId } = await params;

  // fetch artist from internal API
  let artist: any = null;
  try {
    const res = await fetch(`/api/artists?artistId=${encodeURIComponent(artistId)}`, {
      cache: "no-store",
    });
    if (res.ok) {
      artist = await res.json();
    }
  } catch (e) {
    // keep null -> fallback to UI placeholder
  }

  const fallback = {
    artist_id: artistId,
    name: "김수진",
    profile_image_url: "https://via.placeholder.com/112x112",
    tagline: "Tagline: 작가와 팬을 잇는, 작품 발견에서 배송까지",
    meta: "작가 · 판화·드로잉 · 서울 기반",
    followers: "12.3k",
    works: 48,
    subscribers: "1.1k",
  } as const;

  const model = artist ?? fallback;

  return (
    <PageShell>
      {/* artist-header */}
      <section className="w-full bg-white px-[32px] py-[40px]">
        <header className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-[20px]">
            <div className="w-[120px] h-[120px] bg-cyan-50 border border-cyan-100 rounded-[8px] flex items-center justify-center shadow-pt-sm">
              <Image
                src={model.profile_image_url}
                alt="작가 아바타"
                width={112}
                height={112}
                className="w-[112px] h-[112px] object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-cyan-900 text-[28px] mb-[12px] font-atkinson">{model.name}</h1>
              <p className="text-cyan-700 text-[14px] mb-[8px] font-atkinson">{model.meta}</p>
              <p className="text-cyan-500 text-[13px] font-atkinson">{model.tagline}</p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-[12px]">
            <div className="flex flex-col items-end">
              <div className="flex flex-row gap-[12px]">
                <Button className="h-[44px] px-[20px] bg-cyan-600 border border-cyan-600 text-white shadow-md rounded-none font-atkinson">
                  구독하기
                </Button>
                <Button
                  variant="outline"
                  className="h-[44px] px-[16px] bg-white border border-cyan-100 text-cyan-700 shadow-sm rounded-none font-atkinson"
                >
                  팔로우
                </Button>
              </div>
              <div className="flex flex-row gap-[16px] mt-[12px]">
                <span className="text-cyan-700 font-atkinson">
                  팔로워 <span className="text-cyan-900">{artist?.followers_count ?? model.followers}</span>
                </span>
                <span className="text-cyan-700 font-atkinson">
                  작품 <span className="text-cyan-900">{artist?.works_count ?? model.works}</span>
                </span>
                <span className="text-cyan-700 font-atkinson">
                  구독자 <span className="text-cyan-900">{artist?.subscribers_count ?? model.subscribers}</span>
                </span>
              </div>
            </div>
          </div>
        </header>
      </section>

      {/* bio-and-socials */}
      <section className="w-full bg-cyan-50 px-[32px] py-[40px]">
        <div className="w-full flex flex-row gap-[24px]">
          <div className="w-[720px] flex flex-col">
            <h2 className="text-cyan-900 text-[20px] mb-[16px] font-atkinson">작가 소개</h2>
            <div className="w-full bg-white border border-cyan-100 p-[20px] shadow-pt-sm">
              <p className="text-cyan-700 mb-[12px] font-atkinson">
                {artist?.bio ?? `김수진은 판화와 드로잉을 중심으로 작업하는 서울 기반 작가입니다. 전통적 판화기법과 디지털 프로세스를 결합해 한정판 에디션과 프린트를 제작합니다.`}
              </p>
            </div>

            <h3 className="text-cyan-900 text-[16px] mt-[24px] mb-[12px] font-atkinson">전시·아카이브</h3>
            <div className="w-full bg-white border border-cyan-100 p-[16px] shadow-pt-sm">
              <ul className="flex flex-col gap-[8px]">
                {(artist?.exhibition_history ?? ["2024 — 개인전 '조용한 표면' · 갤러리 산"]).map((ev: string, i: number) => (
                  <li key={i} className="text-cyan-700 font-atkinson">{ev}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="w-[360px] flex flex-col gap-[16px]">
            <div className="w-full bg-white border border-cyan-100 p-[16px] shadow-pt-sm">
              <h4 className="text-cyan-900 mb-[8px] font-atkinson">연락·SNS</h4>
              <div className="flex flex-col gap-[8px]">
                {(artist?.socials ?? [{ label: 'Instagram · @sujin_prints', href: '#' }]).map((s: any, idx: number) => (
                  <a key={idx} className="text-cyan-700 font-atkinson" href={s.href ?? '#'}>
                    {s.label ?? s}
                  </a>
                ))}
                <a className="text-cyan-700 font-atkinson" href="#">Email · contact@sujinprints.com</a>
              </div>
            </div>

            <div className="w-full bg-white border border-cyan-100 p-[16px] shadow-pt-sm">
              <h4 className="text-cyan-900 mb-[8px] font-atkinson">구독 혜택</h4>
              <p className="text-cyan-700 mb-[8px] font-atkinson">
                구독 시 신작 알림, 한정판 우선 구매권, 배송 추적 업데이트를 제공합니다.
              </p>
              <div className="flex flex-row gap-[12px]">
                <Button className="h-[40px] px-[16px] bg-cyan-600 border border-transparent text-white shadow-md rounded-none font-atkinson">
                  월 구독 시작
                </Button>
                <Button
                  variant="outline"
                  className="h-[40px] px-[16px] bg-white border border-cyan-100 text-cyan-700 shadow-sm rounded-none font-atkinson"
                >
                  혜택 보기
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* artist-notices */}
      <section className="w-full bg-white px-[32px] py-[40px]">
        <h2 className="text-cyan-900 mb-[16px] font-atkinson">공지 & 신작 안내</h2>
        <div className="w-full flex flex-col gap-[12px]">
          <article className="w-full bg-cyan-50 border border-cyan-100 p-[16px] shadow-pt-sm">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p className="text-cyan-900 font-atkinson">신작 에디션 발매</p>
                <p className="text-cyan-700 font-atkinson">2026-03-10 · 한정 에디션 '물의 표면' 30부 발매 예정</p>
              </div>
              <div className="text-green-600 font-atkinson">신규</div>
            </div>
          </article>
        </div>
      </section>

      {/* portfolio-tabs + artist-artwork-grid */}
      <ArtistPortfolioTabs worksTotal={artist?.works_count ?? fallback.works} />

      {/* trust-and-sharing */}
      <section className="w-full bg-white px-[32px] py-[40px]">
        <div className="w-full flex flex-row gap-[24px]">
          <aside className="w-[520px] flex flex-col gap-[12px]">
            <div className="w-full bg-cyan-50 border border-cyan-100 p-[16px] shadow-pt-sm">
              <Image
                src="https://via.placeholder.com/480x300"
                alt="대표작 이미지"
                width={480}
                height={300}
                className="w-full h-[300px] object-cover mb-[12px]"
                unoptimized
              />
              <h3 className="text-cyan-900 mb-[8px] font-atkinson">대표작: 물의 표면 #1</h3>
              <p className="text-cyan-700 mb-[8px] font-atkinson">한정판 프린트 · 30부 · 작가 직접 서명 · 안전 포장 및 배송</p>
            </div>
          </aside>

          <div className="flex-1 flex flex-col gap-[12px]">
            <div className="w-full bg-white border border-cyan-100 p-[16px] shadow-pt-sm">
              <h4 className="text-cyan-900 mb-[12px] font-atkinson">신뢰 정보</h4>
              <div className="flex flex-col gap-[8px]">
                <p className="text-cyan-700 font-atkinson">평균 배송 리드타임: <span className="text-cyan-900">5-8 영업일</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
