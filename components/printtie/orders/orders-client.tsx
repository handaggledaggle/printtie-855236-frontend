"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Order = {
  id: string;
  createdAt: string;
  status: "배송중" | "배송완료";
  payment: string;
  itemTitle: string;
  itemOption: string;
  amount: string;
};

const MOCK_ORDERS: Order[] = [
  {
    id: "20260317-0012",
    createdAt: "2026-03-15",
    status: "배송중",
    payment: "신용카드",
    itemTitle: "꽃의 연대기",
    itemOption: "A4 · 무광액자",
    amount: "₩45,000",
  },
  {
    id: "20260310-0098",
    createdAt: "2026-03-10",
    status: "배송완료",
    payment: "신용카드",
    itemTitle: "도시의 오후",
    itemOption: "A3 · 유광",
    amount: "₩68,000",
  },
];

export function OrdersClient({ initialSelectedOrderId }: { initialSelectedOrderId?: string }) {
  const [selectedId, setSelectedId] = useState(initialSelectedOrderId ?? MOCK_ORDERS[0]!.id);

  const selected = useMemo(() => MOCK_ORDERS.find((o) => o.id === selectedId) ?? MOCK_ORDERS[0]!, [selectedId]);

  return (
    <>
      <header className="w-full bg-white px-[32px] py-[24px] border-b border-cyan-100 backdrop-blur-sm">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col">
            <h1 className="text-cyan-900 text-[20px]">printtie</h1>
            <p className="text-cyan-700 text-[12px]">작가와 팬을 잇는, 작품 발견에서 배송까지</p>
          </div>
          <div className="flex flex-row gap-[12px] items-center">
            <Button
              variant="outline"
              className="h-[40px] px-[16px] bg-white border border-cyan-100 text-cyan-700 shadow-sm rounded-none"
            >
              계정
            </Button>
            <Button
              variant="outline"
              className="h-[40px] px-[16px] bg-white border border-cyan-100 text-cyan-700 shadow-sm rounded-none"
            >
              고객센터
            </Button>
          </div>
        </div>
      </header>

      <main className="w-full bg-cyan-50 px-[32px] py-[32px] flex flex-row gap-[24px]">
        {/* Orders List Column */}
        <section className="w-[520px] bg-white border border-cyan-100 p-[16px] flex flex-col gap-[16px] shadow-pt-sm">
          <header className="flex flex-col">
            <h2 className="text-cyan-900 text-[18px] mb-[16px]">주문 목록</h2>
            <div className="flex flex-row gap-[12px] mb-[12px]">
              {[
                "전체",
                "배송중",
                "배송완료",
                "반품/교환",
              ].map((t) => (
                <Button
                  key={t}
                  variant="outline"
                  className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-700 hover:bg-cyan-50 rounded-none"
                >
                  {t}
                </Button>
              ))}
            </div>
            <div className="flex flex-row gap-[8px] items-center">
              <Input
                className="h-[40px] px-[10px] border border-cyan-100 bg-white text-cyan-700 w-full rounded-none"
                placeholder="주문번호 또는 작품명 검색"
              />
              <select className="h-[40px] px-[10px] border border-cyan-100 bg-white text-cyan-700">
                <option>전체 기간</option>
                <option>지난 30일</option>
                <option>지난 90일</option>
              </select>
            </div>
          </header>

          <div className="flex flex-col gap-[12px] overflow-y-auto" style={{ maxHeight: 560 }}>
            {MOCK_ORDERS.map((o) => (
              <article
                key={o.id}
                onClick={() => setSelectedId(o.id)}
                className={
                  selectedId === o.id
                    ? "bg-white border border-cyan-200 p-[12px] flex flex-col gap-[8px] shadow-pt-sm cursor-pointer"
                    : "bg-white border border-cyan-100 p-[12px] flex flex-col gap-[8px] shadow-pt-sm cursor-pointer"
                }
              >
                <div className="flex flex-row justify-between items-start">
                  <div className="flex flex-col">
                    <p className="text-cyan-700 text-[14px]">
                      주문번호 <span className="text-cyan-400">#{o.id}</span>
                    </p>
                    <p className="text-cyan-400 text-[12px]">주문일 {o.createdAt} · 결제완료</p>
                  </div>
                  <div className="text-cyan-700 text-[14px]">{o.status}</div>
                </div>
                <div className="flex flex-row gap-[8px] items-center">
                  <Image
                    src="https://via.placeholder.com/56"
                    className="w-[56px] h-[56px] bg-cyan-50"
                    alt="작품 썸네일"
                    width={56}
                    height={56}
                    unoptimized
                  />
                  <div className="flex flex-col">
                    <p className="text-cyan-900 text-[14px]">작품명: {o.itemTitle}</p>
                    <p className="text-cyan-700 text-[12px]">옵션: {o.itemOption}</p>
                  </div>
                  <div className="ml-auto text-cyan-700 text-[14px]">{o.amount}</div>
                </div>
                <div className="flex flex-row gap-[8px]">
                  <Button
                    variant="outline"
                    className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-700 rounded-none"
                  >
                    상세보기
                  </Button>
                  <Button
                    variant="outline"
                    className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-700 rounded-none"
                  >
                    배송조회
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Order Detail Column */}
        <section className="flex-1 flex flex-col gap-[24px]">
          <div className="bg-white border border-cyan-100 p-[20px] shadow-pt-sm">
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col">
                <p className="text-cyan-700 text-[14px]">주문번호</p>
                <h2 className="text-cyan-900 text-[18px] mb-[12px]">#{selected.id}</h2>
                <p className="text-cyan-400 text-[12px]">주문일 {selected.createdAt} · 결제수단: {selected.payment}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-cyan-700 text-[14px]">주문 상태</p>
                <p className="text-cyan-900 text-[16px]">{selected.status}</p>
              </div>
            </div>
          </div>

          <section className="bg-white border border-cyan-100 p-[20px] shadow-pt-sm">
            <h3 className="text-cyan-900 text-[16px] mb-[16px]">주문 항목</h3>
            <div className="flex flex-col gap-[12px]">
              <article className="flex flex-row gap-[12px] items-start p-[12px] border border-cyan-100">
                <Image
                  src="https://via.placeholder.com/96"
                  className="w-[96px] h-[96px] bg-cyan-50"
                  alt="작품 썸네일"
                  width={96}
                  height={96}
                  unoptimized
                />
                <div className="flex flex-col">
                  <p className="text-cyan-900 text-[14px]">{selected.itemTitle}</p>
                  <p className="text-cyan-700 text-[12px]">옵션: {selected.itemOption}</p>
                  <p className="text-cyan-700 text-[12px]">작가: 이민호</p>
                  <p className="text-cyan-400 text-[12px]">수량 1</p>
                </div>
                <div className="ml-auto flex flex-col items-end">
                  <p className="text-cyan-700 text-[14px]">{selected.amount}</p>
                  <p className="text-cyan-400 text-[12px]">배송비: ₩3,000</p>
                </div>
              </article>

              <div className="border-t border-cyan-100 pt-[12px] flex flex-col gap-[8px]">
                {[
                  ["상품합계", "₩45,000"],
                  ["배송비", "₩3,000"],
                  ["할인", "₩0"],
                  ["결제금액", "₩48,000"],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-row justify-between">
                    <span className="text-cyan-700">{k}</span>
                    <span className="text-cyan-900">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white border border-cyan-100 p-[20px] shadow-pt-sm">
            <h3 className="text-cyan-900 text-[16px] mb-[12px]">배송 정보</h3>
            <div className="flex flex-row gap-[16px] items-center mb-[12px]">
              <div className="flex flex-col">
                <p className="text-cyan-700 text-[14px]">택배사</p>
                <p className="text-cyan-900 text-[14px]">한빛택배</p>
              </div>
              <div className="flex flex-col">
                <p className="text-cyan-700 text-[14px]">운송장 번호</p>
                <p className="text-cyan-900 text-[14px]">HB123456789KR</p>
              </div>
              <div className="ml-auto">
                <Button
                  variant="outline"
                  className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-700 rounded-none"
                >
                  택배사 사이트에서 보기
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-row gap-[12px] items-start">
                <div className="w-[8px] h-[8px] bg-green-600 rounded-full mt-[6px]" />
                <div className="flex flex-col">
                  <p className="text-cyan-700 text-[13px]">2026-03-16 10:12 · 집하완료</p>
                  <p className="text-cyan-400 text-[12px]">서울 강남구 → 출발지</p>
                </div>
              </div>
              <div className="flex flex-row gap-[12px] items-start">
                <div className="w-[8px] h-[8px] bg-cyan-600 rounded-full mt-[6px]" />
                <div className="flex flex-col">
                  <p className="text-cyan-700 text-[13px]">2026-03-17 08:45 · 배송중</p>
                  <p className="text-cyan-400 text-[12px]">배송기사 배차 완료</p>
                </div>
              </div>
              <div className="flex flex-row gap-[12px] items-start">
                <div className="w-[8px] h-[8px] bg-cyan-200 rounded-full mt-[6px]" />
                <div className="flex flex-col">
                  <p className="text-cyan-700 text-[13px]">예정 · 배송완료</p>
                  <p className="text-cyan-400 text-[12px]">도착 후 배송완료로 업데이트</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-cyan-100 p-[20px] shadow-pt-sm">
            <h3 className="text-cyan-900 text-[16px] mb-[12px]">요청하기</h3>
            <div className="flex flex-row gap-[12px] mb-[12px]">
              <Button className="h-[44px] px-[16px] bg-cyan-600 text-white rounded-lg shadow-md">반품/교환 요청</Button>
              <Button
                variant="outline"
                className="h-[44px] px-[16px] bg-white border border-cyan-100 text-cyan-700 rounded-none"
              >
                판매자에 문의
              </Button>
              <Button
                variant="outline"
                className="h-[44px] px-[16px] bg-white border border-cyan-100 text-cyan-700 rounded-none"
              >
                영수증 다운로드
              </Button>
            </div>

            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col">
                <p className="text-cyan-700 text-[14px]">배송지 변경</p>
                <p className="text-cyan-400 text-[12px]">상품 출고 전만 변경 가능합니다</p>
              </div>
              <Button
                variant="outline"
                className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-700 rounded-none"
              >
                배송지 변경
              </Button>
            </div>
          </section>
        </section>

        {/* Side Info Column */}
        <aside className="w-[320px] flex flex-col gap-[24px]">
          <div className="bg-white border border-cyan-100 p-[16px] shadow-pt-sm">
            <h4 className="text-cyan-900 text-[14px] mb-[8px]">배송지</h4>
            <p className="text-cyan-700 text-[13px]">홍길동 · 010-1234-5678</p>
            <p className="text-cyan-400 text-[12px]">서울특별시 강남구 강남대로 123, 5층 (역삼동)</p>
            <div className="flex flex-row gap-[8px] mt-[12px]">
              <Button
                variant="outline"
                className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-700 rounded-none"
              >
                편집
              </Button>
              <Button
                variant="outline"
                className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-700 rounded-none"
              >
                기본배송지로 설정
              </Button>
            </div>
          </div>

          <div className="bg-white border border-cyan-100 p-[16px] shadow-pt-sm">
            <h4 className="text-cyan-900 text-[14px] mb-[8px]">배송 관련 문의</h4>
            <p className="text-cyan-700 text-[13px]">배송 지연이나 분실 시 고객센터에 문의하세요.</p>
            <div className="flex flex-row gap-[8px] mt-[12px]">
              <Button
                variant="outline"
                className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-700 rounded-none"
              >
                CS 문의하기
              </Button>
              <Button
                variant="outline"
                className="h-[40px] px-[12px] bg-white border border-cyan-100 text-cyan-700 rounded-none"
              >
                운송장 재조회
              </Button>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
