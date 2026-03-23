import { PageShell } from "@/components/printtie/page-shell";
import { CartClient } from "@/components/printtie/cart/cart-client";

export default function CartPage() {
  return (
    <PageShell className="font-atkinson">
      <CartClient />
    </PageShell>
  );
}
