// components/GlassCard.tsx
import { cn } from "@/utils";

export default function GlassCard({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`relative card-krem ${className}`}>
      {/* watermark DI BELAKANG konten */}
      <div className="wm-50 absolute inset-0 z-0"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
