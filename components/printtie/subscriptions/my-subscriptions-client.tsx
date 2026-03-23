"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SubArtist = {
  id: string;
  name: string;
  lastActivity: string;
  thumb: string;
};

type UpdateItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  thumb: string;
};

const MOCK_ARTISTS: SubArtist[] = [
  { id: "a1", name: "김아람", lastActivity: "최근 활동: 3시간 전", thumb: "https://via.placeholder.com/48" },
  { id: "a2", name: "오승현", lastActivity: "최근 활동: 2일 전", thumb: "https://via.placeholder.com/48" },
];

const MOCK_UPDATES: UpdateItem[] = [
  {
    id: "u1",
    title: "이서연 작가 — 신작 컬렉션 발매",
    body: "한정판 프린트 10점, 예약 판매 시작. 옵션: 사이즈 선택 필요",
    time: "발행 2시간 전",
    thumb: "https://via.placeholder.com/96",
  },
  {
    id: "u2",
    title: "박민호 작가 — 전시 공지",
    body: "다음 주 팝업 전시 참여 안내. 방문 예약 및 배송 옵션 안내 포함",
    time: "발행 1일 전",
    thumb: "https://via.placeholder.com/96",
  },
];

export function MySubscriptionsClient() {
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [onlyDrops, setOnlyDrops] = useState(false);

  const filteredUpdates = useMemo(() => {
    // mock filtering: just demonstrates UI state
    if (!onlyOnSale && !onlyDrops) return MOCK_UPDATES;
    if (onlyOnSale && !onlyDrops) return MOCK_UPDATES.slice(0, 1);
    if (!onlyOnSale && onlyDrops) return MOCK_UPDATES.slice(1);
    return MOCK_UPDATES.slice(0, 0);
  }, [onlyOnSale, onlyDrops]);

  return (
    <>
      <header className="w-full bg-white border-b border-cyan-100 px-[32px] py-[24px] shadow-[0_1px_0_rgba(6,182,212,0.03)]">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-cyan-900 text-[20px]">My Subscriptions</h1>
            <p className="text-cyan-700 text-[14px] mt-[8px]">printtie — 작가와 팬을 잇는, 작품 발견에서 배송까지</p>
          </div>
          <div className="flex flex-row items-center gap-[12px]">
            <Button
              variant="outline"
              className="h-[40px] px-[16px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none"
            >
              구독 전체 관리
            </Button>
            <Button
              variant="outline"
              className="h-[40px] px-[16px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none"
            >
              알림 보기
            </Button>
          </div>
        </div>
      </header>

      <main className="w-full px-[32px] py-[32px] flex flex-row gap-[32px]">
        {/* Left column: toolbar */}
        <section className="w-[380px] bg-cyan-50 border border-cyan-100 p-[20px] flex flex-col gap-[16px] shadow-pt-sm">
          <div className="flex flex-col">
            <h2 className="text-cyan-900 text-[16px] mb-[12px]">정렬 · 필터 · 알림설정</h2>
            <form className="flex flex-col gap-[12px]">
              <div className="flex flex-col">
                <label className="text-cyan-700 text-[13px] mb-[6px]">정렬</label>
                <select className="h-[40px] px-[10px] border border-cyan-100 bg-white text-cyan-900">
                  <option>최신 활동 순</option>
                  <option>작가 이름 A→Z</option>
                  <option>알림 많은 순</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-cyan-700 text-[13px] mb-[6px]">필터</label>
                <div className="flex flex-col gap-[8px]">
                  <label className="flex flex-row items-center gap-[8px]">
                    <input
                      type="checkbox"
                      className="h-[16px] w-[16px] accent-green-500"
                      checked={onlyOnSale}
                      onChange={(e) => setOnlyOnSale(e.target.checked)}
                    />
                    <span className="text-cyan-700 text-[13px]">판매중인 작품만</span>
                  </label>
                  <label className="flex flex-row items-center gap-[8px]">
                    <input
                      type="checkbox"
                      className="h-[16px] w-[16px] accent-green-500"
                      checked={onlyDrops}
                      onChange={(e) => setOnlyDrops(e.target.checked)}
                    />
                    <span className="text-cyan-700 text-[13px]">한정판·드롭만</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-cyan-700 text-[13px] mb-[6px]">글로벌 알림 설정</label>
                <div className="flex flex-row gap-[8px]">
                  <Button
                    variant="outline"
                    className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none"
                  >
                    모두 켜기
                  </Button>
                  <Button
                    variant="outline"
                    className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none"
                  >
                    모두 끄기
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <aside className="flex flex-col mt-[12px]">
            <h3 className="text-cyan-900 text-[14px] mb-[8px]">알림 요약</h3>
            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-row justify-between items-center p-[12px] bg-white border border-cyan-100">
                <span className="text-cyan-700 text-[13px]">이메일 수신</span>
                <span className="text-cyan-700 text-[13px]">활성</span>
              </div>
              <div className="flex flex-row justify-between items-center p-[12px] bg-white border border-cyan-100">
                <span className="text-cyan-700 text-[13px]">푸시 수신</span>
                <span className="text-cyan-500 text-[13px]">비활성</span>
              </div>
            </div>
          </aside>
        </section>

        {/* Middle column: updates feed */}
        <main className="w-full bg-white border border-cyan-100 p-[24px] flex flex-col gap-[24px] shadow-pt-sm">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-cyan-900 text-[18px]">구독 작가의 최신 소식</h2>
            <div className="flex flex-row gap-[8px]">
              <Button
                variant="outline"
                className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none"
              >
                읽음 표시
              </Button>
              <Button
                variant="outline"
                className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none"
              >
                필터 적용
              </Button>
            </div>
          </div>

          <section className="flex flex-col gap-[16px]">
            {filteredUpdates.map((u) => (
              <article key={u.id} className="flex flex-row gap-[16px] p-[16px] bg-cyan-50 border border-cyan-100 shadow-pt-sm">
                <Image
                  src={u.thumb}
                  alt="작가 썸네일"
                  width={96}
                  height={96}
                  className="w-[96px] h-[96px] bg-white rounded-md"
                  unoptimized
                />
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between items-start">
                    <div className="flex flex-col">
                      <h3 className="text-cyan-900 text-[15px]">{u.title}</h3>
                      <p className="text-cyan-700 text-[13px] mt-[8px]">{u.body}</p>
                      <p className="text-cyan-500 text-[12px] mt-[8px]">{u.time}</p>
                    </div>
                    <div className="flex flex-col items-end gap-[8px]">
                      <div className="flex flex-row gap-[8px]">
                        <Button
                          variant="outline"
                          className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none"
                        >
                          작품 보기
                        </Button>
                        <Button
                          variant="outline"
                          className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none"
                        >
                          읽음
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none"
                      >
                        작가 페이지
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="flex flex-col items-center p-[16px] bg-white border border-cyan-100 text-cyan-500">
              <p className="text-[14px]">더 많은 업데이트를 보려면 구독 작가를 추가하거나 필터를 확인하세요.</p>
            </div>
          </section>
        </main>

        {/* Right column */}
        <aside className="w-[320px] flex flex-col gap-[24px]">
          <section className="w-full bg-white border border-cyan-100 p-[16px] shadow-pt-sm">
            <h3 className="text-cyan-900 text-[16px] mb-[12px]">구독 작가 (6)</h3>
            <ul className="flex flex-col gap-[12px]">
              {MOCK_ARTISTS.map((a) => (
                <li key={a.id} className="flex flex-row items-center justify-between p-[10px] bg-cyan-50 border border-cyan-100">
                  <div className="flex flex-row items-center gap-[12px]">
                    <Image
                      src={a.thumb}
                      alt="작가"
                      width={48}
                      height={48}
                      className="w-[48px] h-[48px] bg-white rounded-full"
                      unoptimized
                    />
                    <div className="flex flex-col">
                      <span className="text-cyan-900 text-[14px]">{a.name}</span>
                      <span className="text-cyan-500 text-[12px]">{a.lastActivity}</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[8px]">
                    <Button
                      variant="outline"
                      className="h-[40px] px-[10px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none"
                    >
                      알림
                    </Button>
                    <Button
                      variant="outline"
                      className="h-[40px] px-[10px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none"
                    >
                      언팔로우
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-row justify-center mt-[12px]">
              <Button
                variant="outline"
                className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-900 shadow-sm rounded-none"
              >
                전체 보기
              </Button>
            </div>
          </section>

          <section className="w-full bg-cyan-50 border border-cyan-100 p-[16px]">
            <h3 className="text-cyan-900 text-[16px] mb-[12px]">알림 설정</h3>
            <form className="flex flex-col gap-[12px]">
              {[
                {
                  title: "이메일",
                  desc: "작가 업데이트 및 주문 관련 알림",
                },
                {
                  title: "푸시",
                  desc: "신작 드롭·긴급 공지",
                },
              ].map((row) => (
                <div key={row.title} className="flex flex-row justify-between items-center p-[10px] bg-white border border-cyan-100">
                  <div className="flex flex-col">
                    <label className="text-cyan-700 text-[13px]">{row.title}</label>
                    <span className="text-cyan-500 text-[12px]">{row.desc}</span>
                  </div>
                  <div className="flex flex-row gap-[8px]">
                    <Button
                      variant="outline"
                      className="h-[40px] px-[10px] bg-white border border-cyan-100 text-green-700 shadow-sm rounded-none"
                    >
                      구독
                    </Button>
                    <Button
                      variant="outline"
                      className="h-[40px] px-[10px] bg-white border border-cyan-100 text-cyan-700 shadow-sm rounded-none"
                    >
                      해지
                    </Button>
                  </div>
                </div>
              ))}
            </form>
            <p className="text-cyan-500 text-[12px] mt-[12px]">
              알림 수신 비율을 높이면 신작 노출과 구매 전환이 개선됩니다.
            </p>
          </section>

          <section className="w-full bg-white border border-cyan-100 p-[16px] shadow-pt-sm">
            <h3 className="text-cyan-900 text-[16px] mb-[12px]">추천 작가</h3>
            <p className="text-cyan-700 text-[13px] mb-[12px]">
              구독 작가가 없거나 확장하고 싶다면, 아래 작가들을 확인하세요.
            </p>
            <ul className="flex flex-col gap-[12px]">
              {["최지윤", "이준형"].map((name) => (
                <li key={name} className="flex flex-row items-center justify-between p-[10px] bg-cyan-50 border border-cyan-100">
                  <div className="flex flex-row items-center gap-[12px]">
                    <Image
                      src="https://via.placeholder.com/48"
                      alt="추천작가"
                      width={48}
                      height={48}
                      className="w-[48px] h-[48px] bg-white rounded-full"
                      unoptimized
                    />
                    <div className="flex flex-col">
                      <span className="text-cyan-900 text-[14px]">{name}</span>
                      <span className="text-cyan-500 text-[12px]">추천 이유: 인기 작품 다수</span>
                    </div>
                  </div>
                  <Button className="h-[40px] px-[10px] bg-green-500 border border-green-500 text-white shadow-md rounded-none">
                    구독
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </main>
    </>
  );
}
