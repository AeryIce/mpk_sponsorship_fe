'use client';

import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type SlotKey = 'IFC' | 'IBC' | 'BC_OUT' | 'FULL' | 'HALF' | 'QUARTER';
type Kategori = 'perusahaan' | 'lpk';

const HARGA = {
  perusahaan: { FULL: 10_000_000, HALF: 5_000_000, QUARTER: 3_000_000 },
  lpk:        { FULL: 7_500_000,  HALF: 4_000_000, QUARTER: 2_500_000 },
  cover:      { IFC: 20_000_000,  IBC: 15_000_000, BC_OUT: 25_000_000 },
} as const;

const SLOT_META: Record<SlotKey, {
  label: string;
  section: 'cover' | 'inside';
  size: 'full' | 'half' | 'quarter';
}> = {
  IFC:     { label: 'Cover Depan Dalam',     section: 'cover',  size: 'full'    },
  IBC:     { label: 'Cover Belakang Dalam',  section: 'cover',  size: 'full'    },
  BC_OUT:  { label: 'Cover Belakang Luar',   section: 'cover',  size: 'full'    },
  FULL:    { label: 'Halaman Dalam (Full)',  section: 'inside', size: 'full'    },
  HALF:    { label: 'Halaman Dalam (Half)',  section: 'inside', size: 'half'    },
  QUARTER: { label: 'Halaman Dalam (Quarter)', section: 'inside', size: 'quarter' },
};

const toIDR = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

// helpers type-safe
function getMessage(x: unknown): string | undefined {
  if (typeof x === 'object' && x !== null) {
    const r = x as Record<string, unknown>;
    if (typeof r.message === 'string') return r.message;
  }
  return undefined;
}
function getTicket(x: unknown): string | undefined {
  if (typeof x === 'object' && x !== null) {
    const r = x as Record<string, unknown>;
    if (typeof r.ticket === 'string') return r.ticket;
    if (typeof r.data === 'object' && r.data !== null) {
      const d = r.data as Record<string, unknown>;
      if (typeof d.ticket === 'string') return d.ticket;
    }
  }
  return undefined;
}

