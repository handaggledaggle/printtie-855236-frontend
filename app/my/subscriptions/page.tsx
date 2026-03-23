import { PageShell } from "@/components/printtie/page-shell";
import { MySubscriptionsClient } from "@/components/printtie/subscriptions/my-subscriptions-client";

export default function MySubscriptionsPage() {
  return (
    <PageShell className="font-atkinson">
      <MySubscriptionsClient />
    </PageShell>
  );
}
