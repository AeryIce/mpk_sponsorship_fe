export default function SuccessPage() {
  return (
    <section className="max-w-xl mx-auto text-center space-y-4">
      <h1 className="text-2xl font-bold">Terima kasih! 🙏</h1>
      <p className="text-neutral-700">
        Pengajuan pemasangan iklan Anda sudah kami terima. Tim panitia akan segera menghubungi.
      </p>
      <a href="/sponsorship/apply" className="inline-block mt-2 rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50">
        Kembali ke Form
      </a>
    </section>
  );
}
