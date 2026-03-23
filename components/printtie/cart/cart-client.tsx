"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CartItem = {
  id: string;
  title: string;
  subtitle: string;
  priceLabel: string;
  thumb: string;
  quantity: number;
  options: string[];
};

const INITIAL: CartItem[] = [
  {
    id: "c1",
    title: "작품 제목 — 작가명",
    subtitle: "한정판 리프린트",
    priceLabel: "₩120,000",
    thumb: "https://via.placeholder.com/96",
    quantity: 1,
    options: ["사이즈: M", "액자: 없음"],
  },
  {
    id: "c2",
    title: "포스터 컬렉션 — 작가B",
    subtitle: "리프린트",
    priceLabel: "₩45,000",
    thumb: "https://via.placeholder.com/96",
    quantity: 2,
    options: ["사이즈: A2", "액자: 블랙"],
  },
  {
    id: "c3",
    title: "원화 소품 — 작가C",
    subtitle: "원작",
    priceLabel: "₩420,000",
    thumb: "https://via.placeholder.com/96",
    quantity: 1,
    options: ["사이즈: 원본", "배송: 특송"],
  },
];

export function CartClient() {
  const [items, setItems] = useState<CartItem[]>(INITIAL);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingItem = useMemo(() => items.find((i) => i.id === editingId) ?? null, [items, editingId]);

  function inc(id: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  }
  function dec(id: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i)));
  }
  function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <main className="w-full bg-cyan-50/60 px-[32px] py-[32px] flex flex-row gap-[32px]" role="main">
      <section className="w-[880px] bg-white border border-cyan-100 p-[20px] flex flex-col rounded-md shadow-pt-sm">
        <header className="mb-[20px]">
          <h2 className="text-cyan-900 text-[18px] mb-[12px]">장바구니 ({items.length})</h2>
          <p className="text-cyan-700 text-[14px]">옵션을 확인하고 필요한 경우 수정하세요. 작가별 묶음 배송이 적용됩니다.</p>
        </header>

        <div className="w-full flex flex-col gap-[12px]">
          {items.map((item, idx) => (
            <article
              key={item.id}
              className={
                idx === items.length - 1
                  ? "w-full flex flex-row items-start gap-[12px]"
                  : "w-full flex flex-row items-start gap-[12px] border-b border-cyan-100 pb-[12px]"
              }
            >
              <Image
                className="w-[96px] h-[96px] bg-cyan-50 rounded-sm"
                src={item.thumb}
                alt="작품 썸네일"
                width={96}
                height={96}
                unoptimized
              />
              <div className="flex-1 flex flex-col">
                <div className="flex flex-row justify-between items-start">
                  <div>
                    <h3 className="text-cyan-900 text-[16px]">{item.title}</h3>
                    <p className="text-cyan-700 text-[13px] mt-[6px]">{item.subtitle}</p>
                  </div>
                  <div className="text-cyan-900 text-[16px]">{item.priceLabel}</div>
                </div>

                <div className="mt-[10px] flex flex-row items-center gap-[12px]">
                  <div className="flex flex-row items-center gap-[8px]">
                    <span className="text-cyan-500 text-[13px]">옵션:</span>
                    {item.options.map((opt) => (
                      <span key={opt} className="text-cyan-700 text-[13px] border border-cyan-100 bg-white/70 px-[8px] py-[4px]">
                        {opt}
                      </span>
                    ))}
                  </div>

                  <div className="ml-auto flex flex-row items-center gap-[8px]">
                    <button
                      type="button"
                      className="h-[32px] px-[8px] border border-cyan-100 text-cyan-700 bg-white/70 rounded"
                      onClick={() => dec(item.id)}
                    >
                      -
                    </button>
                    <input
                      readOnly
                      className="h-[32px] w-[48px] text-center border border-cyan-100 text-cyan-700 bg-white rounded"
                      value={String(item.quantity)}
                    />
                    <button
                      type="button"
                      className="h-[32px] px-[8px] border border-cyan-100 text-cyan-700 bg-white/70 rounded"
                      onClick={() => inc(item.id)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="h-[32px] px-[12px] border border-cyan-100 text-cyan-700 bg-white/70 rounded"
                      onClick={() => setEditingId(item.id)}
                    >
                      옵션수정
                    </button>
                    <button
                      type="button"
                      className="h-[32px] px-[12px] border border-cyan-100 text-red-600 bg-white/70 rounded"
                      onClick={() => remove(item.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="w-full mt-[20px] flex flex-row items-center justify-between">
          <div className="text-cyan-700 text-[13px]">
            <p>
              총 작가 수: <span className="text-cyan-900">{Math.min(items.length, 3)}</span>
            </p>
            <p className="mt-[6px]">배송 그룹별 합산이 적용됩니다.</p>
          </div>
          <div className="flex flex-row items-center gap-[12px]">
            <Button
              variant="outline"
              className="h-[44px] px-[16px] border border-cyan-100 text-cyan-700 bg-white/80 rounded-none"
            >
              장바구니 저장
            </Button>
            <Button
              variant="outline"
              className="h-[44px] px-[16px] border border-cyan-100 text-cyan-700 bg-white/80 rounded-none"
            >
              선택 품목 저장
            </Button>
          </div>
        </aside>
      </section>

      <aside className="w-[400px] flex flex-col gap-[20px]">
        <section className="w-full bg-white border border-cyan-100 p-[20px] rounded-md shadow-pt-sm">
          <h3 className="text-cyan-900 text-[16px] mb-[12px]">주문 요약</h3>
          <div className="w-full flex flex-col gap-[8px]">
            <div className="flex flex-row justify-between text-cyan-700">
              <span>상품 합계</span>
              <span className="text-cyan-900">₩585,000</span>
            </div>
            <div className="flex flex-row justify-between text-cyan-700">
              <span>배송비</span>
              <span className="text-cyan-700">₩12,000</span>
            </div>
            <div className="flex flex-row justify-between text-cyan-700">
              <span>세금</span>
              <span className="text-cyan-700">₩58,700</span>
            </div>
            <div className="border-t border-cyan-100 mt-[12px] pt-[12px] flex flex-row justify-between items-center">
              <span className="text-cyan-900 text-[16px]">총액</span>
              <span className="text-cyan-900 text-[18px]">₩655,700</span>
            </div>
          </div>

          <div className="mt-[16px] text-cyan-700 text-[13px]">
            <p className="mb-[8px]">할인 코드 적용 또는 배송 옵션 변경은 결제 단계에서 확인할 수 있습니다.</p>
            <Button className="h-[44px] w-full bg-cyan-600 text-white rounded shadow-md">결제 진행하기</Button>
          </div>
        </section>

        <section className="w-full bg-white border border-cyan-100 p-[20px] rounded-md shadow-pt-sm">
          <h4 className="text-cyan-900 text-[15px] mb-[12px]">다음 단계</h4>
          <div className="w-full flex flex-col gap-[12px]">
            <Button className="h-[44px] w-full bg-green-600 border border-green-600 text-white rounded shadow-md">
              체크아웃(결제로 이동)
            </Button>
            <div className="flex flex-row gap-[12px]">
              <Button
                variant="outline"
                className="h-[44px] flex-1 bg-white border border-cyan-100 text-cyan-700 rounded-none"
              >
                계속 쇼핑
              </Button>
              <Button
                variant="outline"
                className="h-[44px] flex-1 bg-white border border-cyan-100 text-cyan-700 rounded-none"
              >
                장바구니 저장
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full bg-white border border-cyan-100 p-[20px] rounded-md shadow-pt-sm">
          <h4 className="text-cyan-900 text-[15px] mb-[12px]">이런 작품도 관심 있어할 수 있어요</h4>
          <ul className="w-full flex flex-col gap-[12px]">
            {[0, 1].map((i) => (
              <li key={i} className="flex flex-row items-center gap-[12px]">
                <Image
                  className="w-[56px] h-[56px] bg-cyan-50 rounded-sm"
                  src="https://via.placeholder.com/56"
                  alt="추천작"
                  width={56}
                  height={56}
                  unoptimized
                />
                <div className="flex-1">
                  <p className="text-cyan-900 text-[13px]">한정판 드로잉 — 작가D</p>
                  <p className="text-cyan-700 text-[12px]">사이즈: A3 · ₩80,000</p>
                </div>
                <button className="h-[32px] px-[8px] border border-cyan-100 text-cyan-700 bg-white/80 rounded">추가</button>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      <Dialog open={editingId !== null} onOpenChange={(open) => setEditingId(open ? editingId : null)}>
        <DialogContent className="max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="font-atkinson">옵션 수정</DialogTitle>
            <DialogDescription className="font-atkinson">사이즈, 액자, 원작/리프린트 여부를 선택하세요.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-[12px]">
            <div className="text-cyan-700 text-[13px] font-atkinson">대상: {editingItem?.title ?? "—"}</div>

            <div className="flex flex-col gap-[8px]">
              <label className="text-cyan-700 text-[13px] font-atkinson">사이즈</label>
              <select className="h-[40px] border border-cyan-100 text-cyan-700 bg-white rounded">
                <option>선택하세요</option>
                <option>A3</option>
                <option>A2</option>
                <option>M</option>
                <option>원본</option>
              </select>
            </div>

            <div className="flex flex-col gap-[8px]">
              <label className="text-cyan-700 text-[13px] font-atkinson">액자</label>
              <select className="h-[40px] border border-cyan-100 text-cyan-700 bg-white rounded">
                <option>없음</option>
                <option>심플 화이트</option>
                <option>심플 블랙</option>
                <option>우드</option>
              </select>
            </div>

            <div className="flex flex-col gap-[8px]">
              <label className="text-cyan-700 text-[13px] font-atkinson">원작 / 리프린트</label>
              <select className="h-[40px] border border-cyan-100 text-cyan-700 bg-white rounded">
                <option>리프린트</option>
                <option>원작</option>
              </select>
            </div>
          </div>

          <DialogFooter className="gap-[12px]">
            <Button
              variant="outline"
              className="h-[44px] flex-1 border border-cyan-100 text-cyan-700 bg-white rounded-none"
              onClick={() => setEditingId(null)}
            >
              취소
            </Button>
            <Button
              variant="outline"
              className="h-[44px] flex-1 border border-cyan-100 text-cyan-900 bg-white shadow-sm rounded-none"
              onClick={() => setEditingId(null)}
            >
              변경 적용
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
