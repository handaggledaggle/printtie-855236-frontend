import Image from "next/image";
import { PageShell } from "@/components/printtie/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const shelves = {
  popular: [
    {
      title: "작가 A — 작품명 1",
      sub: "25,000원",
      img: "https://via.placeholder.com/196x120",
    },
    {
      title: "작가 B — 작품명 2",
      sub: "120,000원",
      img: "https://via.placeholder.com/196x120",
    },
    {
      title: "작가 C — 작품명 3",
      sub: "한정판",
      img: "https://via.placeholder.com/196x120",
    },
  ],
  new: [
    {
      title: "작가 D — 신작 1",
      sub: "출시 2일 전",
      img: "https://via.placeholder.com/196x120",
    },
    {
      title: "작가 E — 신작 2",
      sub: "출시 1주일 전",
      img: "https://via.placeholder.com/196x120",
    },
  ],
  curator: [
    {
      title: "큐레이터 추천 A",
      sub: "전시 연계",
      img: "https://via.placeholder.com/196x120",
    },
  ],
} as const;

const grid = [
  {
    title: "작가 F — 작품 1",
    price: "64,000원",
    img: "https://via.placeholder.com/320x200",
  },
  {
    title: "작가 G — 작품 2",
    price: "120,000원",
    img: "https://via.placeholder.com/320x200",
  },
  {
    title: "작가 H — 작품 3",
    price: "한정판",
    img: "https://via.placeholder.com/320x200",
  },
  {
    title: "작가 I — 작품 4",
    price: "45,000원",
    img: "https://via.placeholder.com/320x200",
  },
] as const;