export default function SponsorApplyForm({ compact = false }: { compact?: boolean }) {
  const params = useSearchParams();
  const [isSubmitting, setSubmitting] = useState(false);

  const slotParam = (params.get('slot') || '').toUpperCase() as SlotKey;
  const kategoriParam = (params.get('kategori') || 'perusahaan').toLowerCase() as Kategori;

  const selected = useMemo(() => {
    const keys: SlotKey[] = ['IFC','IBC','BC_OUT','FULL','HALF','QUARTER'];
    if (!keys.includes(slotParam)) return null;
    return { key: slotParam, ...SLOT_META[slotParam] };
  }, [slotParam]);

  const price = useMemo(() => {
    if (!selected) return null;
    if (selected.section === 'cover') {
      return HARGA.cover[selected.key as 'IFC'|'IBC'|'BC_OUT'];
    }
    const sizeKey = selected.key as 'FULL'|'HALF'|'QUARTER';
    return HARGA[kategoriParam][sizeKey];
  }, [selected, kategoriParam]);

  if (!selected) {
    return (
      <div id="apply-form" className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
        <div className="font-semibold">Belum ada slot terpilih.</div>
        <div className="text-sm mt-1">
          Silakan pilih slot iklan terlebih dulu dari grid thumbnail.
        </div>
      </div>
    );
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);

    const payload = {
      slot_key: selected.key,
      slot_label: selected.label,
      slot_section: selected.section,
      slot_size: selected.size,
      slot_price: price ?? 0,
      kategori: kategoriParam,
      company_name: fd.get('company_name') as string,
      company_address: fd.get('company_address') as string,
      company_phone: fd.get('company_phone') as string,
      company_email: fd.get('company_email') as string,
      pic_name: fd.get('pic_name') as string,
      pic_position: fd.get('pic_position') as string,
      pic_phone: fd.get('pic_phone') as string,
      artwork_url: (fd.get('artwork_url') as string) || '',
      notes: (fd.get('notes') as string) || '',
      agree: fd.get('agree') === 'on',
    };

    if (!payload.agree) {
      alert('Mohon centang pernyataan & persetujuan.');
      return;
    }

    try {
      setSubmitting(true);

      const API_BASE_ENV =
        process.env.NEXT_PUBLIC_API_BASE ??
        (process.env.NEXT_PUBLIC_BACKEND_URL
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, '')}/api`
          : '');

      const API_BASE = (API_BASE_ENV || '').replace(/\/$/, '');
      if (!/^https?:\/\//i.test(API_BASE)) {
        alert('Konfigurasi API belum benar. Set NEXT_PUBLIC_API_BASE ke https://mpkbackend-production.up.railway.app/api');
        return;
      }

      const url = `${API_BASE}/sponsorship/apply`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'omit',
      });

      const raw = await res.text();
      let out: unknown = null; try { out = JSON.parse(raw); } catch {}
      if (!res.ok) {
        const msg = getMessage(out) || raw || `Gagal mengirim pengajuan sponsorship (HTTP ${res.status}).`;
        throw new Error(typeof msg === 'string' ? msg : String(msg));
      }

      const ticket = getTicket(out) ?? '—';
      alert(
        `Terima kasih! Pengajuan tersimpan.\n` +
        `Ticket: ${ticket}\n` +
        `Kami sudah mengirim email konfirmasi ke ${payload.company_email}.`
      );

      form.reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan. Mohon coba lagi.';
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // === View ===
  const formEl = (
    <form
      key={`${slotParam}-${kategoriParam}`} // ganti slot/kategori -> re-mount -> reset
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-white p-6 shadow-sm"
    >
      {!compact && (
        <>
          <h2 className="text-xl font-semibold">Data Pengiklan</h2>
          <p className="text-sm text-slate-600 mb-4">Lengkapi data sesuai form panitia.</p>
        </>
      )}

      {/* Hidden metadata */}
      <input type="hidden" name="slot_key" value={selected.key} />
      <input type="hidden" name="slot_label" value={selected.label} />
      <input type="hidden" name="slot_price" value={price ?? 0} />
      <input type="hidden" name="slot_section" value={selected.section} />
      <input type="hidden" name="slot_size" value={selected.size} />
      <input type="hidden" name="kategori" value={kategoriParam} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Lembaga/Perusahaan</label>
          <input name="company_name" required className="w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telepon</label>
          <input name="company_phone" required className="w-full rounded-lg border px-3 py-2" />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Alamat</label>
        <textarea name="company_address" required rows={3} className="w-full rounded-lg border px-3 py-2" />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input name="company_email" type="email" required className="w-full rounded-lg border px-3 py-2" />
      </div>

      <h3 className="text-lg font-semibold mt-6">Penanggung Jawab</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <input name="pic_name" required className="w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Jabatan</label>
          <input name="pic_position" required className="w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">No. HP/Whatsapp</label>
          <input name="pic_phone" required className="w-full rounded-lg border px-3 py-2" />
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-6">Materi Iklan</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <label className="block text-sm font-medium mb-1">Link Artwork (opsional)</label>
          <input name="artwork_url" placeholder="https://…" className="w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Catatan/Request (opsional)</label>
          <input name="notes" className="w-full rounded-lg border px-3 py-2" />
        </div>
      </div>

      <div className="mt-4">
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" name="agree" className="size-4" />
          <span>
            Saya menyatakan materi iklan milik sah pihak pengiklan & setuju dengan ketentuan pemasangan iklan.
          </span>
        </label>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          disabled={isSubmitting}
          className="rounded-xl px-5 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {isSubmitting ? 'Mengirim…' : 'Kirim Pengajuan'}
        </button>
        {!compact && (
          <span className="text-xs text-slate-500">
            Setelah submit, tim kami akan follow-up via email/WhatsApp.
          </span>
        )}
      </div>
    </form>
  );

  if (compact) {
    // compact: hanya form, dengan anchor untuk scroll target
    return <div id="apply-form">{formEl}</div>;
  }

  // default (non-compact): recap + form (layout lama)
  return (
    <div id="apply-form" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <aside className="lg:col-span-1">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500 mb-2">Ringkasan Pilihan Slot</div>
          <div className="text-lg font-semibold">{selected.label}</div>
          <div className="text-sm text-slate-600 mt-1 capitalize">
            {selected.section === 'cover' ? 'Bagian Sampul' : 'Bagian Isi'} · {selected.size} page
          </div>
          <div className="mt-3 text-emerald-700 font-bold">
            {price !== null ? toIDR(price) : '-'}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Kategori pengiklan: <span className="font-medium">{kategoriParam}</span>
          </div>
          <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
            *Harga & slot mengikuti pilihan thumbnail. Ubah pilihan? Kembali ke grid lalu pilih slot lain.
          </div>
        </div>
      </aside>

      <section className="lg:col-span-2">
        {formEl}
      </section>
    </div>
  );
}
