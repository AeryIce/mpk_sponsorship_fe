"use client";
import Image from "next/image";
import { useState } from "react";

export type SlotId = "IFC" | "IBC" | "BC_OUT" | "FULL" | "HALF" | "QUARTER";

type Props = {
  selected: SlotId | null;
  onSelect: (s: SlotId) => void;
  /** ilustrasi halaman isi */
  fullImg?: string;
  halfImg?: string;
  quarterImg?: string;
  /** ilustrasi cover (pakai saja gambar full kalau belum ada) */
  coverImg?: string;
};

export default function AnimatedBookPreview({
  selected,
  onSelect,
  fullImg = "/FullPage.jpeg",
  halfImg = "/HalfPage.jpeg",
  quarterImg = "/QuarterPage.jpeg",
  coverImg = "/FullPage.jpeg",
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative w-full">
      {/* kanvas buku */}
      <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-[#eadcc6] bg-[#fffaf0]/80 shadow-sm"
           style={{ backgroundImage: "url('/BackgroundMPK.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="relative h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden rounded-3xl">
          {/* buku tertutup */}
          {!isOpen && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-[70%] w-[42%] rotate-[-2deg] rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
                <Image src={coverImg} alt="cover" fill className="object-cover rounded-2xl opacity-90" />
              </div>
            </div>
          )}

          {/* buku terbuka */}
          {isOpen && (
            <div className="absolute inset-0 flex items-center justify-center gap-4 px-6">
              {/* halaman kiri (IFC & IBC) */}
              <div className="relative h-[80%] w-[36%] rotate-[-2deg] rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                <Image src={coverImg} alt="ifc/ibc" fill className="object-cover rounded-xl" />
                {/* hotspot IFC */}
                <button
                  onClick={() => onSelect("IFC")}
                  className={`absolute inset-0 rounded-xl transition 
                    ${selected === "IFC" ? "ring-4 ring-amber-400" : "ring-0"} hover:ring-2 hover:ring-amber-300`}
                  aria-label="Cover Depan Dalam (IFC)"
                  title="Cover Depan Dalam (IFC)"
                />
              </div>

              {/* punggung (BC_OUT) */}
              <div className="relative h-[76%] w-[3%] rounded bg-[#c9b69a]/60 shadow-inner">
                <button
                  onClick={() => onSelect("BC_OUT")}
                  className={`absolute inset-0 rounded transition 
                    ${selected === "BC_OUT" ? "ring-4 ring-amber-400" : "ring-0"} hover:ring-2 hover:ring-amber-300`}
                  aria-label="Cover Belakang Luar"
                  title="Cover Belakang Luar"
                />
              </div>

              {/* halaman kanan (ISI FULL/HALF/QUARTER + IBC) */}
              <div className="relative h-[80%] w-[36%] rotate-[2deg] rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
                <Image src={fullImg} alt="isi" fill className="object-cover rounded-xl" />
                {/* hotspot FULL (atas>tengah) */}
                <button
                  onClick={() => onSelect("FULL")}
                  className={`absolute left-0 top-0 h-[65%] w-full rounded-xl transition 
                    ${selected === "FULL" ? "ring-4 ring-amber-400" : "ring-0"} hover:ring-2 hover:ring-amber-300`}
                  aria-label="Isi — Full Page"
                  title="Isi — Full Page"
                />
                {/* hotspot HALF (bawah kiri) */}
                <div className="absolute bottom-0 left-0 h-[35%] w-1/2">
                  <Image src={halfImg} alt="half" fill className="object-cover" />
                  <button
                    onClick={() => onSelect("HALF")}
                    className={`absolute inset-0 rounded transition 
                      ${selected === "HALF" ? "ring-4 ring-amber-400" : "ring-0"} hover:ring-2 hover:ring-amber-300`}
                    aria-label="Isi — Half Page"
                    title="Isi — Half Page"
                  />
                </div>
                {/* hotspot QUARTER (bawah kanan) */}
                <div className="absolute bottom-0 right-0 h-[35%] w-1/2">
                  <Image src={quarterImg} alt="quarter" fill className="object-cover" />
                  <button
                    onClick={() => onSelect("QUARTER")}
                    className={`absolute inset-0 rounded transition 
                      ${selected === "QUARTER" ? "ring-4 ring-amber-400" : "ring-0"} hover:ring-2 hover:ring-amber-300`}
                    aria-label="Isi — Quarter Page"
                    title="Isi — Quarter Page"
                  />
                </div>

                {/* hotspot IBC (garis tipis sisi luar halaman kanan) */}
                <button
                  onClick={() => onSelect("IBC")}
                  className={`absolute right-[-10px] top-0 h-full w-[12px] rounded transition 
                    ${selected === "IBC" ? "ring-4 ring-amber-400" : "ring-0"} hover:ring-2 hover:ring-amber-300`}
                  aria-label="Cover Belakang Dalam (IBC)"
                  title="Cover Belakang Dalam (IBC)"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-5 pb-4 pt-3">
          <span className="text-xs text-[#7a6040]">Klik area pada buku untuk memilih slot.</span>
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-[#6b4a1a] hover:bg-amber-100"
          >
            {isOpen ? "Tutup Buku" : "Buka Buku"}
          </button>
        </div>
      </div>
    </div>
  );
}
