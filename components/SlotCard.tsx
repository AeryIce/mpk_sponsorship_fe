"use client";
import Image from "next/image";

export interface SlotCardProps {
  id: "IFC" | "IBC" | "BC_OUT" | "FULL" | "HALF" | "QUARTER";
  title: string;
  image: string;       // path di /public
  sizeMM: string;      // contoh: "210 × 297 mm"
  sizeCM: string;      // contoh: "21 × 29.7 cm"
  priceLabel: string;  // contoh: "Rp 10.000.000"
  selected?: boolean;
  onSelect: (id: SlotCardProps["id"]) => void;
}

export default function SlotCard({
  id, title, image, sizeMM, sizeCM, priceLabel, selected, onSelect,
}: SlotCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={[
        "group relative w-full overflow-hidden rounded-xl border transition-all text-left",
        selected
          ? "border-amber-500 ring-4 ring-amber-300/30 shadow-amber-300/30 shadow-xl"
          : "border-[#eadcc6] hover:shadow-md hover:-translate-y-0.5",
      ].join(" ")}
      style={{ aspectRatio: "3 / 4" }}
      aria-label={title}
      title={title}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover brightness-90"
        sizes="(min-width:1024px) 240px, 40vw"
        priority={false}
      />

      {/* Overlay gradient halus */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/35" />

      {/* Badge kiri-atas: nama slot */}
      <div className="absolute left-2 top-2 rounded-md bg-[#6b4a1a] px-2 py-0.5 text-[11px] font-semibold text-white shadow">
        {id}
      </div>

      {/* Badge kanan-atas: ukuran */}
      <div className="absolute right-2 top-2 rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-medium text-[#4e3a18] shadow">
        {sizeMM}
      </div>

      {/* Footer harga + judul */}
      <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur px-2 py-2">
        <div className="text-[12px] font-semibold text-[#6b4a1a]">{priceLabel}</div>
        <div className="text-[11.5px] text-[#4e3a18]">{title}</div>
      </div>
    </button>
  );
}