export default function FeedPage() {
  return (
    <PageShell>
      <header className="w-full bg-white/60 px-[32px] py-[24px] border-b border-cyan-100/80 backdrop-blur-sm">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-[16px]">
            <div className="text-cyan-900 text-[20px] font-medium font-atkinson">printtie</div>
            <div className="text-cyan-600 text-[14px] font-atkinson">
              작가와 팬을 잇는, 작품 발견에서 배송까지
            </div>
          </div>
          <div className="flex flex-row items-center gap-[12px]">
            <Button
              variant="outline"
              className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-700 shadow-sm rounded-none font-atkinson"
            >
              로그인
            </Button>
            <Button
              variant="outline"
              className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-700 shadow-sm rounded-none font-atkinson"
            >
              회원가입
            </Button>
          </div>
        </div>
      </header>

      <main className="w-full px-[32px] py-[32px] flex flex-col gap-[40px]">
        {/* search-hero */}
        <section className="w-full bg-gradient-to-r from-cyan-50 to-green-50 rounded-[8px] p-[24px] flex flex-row items-start gap-[24px] shadow-pt-md">
          <div className="w-full flex flex-col gap-[16px]">
            <h1 className="text-cyan-900 text-[24px] font-atkinson">작품 탐색</h1>
            <p className="text-cyan-700 text-[14px] mb-[12px] font-atkinson">
              검색, 필터, 추천으로 원하는 작품을 빠르게 찾고 상세로 이동하세요.
            </p>

            <form className="w-full flex flex-row items-center gap-[12px]">
              <Input
                className="w-full h-[44px] px-[12px] border border-cyan-100 bg-white text-cyan-800 shadow-sm rounded-none font-atkinson"
                placeholder="작가명, 작품명, 키워드로 검색"
              />
              <select className="h-[44px] px-[12px] border border-cyan-100 bg-white text-cyan-800 font-atkinson">
                <option>전체 카테고리</option>
                <option>회화</option>
                <option>판화</option>
                <option>사진</option>
              </select>
              <Button className="h-[44px] px-[16px] bg-cyan-600 text-white rounded-md shadow-sm border border-transparent font-atkinson">
                검색
              </Button>
            </form>

            <div className="w-full flex flex-row items-center gap-[8px]">
              <div className="flex flex-row items-center gap-[8px]">
                <span className="text-cyan-600 text-[13px] font-atkinson">빠른필터:</span>
                {[
                  "인기",
                  "신작",
                  "한정판",
                  "무료배송",
                ].map((t) => (
                  <Button
                    key={t}
                    variant="outline"
                    className="h-[32px] px-[10px] bg-white border border-cyan-100 text-cyan-800 shadow-sm rounded-none font-atkinson"
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <aside className="w-[300px] bg-white border border-cyan-100 p-[12px] shadow-pt-sm">
            <div className="text-cyan-700 text-[13px] mb-[8px] font-atkinson">주요 지표</div>
            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-row justify-between text-cyan-900 font-atkinson">
                <span className="text-[14px]">이번주 인기 작품</span>
                <span className="text-[14px]">124</span>
              </div>
              <div className="flex flex-row justify-between text-cyan-900 font-atkinson">
                <span className="text-[14px]">구독자 새 소식</span>
                <span className="text-[14px]">46명</span>
              </div>
            </div>
          </aside>
        </section>

        {/* filter-bar */}
        <section className="w-full bg-white border border-cyan-100 p-[16px] flex flex-row items-center gap-[12px] shadow-pt-sm">
          <div className="flex flex-row items-center gap-[12px]">
            <label className="text-cyan-600 text-[13px] font-atkinson">장르</label>
            <select className="h-[40px] px-[10px] border border-cyan-100 bg-white text-cyan-800 font-atkinson">
              <option>전체</option>
              <option>회화</option>
              <option>드로잉</option>
            </select>
          </div>

          <div className="flex flex-row items-center gap-[12px]">
            <label className="text-cyan-600 text-[13px] font-atkinson">가격</label>
            <select className="h-[40px] px-[10px] border border-cyan-100 bg-white text-cyan-800 font-atkinson">
              <option>전체</option>
              <option>~50,000원</option>
              <option>50,000~200,000원</option>
            </select>
          </div>

          <div className="flex flex-row items-center gap-[12px]">
            <label className="text-cyan-600 text-[13px] font-atkinson">상태</label>
            <select className="h-[40px] px-[10px] border border-cyan-100 bg-white text-cyan-800 font-atkinson">
              <option>전체</option>
              <option>판매중</option>
              <option>품절</option>
            </select>
          </div>

          <div className="flex flex-row items-center gap-[12px]">
            <label className="text-cyan-600 text-[13px] font-atkinson">타입</label>
            <select className="h-[40px] px-[10px] border border-cyan-100 bg-white text-cyan-800 font-atkinson">
              <option>원화</option>
              <option>프린트</option>
            </select>
          </div>

          <div className="flex flex-row items-center gap-[12px] ml-auto">
            <label className="text-cyan-600 text-[13px] font-atkinson">정렬</label>
            <select className="h-[40px] px-[10px] border border-cyan-100 bg-white text-cyan-800 font-atkinson">
              <option>추천순</option>
              <option>최신순</option>
              <option>가격 낮→높</option>
            </select>
          </div>
        </section>

        {/* recommend-shelves */}
        <section className="w-full flex flex-row gap-[24px]">
          <Card className="w-full bg-white border-cyan-100 p-[16px] shadow-pt-sm rounded-none">
            <h2 className="text-cyan-900 text-[16px] mb-[12px] font-atkinson">인기 셸프</h2>
            <div className="w-full flex flex-row gap-[12px]">
              {shelves.popular.map((it) => (
                <article
                  key={it.title}
                  className="w-[220px] bg-cyan-50 border border-cyan-100 p-[12px] shadow-pt-sm"
                >
                  <Image
                    src={it.img}
                    alt="작품 이미지"
                    width={196}
                    height={120}
                    className="w-full h-auto"
                    unoptimized
                  />
                  <h3 className="text-cyan-900 text-[14px] mt-[8px] font-atkinson">{it.title}</h3>
                  <p className="text-cyan-700 text-[13px] font-atkinson">{it.sub}</p>
                </article>
              ))}
            </div>
          </Card>

          <Card className="w-full bg-white border-cyan-100 p-[16px] shadow-pt-sm rounded-none">
            <h2 className="text-cyan-900 text-[16px] mb-[12px] font-atkinson">신작 셸프</h2>
            <div className="w-full flex flex-row gap-[12px]">
              {shelves.new.map((it) => (
                <article
                  key={it.title}
                  className="w-[220px] bg-cyan-50 border border-cyan-100 p-[12px] shadow-pt-sm"
                >
                  <Image
                    src={it.img}
                    alt="작품 이미지"
                    width={196}
                    height={120}
                    className="w-full h-auto"
                    unoptimized
                  />
                  <h3 className="text-cyan-900 text-[14px] mt-[8px] font-atkinson">{it.title}</h3>
                  <p className="text-cyan-700 text-[13px] font-atkinson">{it.sub}</p>
                </article>
              ))}
            </div>
          </Card>

          <Card className="w-full bg-white border-cyan-100 p-[16px] shadow-pt-sm rounded-none">
            <h2 className="text-cyan-900 text-[16px] mb-[12px] font-atkinson">큐레이터 픽</h2>
            <div className="w-full flex flex-row gap-[12px]">
              {shelves.curator.map((it) => (
                <article
                  key={it.title}
                  className="w-[220px] bg-cyan-50 border border-cyan-100 p-[12px] shadow-pt-sm"
                >
                  <Image
                    src={it.img}
                    alt="작품 이미지"
                    width={196}
                    height={120}
                    className="w-full h-auto"
                    unoptimized
                  />
                  <h3 className="text-cyan-900 text-[14px] mt-[8px] font-atkinson">{it.title}</h3>
                  <p className="text-cyan-700 text-[13px] font-atkinson">{it.sub}</p>
                </article>
              ))}
            </div>
          </Card>
        </section>

        {/* artwork-card-grid */}
        <section className="w-full bg-white border border-cyan-100 p-[16px] shadow-pt-sm">
          <div className="flex flex-row items-center justify-between mb-[16px]">
            <h2 className="text-cyan-900 text-[18px] font-atkinson">전체 작품</h2>
            <p className="text-cyan-600 text-[13px] font-atkinson">무한 스크롤로 더 많은 작품을 확인하세요</p>
          </div>

          <div className="w-full grid grid-cols-4 gap-[16px]">
            {grid.map((it) => (
              <article key={it.title} className="bg-cyan-50 border border-cyan-100 p-[12px] shadow-pt-sm">
                <Image
                  src={it.img}
                  alt="작품 이미지"
                  width={320}
                  height={200}
                  className="w-full h-auto"
                  unoptimized
                />
                <h3 className="text-cyan-900 text-[14px] mt-[8px] font-atkinson">{it.title}</h3>
                <p className="text-cyan-700 text-[13px] font-atkinson">{it.price}</p>
                <div className="flex flex-row items-center gap-[8px] mt-[8px]">
                  <Button
                    variant="outline"
                    className="h-[36px] px-[10px] bg-white border border-cyan-100 text-cyan-800 shadow-sm rounded-none font-atkinson"
                  >
                    상세보기
                  </Button>
                  <Button
                    variant="outline"
                    className="h-[36px] px-[10px] bg-white border border-cyan-100 text-cyan-800 shadow-sm rounded-none font-atkinson"
                  >
                    작가페이지
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <div className="w-full flex flex-row items-center justify-center mt-[16px]">
            <Button
              variant="outline"
              className="h-[40px] px-[16px] bg-white border border-cyan-100 text-cyan-800 shadow-sm rounded-none font-atkinson"
            >
              더 불러오기
            </Button>
          </div>
        </section>

        {/* subscribed-summary */}
        <section className="w-full bg-gradient-to-r from-green-50 to-white border border-cyan-100 p-[16px]">
          <div className="flex flex-row items-center justify-between mb-[12px]">
            <h2 className="text-cyan-900 text-[16px] font-atkinson">구독한 작가의 새 소식</h2>
            <a className="text-cyan-600 text-[13px] font-atkinson" href="#">
              구독 관리
            </a>
          </div>

          <div className="w-full flex flex-row gap-[12px]">
            {[
              {
                name: "작가 J",
                desc: '새 작품 2건 — 신작: "밤의 풍경"',
              },
              {
                name: "작가 K",
                desc: "한정판 출시 예정 — 예약 가능",
              },
            ].map((it) => (
              <article
                key={it.name}
                className="w-[300px] bg-white border border-cyan-100 p-[12px] shadow-pt-sm"
              >
                <h3 className="text-cyan-900 text-[14px] font-atkinson">{it.name}</h3>
                <p className="text-cyan-700 text-[13px] mb-[8px] font-atkinson">{it.desc}</p>
                <div className="flex flex-row gap-[8px]">
                  <Button
                    variant="outline"
                    className="h-[36px] px-[10px] bg-white border border-cyan-100 text-cyan-800 shadow-sm rounded-none font-atkinson"
                  >
                    전체보기
                  </Button>
                  <Button
                    variant="outline"
                    className="h-[36px] px-[10px] bg-white border border-cyan-100 text-cyan-800 shadow-sm rounded-none font-atkinson"
                  >
                    알림 설정
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* empty-state-cta */}
        <section className="w-full bg-white border border-cyan-100 p-[24px] shadow-pt-sm">
          <div className="flex flex-row items-start gap-[16px]">
            <div className="w-full">
              <h2 className="text-cyan-900 text-[16px] mb-[8px] font-atkinson">검색 결과가 없습니다</h2>
              <p className="text-cyan-700 text-[14px] mb-[12px] font-atkinson">
                일치하는 작품을 찾을 수 없습니다. 다른 키워드나 필터를 시도해 보세요.
              </p>

              <div className="flex flex-row items-center gap-[12px]">
                <Button
                  variant="outline"
                  className="h-[40px] px-[14px] bg-white border border-cyan-100 text-cyan-800 shadow-sm rounded-none font-atkinson"
                >
                  추천 작가 보기
                </Button>
                <Button
                  variant="outline"
                  className="h-[40px] px-[14px] bg-white border border-cyan-100 text-cyan-800 shadow-sm rounded-none font-atkinson"
                >
                  추천 토픽 탐색
                </Button>
                <Button
                  variant="outline"
                  className="h-[40px] px-[14px] bg-white border border-cyan-100 text-cyan-800 shadow-sm rounded-none font-atkinson"
                >
                  전체 목록으로 돌아가기
                </Button>
              </div>
            </div>

            <aside className="w-[300px] bg-green-50 border border-cyan-100 p-[12px] shadow-pt-sm">
              <h3 className="text-cyan-900 text-[14px] mb-[8px] font-atkinson">검색 팁</h3>
              <ul className="text-cyan-700 text-[13px] font-atkinson">
                <li>- 작가명 또는 작품명으로 검색해 보세요</li>
                <li>- 필터를 초기화하고 다시 시도하세요</li>
                <li>- 카테고리별 추천을 확인하세요</li>
              </ul>
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
