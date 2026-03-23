import { PageShell } from "@/components/printtie/page-shell";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  return (
    <PageShell>
      <header className="w-full px-[32px] py-[24px] bg-gradient-to-r from-cyan-50 to-cyan-25">
        <h1 className="text-cyan-900 text-[20px] font-atkinson">printtie</h1>
        <p className="text-cyan-700 text-[14px] font-atkinson">작가와 팬을 잇는, 작품 발견에서 배송까지</p>
      </header>

      <main className="w-full px-[32px] py-[40px] flex flex-col gap-[40px] font-atkinson">
        <section className="w-full bg-white border border-cyan-100 rounded-[8px] p-[20px] shadow-pt-sm">
          <header className="mb-[12px]">
            <h2 className="text-cyan-900 text-[18px] mb-[8px]">이 단계는 UI만 구현됨</h2>
            <p className="text-cyan-700 text-[14px]">
              결제 준비(prepare), PG 연동 등 API 호출/웹훅 로직은 다음 단계에서 연결합니다. 현재 화면은 mock 데이터로만 구성됩니다.
            </p>
          </header>
          <div className="flex flex-row gap-[12px]">
            <Button className="h-[44px] px-[16px] bg-cyan-600 text-white rounded-md shadow-md">결제하기(비활성/목업)</Button>
            <Button
              variant="outline"
              className="h-[44px] px-[16px] bg-white border border-cyan-100 text-cyan-700 shadow-sm rounded-none"
            >
              돌아가기
            </Button>
          </div>
        </section>

        {/* 아래는 FRD/GUI 섹션을 유지하는 placeholder blocks */}
        <section className="w-full bg-cyan-50 border border-cyan-100 rounded-[8px] p-[20px] shadow-pt-sm">
          <h2 className="text-cyan-900 text-[18px] mb-[8px]">배송지</h2>
          <p className="text-cyan-700 text-[14px]">저장된 배송지 선택 / 새 배송지 입력 UI (mock)</p>
          <div className="mt-[12px] grid grid-cols-2 gap-[16px]">
            <div className="bg-white border border-cyan-100 rounded-[8px] p-[16px] shadow-pt-sm">
              <h3 className="text-cyan-900 text-[16px] mb-[12px]">저장된 배송지</h3>
              <div className="bg-cyan-50 border border-cyan-100 rounded-[6px] p-[12px]">
                <div className="text-cyan-900 text-[14px]">홍길동 · 010-1234-5678</div>
                <div className="text-cyan-700 text-[13px]">서울특별시 강남구 테헤란로 12, 3층</div>
                <div className="text-cyan-500 text-[12px]">기본 배송지</div>
              </div>
            </div>
            <div className="bg-white border border-cyan-100 rounded-[8px] p-[16px] shadow-pt-sm">
              <h3 className="text-cyan-900 text-[16px] mb-[12px]">새 배송지 입력</h3>
              <div className="space-y-[8px] text-cyan-700 text-[13px]">
                <div className="h-[40px] border border-cyan-100 rounded-[6px] bg-cyan-50" />
                <div className="h-[40px] border border-cyan-100 rounded-[6px] bg-cyan-50" />
                <div className="h-[40px] border border-cyan-100 rounded-[6px] bg-cyan-50" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-white border border-cyan-100 rounded-[8px] p-[20px] shadow-pt-sm">
          <h2 className="text-cyan-900 text-[18px] mb-[8px]">결제 수단</h2>
          <p className="text-cyan-700 text-[14px]">PG 위젯 영역 / 카드 / 간편결제 선택 UI (mock)</p>
          <div className="mt-[12px] grid grid-cols-2 gap-[16px]">
            <div className="bg-cyan-50 border border-cyan-100 rounded-[8px] p-[16px]">
              <div className="text-cyan-700">PG 결제 팝업 또는 외부 위젯 연동 영역</div>
              <div className="mt-[12px] h-[120px] bg-white border border-cyan-100 rounded-[6px]" />
            </div>
            <div className="bg-white border border-cyan-100 rounded-[8px] p-[16px]">
              <div className="h-[52px] bg-cyan-50 border border-cyan-100 rounded-[6px]" />
              <div className="mt-[10px] h-[52px] bg-white border border-cyan-100 rounded-[6px]" />
              <div className="mt-[10px] h-[52px] bg-cyan-50 border border-cyan-100 rounded-[6px]" />
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
