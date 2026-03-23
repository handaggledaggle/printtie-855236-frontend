import { PageShell } from "@/components/printtie/page-shell";
import { OrdersClient } from "@/components/printtie/orders/orders-client";

export default function OrdersPage() {
  return (
    <PageShell className="font-atkinson">
      <OrdersClient />
    </PageShell>
  );
}
