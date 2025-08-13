// app/sponsorship/layout.tsx
export const metadata = {
  title: "Sponsorship — MPK-KAJ 50 Tahun",
  description: "Informasi & pendaftaran sponsorship Buku Kenangan 50 Tahun MPK-KAJ",
};

export default function SponsorshipLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-mpk text-[#5a3e12]">
      {children}
    </div>
  );
}
