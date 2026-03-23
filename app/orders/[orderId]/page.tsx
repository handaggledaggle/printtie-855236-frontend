import { PageShell } from "@/components/printtie/page-shell";
import { OrdersClient } from "@/components/printtie/orders/orders-client";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  // UI-only: orderId를 선택 상태로만 전달 (실제 API 연동은 다음 단계)
  return (
    <PageShell className="font-atkinson">
      <OrdersClient initialSelectedOrderId={orderId} />
    </PageShell>
  );
}
