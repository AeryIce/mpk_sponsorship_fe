"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SlotCard, { SlotCardProps } from "@/components/SlotCard";
import dynamic from "next/dynamic";

type SlotId = SlotCardProps["id"];

const BASE_SIZES = {
  FULL: { mm: "210 × 297 mm", cm: "21 × 29.7 cm" },
  HALF: { mm: "210 × 148.5 mm", cm: "21 × 14.85 cm" },
  QUARTER: { mm: "105 × 148.5 mm", cm: "10.5 × 14.85 cm" },
};
const COVER_SIZE = { mm: "210 × 297 mm", cm: "21 × 29.7 cm" };

const HARGA = {
  perusahaan: { FULL: 10_000_000, HALF: 5_000_000, QUARTER: 3_000_000 },
  lpk: { FULL: 7_500_000, HALF: 4_000_000, QUARTER: 2_500_000 },
  cover: { IFC: 20_000_000, IBC: 15_000_000, BC_OUT: 25_000_000 },
} as const;

const TITLES: Record<SlotId, string> = {
  IFC: "Cover Depan Dalam (IFC) — Full Page",
  IBC: "Cover Belakang Dalam (IBC) — Full Page",
  BC_OUT: "Cover Belakang Luar — Full Page",
  FULL: "Isi — Full Page",
  HALF: "Isi — Half Page",
  QUARTER: "Isi — Quarter Page",
};

const IMAGES: Record<SlotId, string> = {
  IFC: "/FullPage.jpeg",
  IBC: "/FullPage.jpeg",
  BC_OUT: "/FullPage.jpeg",
  FULL: "/FullPage.jpeg",
  HALF: "/HalfPage.jpeg",
  QUARTER: "/QuarterPage.jpeg",
};

// form client-only
const SponsorApplyForm = dynamic(() => import("@/components/SponsorApplyForm"), { ssr: false });

function ApplyPageInner() {
  const router = useRouter();
  const params = useSearchParams();

  const [kategori, setKategori] = useState<"perusahaan" | "lpk">("perusahaan");
  const [selected, setSelected] = useState<SlotId | null>(null);

  // Prefill dari query (?slot & ?kategori)
  useEffect(() => {
    const slot = (params.get("slot") || "").toUpperCase() as SlotId;
    const kat = (params.get("kategori") || "").toLowerCase() as "perusahaan" | "lpk";
    const valid: SlotId[] = ["IFC", "IBC", "BC_OUT", "FULL", "HALF", "QUARTER"];
    if (valid.includes(slot)) setSelected(slot);
    if (kat === "perusahaan" || kat === "lpk") setKategori(kat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ganti kategori => sinkronkan URL (biar form ikut reset via key)
  const changeKategori = (kat: "perusahaan" | "lpk") => {
    setKategori(kat);
    const p = new URLSearchParams(params.toString());
    p.set("kategori", kat);
    if (selected) p.set("slot", selected);
    router.push(`/sponsorship/apply?${p.toString()}${selected ? "#apply-form" : ""}`, { scroll: !!selected });
  };

  const cards: SlotCardProps[] = useMemo(() => {
    const price = (id: SlotId) =>
      id === "IFC" || id === "IBC" || id === "BC_OUT" ? HARGA.cover[id] : HARGA[kategori][id];
    const size = (id: SlotId) =>
      id === "IFC" || id === "IBC" || id === "BC_OUT" ? COVER_SIZE : BASE_SIZES[id];

    const ids: SlotId[] = ["IFC", "IBC", "BC_OUT", "FULL", "HALF", "QUARTER"];
    return ids.map((id) => ({
      id,
      title: TITLES[id],
      image: IMAGES[id],
      sizeMM: size(id).mm,
      sizeCM: size(id).cm,
      priceLabel: `Rp ${price(id).toLocaleString("id-ID")}`,
      selected: selected === id,
      onSelect: setSelected,
      navigateOnClick: true, // klik gambar = pilih + scroll ke form
      kategori,
    }));
  }, [kategori, selected]);

  const selectedData = selected ? cards.find((c) => c.id === selected)! : null;
  const isCover = selected === "IFC" || selected === "IBC" || selected === "BC_OUT";

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <h1 className="text-2xl md:text-3xl font-extrabold text-[#6b4a1a] mb-2">
        Pemasangan Iklan — Buku Kenangan 50 Tahun
      </h1>

      {/* Kategori harga */}
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-[#7a6040]">Kategori:</span>
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="kat" checked={kategori === "perusahaan"} onChange={() => changeKategori("perusahaan")} />
          Perusahaan
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="kat" checked={kategori === "lpk"} onChange={() => changeKategori("lpk")} />
          LPK/Sekolah
        </label>
      </div>

      {/* GRID SLOT */}
      <div id="grid-slots" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {cards.map((c) => (
          <SlotCard key={`${c.id}-${kategori}`} {...c} />
        ))}
      </div>

      {/* DETAIL: small preview + form lebar */}
      {selectedData ? (
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Kartu kecil: preview & info slot (compact) */}
          <aside className="rounded-2xl border border-[#eadcc6] bg-[#fffaf0] p-5 h-fit">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedData.image}
              alt={selectedData.title}
              className="w-full rounded-xl max-h-56 object-cover mb-3"
            />
            <div className="text-sm font-semibold text-[#6b4a1a] mb-1">{selectedData.title}</div>
            <div className="text-[13px] text-[#7a6040]">
              Ukuran: <span className="font-medium text-[#4e3a18]">{selectedData.sizeCM}</span>{" "}
              <span className="text-[#a4865f]">({selectedData.sizeMM})</span>
            </div>
            <div className="mt-2 text-[15px] font-extrabold text-[#6b4a1a]">
              {selectedData.priceLabel}{" "}
              {isCover && <span className="text-xs font-semibold text-[#7a6040]">(Cover • Premium)</span>}
            </div>
            <a href="#grid-slots" className="mt-3 inline-block text-xs text-blue-600 hover:underline">
              Ganti slot
            </a>
          </aside>

          {/* Form: lebar 2 kolom */}
          <div className="lg:col-span-2">
            <SponsorApplyForm compact />
          </div>
        </section>
      ) : (
        <div className="mt-6 text-sm text-[#7a6040]">
          Klik salah satu thumbnail di atas untuk melihat harga & ukuran detail.
        </div>
      )}
    </main>
  );
}

/* Suspense wrapper */
export default function ApplyPage() {
  return (
    <Suspense fallback={null}>
      <ApplyPageInner />
    </Suspense>
  );
}
