// components/PageHeader.tsx
export default function PageHeader({
  title,
  subtitle,
}: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-4">
      {/* <img src="/LogoMPK50th.png" alt="MPK-KAJ 50th" className="h-14 w-auto" /> */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#6b4a1a]">{title}</h1>
        {subtitle && <p className="text-sm md:text-base text-[#7a6040]">{subtitle}</p>}
      </div>
    </div>
  );
}
