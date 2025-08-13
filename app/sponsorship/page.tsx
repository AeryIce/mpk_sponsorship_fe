import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import parse from "html-react-parser";

const PRAKATA = `Pada tahun ini, dengan gembira kami memberitahukan bahwa Majelis Pendidikan Katolik Keuskupan Agung Jakarta (MPK-KAJ)  merayakan hari jadi ke-50. Perayaan ini merupakan momen penting untuk mengenang perjalanan panjang dan kontribusi MPK-KAJ dalam dunia pendidikan, khususnya di Keuskupan Agung Jakarta yang kami adakan pada Sabtu, 30 Agustus 2025, dalam bentuk Misa Syukur yang dipimpin oleh Kardinal Ignatius Suharyo.

Menandai 50 tahun Majelis Pendidikan Katolik Keuskupan Agung Jakarta (MPK KAJ) dalam mendukung kemajuan Pendidikan Katolik di Indonesia, kami akan menerbitkan BUKU KENANGAN 50 TAHUN MPK-KAJ, sebagai tonggak perjalanan dan harapan bagi masa depan Pendidikan Katolik. Kami membuka kesempatan bagi <strong>percetakan, perbankan, mitra strategis, institusi pendidikan, dan perusahaan</strong> untuk berkontribusi melalui pemasangan ucapan selamat yang akan mendapatkan visibilitas luas di sekolah – sekolah anggota MPK-KAJ dan iklan komunitas pendidikan.

Kami berharap kehadiran ucapan selamat dan iklan dapat menjadi bagian dari perjalanan kami dalam meningkatkan Pendidikan Katolik yang berkualitas dan relevan dengan tantangan zaman. Kami sangat mengharapkan dukungan dan partisipasi Anda.`;

const CONTACT = {
  perusahaan: {
    wa: "0816 1604 132",
    waHref: "https://wa.me/628161604132",
    email: "johannesromiyono@gmail.com",
  },
  lpk: {
    // kalau mau ditambah kontak khusus LPK/Sekolah nanti diisi sini
  },
} as const;

//const [kategori, setKategori] = useState<"perusahaan" | "lpk">("perusahaan");

export default function SponsorshipIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      {/* HERO singkat */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#6b4a1a]">
          Pesta Puncak Ulang Tahun ke‑50 MPK‑KAJ
        </h2>
        <p className="mt-2 text-[#7a6040]">
          Mari bergabung dalam perayaan dan dukung penerbitan Buku Kenangan 50 Tahun MPK-KAJ.
        </p>
      </div>

      <GlassCard className="p-0">
        {/* Kop surat */}
        <div className="overflow-hidden rounded-t-2xl border-b border-[#f3e9d6] bg-[#fff3da]">
          <img
            src="/Kop%20Surat%20MPK-KAJ.jpeg"
            alt="Kop Surat MPK-KAJ"
            className="w-full h-16 md:h-20 object-contain mx-auto py-2"
          />
        </div>

        {/* Isi kartu */}
        <div className="px-6 md:px-10 py-7 md:py-10">
          <div className="mb-5">
            <PageHeader
              title="Dukungan Menjadi Sponsor Buku Kenangan 50 Tahun MPK‑KAJ"
              subtitle="Informasi & prakata untuk calon sponsor"
            />
          </div>

          {/* 1) TEASER / PANCINGAN */}
          <div className="mb-6 rounded-xl border border-[#eadcc6] bg-[#fff3da] p-4 md:p-5">
            <div className="flex items-start gap-4">
              <div className="text-2xl select-none">✨</div>
              <div className="text-[#4e3a18]">
                <p className="font-semibold text-[#6b4a1a]">
                  Tunjukkan kepedulian <em>brand</em> Anda di momen 50 tahun MPK‑KAJ —
                  dapatkan eksposur ke jaringan sekolah & komunitas pendidikan.
                </p>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                  <li>• Penempatan premium: <em>IFC, IBC, Back Cover</em></li>
                  <li>• Opsi <em>Full / Half / Quarter Page</em></li>
                  <li>• Momentum historis & sarat emosi positif</li>
                  <li>• Desain dimuat dalam <em>layout</em> elegan & rapi</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Layout 2 kolom agar tidak “kurus” */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Kolom teks */}
            <div className="lg:col-span-2 space-y-4 leading-relaxed text-[15px] md:text-base text-[#4e3a18]">
            {PRAKATA.trim().split("\n").map((p, i) =>
                p ? <p key={i}>{parse(p)}</p> : <br key={i} />
                )}

            </div>

            {/* Kolom highlight ringkas */}
            <aside className="rounded-2xl border border-[#eadcc6] bg-[#fffaf0] p-5 md:p-6">
              <div className="text-sm font-semibold text-[#6b4a1a] mb-3">
                Mengapa beriklan di Buku Kenangan?
              </div>
              <ul className="space-y-2 text-sm text-[#58421c]">
                <li>• Visibilitas ke jaringan MPK‑KAJ</li>
                <li>• Paket jelas & fleksibel</li>
                <li>• Audiens tepat & kredibel</li>
                <li>• Momentum 50 tahun — sekali seumur organisasi</li>
              </ul>
              
            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md text-gray-800">
                <p className="font-semibold">Pembayaran via VA BAKKAT</p>
                <p className="text-sm mb-3">(detail VA disampaikan panitia)</p>

                <p className="font-semibold mb-2">PIC: Johannes Romiyono</p>

                {/* WhatsApp */}
                <a
                    href="https://wa.me/628161604132"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-green-600 hover:underline mb-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.372 0 0 5.373 0 12c0 2.116.552 4.19 1.6 6.021L.06 24l6.165-1.515A11.937 11.937 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.994 0-3.927-.53-5.626-1.533l-.403-.24-3.653.898.976-3.562-.263-.414A9.797 9.797 0 0 1 2.182 12C2.182 6.5 6.5 2.182 12 2.182S21.818 6.5 21.818 12 17.5 21.818 12 21.818z"/>
                    <path d="M17.498 14.582c-.297-.148-1.758-.867-2.03-.967-.272-.099-.47-.148-.668.148-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.148-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.057-.173-.297-.018-.458.13-.605.134-.133.297-.347.446-.52.148-.174.198-.297.297-.495.099-.198.05-.372-.025-.52-.075-.148-.668-1.611-.915-2.205-.24-.576-.484-.498-.668-.508l-.57-.01c-.198 0-.52.074-.793.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.148.198 2.095 3.201 5.08 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.007-1.411.248-.693.248-1.287.173-1.411-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                    0816-1604-132
                </a>

                {/* Email */}
                <a
                    href="mailto:johannesromiyono@gmail.com"
                    className="flex items-center text-blue-600 hover:underline"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 13.065L.075 4.5h23.85L12 13.065zM0 6.597V19.5h24V6.597l-12 8.568L0 6.597z"/>
                    </svg>
                    johannesromiyono@gmail.com
                </a>
                </div>


                

            </aside>
          </div>

          {/* 2) CTA BUTTON LEBIH MENONJOL */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/sponsorship/apply"
              className="relative inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold shadow-[0_6px_20px_rgba(201,114,10,.35)] bg-gradient-to-b from-[#d7831f] to-[#c9720a] hover:brightness-95 active:translate-y-px"
            >
              Dukung Sekarang
            </Link>

            <a
              href="/Form Pemasangan Iklan-1.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold border border-[#d9c8aa] text-[#6b4a1a] bg-[#fff3da] hover:bg-[#ffe9c1] active:translate-y-px"
            >
              Lihat Form PDF
            </a>
          </div>
        </div>
      </GlassCard>
    </main>
  );
}
