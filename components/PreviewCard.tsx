"use client";
import Image from "next/image";
import React from "react";

export type SlotId = "IFC" | "IBC" | "BC_OUT" | "FULL" | "HALF" | "QUARTER";

type Props = {
  id: SlotId;
  title: string;
  img: string;              // path di /public
  selected?: boolean;
  onSelect: (id: SlotId) => void;
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Card preview dengan highlight area iklan:
 * - FULL   : 1 halaman penuh
 * - HALF   : 1/2 kiri
 * - QUARTER: 1/4 kiri-atas
 * IFC/IBC/BC_OUT diperlakukan seperti FULL (badge tetap IFC/IBC/BC_OUT)
 */
export default function PreviewCard({ id, title, img, selected, onSelect }: Props) {
  const variant: "full" | "half" | "quarter" =
    id === "HALF" ? "half" : id === "QUARTER" ? "quarter" : "full";

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl border transition-all focus:outline-none",
        selected
          ? "border-amber-500 ring-4 ring-amber-300/30 shadow-amber-300/30 shadow-xl"
          : "border-[#eadcc6] hover:shadow-md hover:-translate-y-0.5"
      )}
      style={{ aspectRatio: "3 / 4" }} // biar proporsional
      aria-label={title}
      title={title}
    >
      {/* gambar dasar dibikin agak gelap supaya area iklan lebih pop */}
      <Image
        src={img}
        alt={title}
        fill
        className="object-cover brightness-[.78]"
        sizes="(min-width:1024px) 240px, 40vw"
        priority={false}
      />

      {/* hatch tipis di seluruh halaman (membedakan area non-iklan) */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(45deg, #7a6040 0 2px, transparent 2px 8px)",
        }}
      />

      {/* area iklan yang di-highlight */}
      <AdHighlight variant={variant} img={img} />

      {/* badge pojok kanan atas */}
      <div className="absolute right-2 top-2 rounded-md bg-[#6b4a1a] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white shadow">
        {id === "IFC" || id === "IBC" || id === "BC_OUT" ? id : variant.toUpperCase()}
      </div>

      {/* footer judul */}
      <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm px-2 py-1.5 text-[11.5px] leading-snug text-[#4e3a18]">
        <span className="line-clamp-2">{title}</span>
      </div>
    </button>
  );
}

function AdHighlight({ variant, img }: { variant: "full" | "half" | "quarter"; img: string }) {
  // gunakan persentase agar responsive terhadap aspect-ratio card
  const base = { left: "4%", top: "4%", width: "92%", height: "92%" };

  const rect =
    variant === "full"
      ? base
      : variant === "half"
      ? { left: "4%", top: "4%", width: "46%", height: "92%" } // kiri 1/2
      : { left: "4%", top: "4%", width: "46%", height: "46%" }; // 1/4 kiri-atas

  return (
    <div
      className="absolute rounded-md shadow-[0_0_0_3px_rgba(245,158,11,0.9)] ring-8 ring-amber-400/20"
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }}
    >
      {/* duplicate image di dalam area iklan (lebih terang & kontras) */}
      <div
        className="absolute inset-0 rounded-[4px] shadow-sm"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(1.08) contrast(1.05)",
        }}
      />
      {/* border emas tipis */}
      <div className="absolute inset-0 rounded-[4px] ring-2 ring-amber-500 pointer-events-none" />
      {/* label kecil */}
      <div className="absolute bottom-1 right-1 rounded bg-amber-500/95 px-1.5 py-[1px] text-[10px] font-bold text-white shadow">
        AREA IKLAN
      </div>
    </div>
  );
}
