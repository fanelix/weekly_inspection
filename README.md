# BSI · Weekly Inspection — Radar & RTS Leica TM60

Aplikasi inspeksi mingguan untuk field technician BSI, dengan tema navy/green BSI, mode terang/gelap, frontend responsif, backend Node.js di **Vercel**, dan penyimpanan utama **Google Drive**. Tidak ada kolom email dan teknisi tidak perlu memberi akses Google Drive pribadinya.

Versi 2 berjalan tanpa Google Apps Script. [Panduan deployment Vercel](docs/vercel-deployment.md) menjelaskan import GitHub dan OAuth akun pemilik. Backend baru memerlukan environment variables pemilik; koneksi Drive melalui ChatGPT tidak otomatis menjadi kredensial Vercel. Tanpa konfigurasi, aplikasi menampilkan keterangan Drive belum terhubung dan menolak pengiriman.

## Fitur

- Radar: General, Genset, Controller, Solar, Weather sensor, Trailer/container, dan temuan; checklist SV-2248 April 2026 yang disederhanakan. Genset: kondisi visual, fuel/oil level, nomor, tegangan baterai, catatan, foto. Controller: kondisi umum dan laptop, foto. Solar: kebersihan, kabel, mounting, foto. Weather sensor: kondisi umum, foto.
- Radar baru yang belum ada di daftar dapat ditambahkan langsung dari form (Identitas → "Tambahkan radar baru"). Daftar tersimpan di Drive pada folder Radar sebagai `radar-registry-<ID>.json`, sehingga langsung tersedia untuk semua teknisi.
- Header menampilkan logo resmi PT Bumi Suksesindo dari `web/assets/bsi-logo.png` (lihat `web/assets/README.md` untuk mengganti).
- Leica TM60: nivo/level, lensa/bodi, dudukan, panel/kelistrikan, Moxa/jaringan (indikator Moxa dan kondisi kabel), solar, baterai/charge controller, serta area alat.
- Kamera atau galeri per bagian; kompresi otomatis, maksimum 1 MB/foto dan 8 MB total. Foto dikirim satu per request.
- Diperiksa / Tidak diperiksa / N/A; kondisi tidak dipilih otomatis. Catatan wajib untuk masalah dan item yang tidak diperiksa pada bagian yang menyediakan kolom catatan; masalah tetap membutuhkan rangkuman temuan.
- Pembacaan aktual opsional dengan satuan sesuai display. Nilai kosong tidak menjadi nol; aplikasi tidak menginventarisasi ambang alarm alat.
- ID Drive dialokasikan sebelum menulis dan disimpan dalam draf. Percobaan ulang memakai ID tetap; laporan belum lengkap tidak masuk riwayat.
- Draf jawaban dalam tab browser; foto yang belum terkirim perlu dilampirkan ulang setelah reload. Bila draf gagal disimpan, pengiriman belum dimulai.
- Bukti pengiriman, CSV, ZIP beserta foto, laporan terstruktur, dan cetak / Save as PDF.
- Riwayat admin dengan filter peralatan, unit, kondisi, tanggal, pagination, dan ekspor data yang sudah dimuat.
- Password admin dengan cookie HttpOnly satu jam, PIN teknisi opsional, secret hanya di server.
- Laporan UUID dari Apps Script tetap dapat dibaca. Item dan foto yang dihapus dari form baru tetap tampil pada laporan terdahulu, status riwayat, CSV, ZIP, serta cetak/PDF. Ekspor gabungan mempertahankan kolom historis tanpa mewajibkannya pada inspeksi baru.

## Penyimpanan

Folder utama: [Weekly Inspection](https://drive.google.com/drive/folders/1JoaN3UkwcEGNGo0awHsOdQgkWfvLi6hJ).

| Jenis | Folder |
| --- | --- |
| Radar | [Radar](https://drive.google.com/drive/folders/1Hy712mdHN7nc9vl0qlvp7767mZ94mzkj) |
| RTS | [RTS](https://drive.google.com/drive/folders/1doqkhGxYICXQJeRpLmtyc1mZl5olgMzt) |

Setiap laporan mempunyai folder ber-ID Drive, `pending.json`, foto per bagian, `inspection.csv`, dan `inspection.json`. Manifest `inspection.json` dibuat paling akhir sebagai penanda pengiriman lengkap. ID file tetap dan verifikasi isi melindungi retry konkuren dari duplikasi. Tiket mengikat jawaban, metadata foto, dan folder tujuan; foto baru menyimpan SHA-256 untuk pemeriksaan saat dibaca.

File internal jangan diedit. Pemilik/editor Drive tetap dapat mengubah atau menghapus data secara langsung; penyimpanan ini bukan arsip tahan perubahan. Folder pada pemeriksaan awal memiliki **Anyone with link — Editor**. Password admin aplikasi tidak mengurangi akses langsung Drive. Aplikasi tidak mengubah sharing atau file spreadsheet/Form/Apps Script yang sudah ada.

## Menjalankan dan deploy

Gunakan [panduan Vercel](docs/vercel-deployment.md) untuk bekerja sepenuhnya melalui browser. Import repository dengan preset **Other**; konfigurasi build sudah tersedia di `vercel.json`.

Pengembangan lokal, Node.js 24, tanpa dependency runtime pihak ketiga:

```sh
npm run build
npm run dev
```

Buka `http://localhost:4173`. Untuk koneksi nyata, isi `.env.local` berdasarkan `.env.example`; jangan commit secret. Tanpa env, tidak ada Drive simulasi pada aplikasi Vercel.

```sh
npm run check
npm test
npm run build
```

## Struktur kode

| Lokasi | Fungsi |
| --- | --- |
| `web/` | Frontend tema BSI, form, draf, upload bertahap, ekspor, admin |
| `api/rpc.js` | Entry point fungsi Vercel |
| `server/` | Autentikasi, transaksi, Drive REST, konfigurasi |
| `appsscript/Schema.gs`, `Validation.gs` | Sumber checklist dan validasi bersama |
| `server/domain.js` | Generated domain; `npm run sync-domain` setelah mengubah schema/validasi |
| `public/` | Output build, tidak diedit atau di-commit |
| `tests/` | Validasi, transaksi, RPC, autentikasi, transport dan draf |

Setelah mengubah schema/validasi, jalankan `npm run sync-rules`, `npm run sync-domain`, `npm run bundle`, lalu checks/tests/build. CI memeriksa kecocokan kode generated.

## Uji dan batas operasional

Tes menggunakan adapter Drive memori dan HTTP lokal; tidak membuktikan OAuth atau upload produksi sudah aktif. Lakukan uji Radar dan RTS melalui deployment sesuai panduan sebelum digunakan tim.

[Audit perubahan checklist 4 Oktober 2026](docs/audit-2026-10-04.md) mencatat cakupan pemeriksaan dan perbaikan kompatibilitas laporan.

Tiket upload berlaku 24 jam. Jawaban/foto tidak dapat diganti setelah transaksi dimulai; buat inspeksi baru bila berubah. Riwayat membaca halaman Drive bertahap; urutan tanggal terbaru berlaku pada data yang sudah dimuat. Tidak ada endpoint hapus laporan. Batas login per-instance bersifat best effort; gunakan konfigurasi Firewall Vercel bila membutuhkan pembatasan lintas-instance.

Form mencatat pemeriksaan, tanpa mengubah leveling, resection, kalibrasi, firmware, atau monitoring alat. Tindakan teknisi mengikuti prosedur site.

## Apps Script lama

Backend/frontend lama tetap ada di `appsscript/` dan paket tiga file di `dist/`, dengan [panduan Apps Script](docs/deployment.md). Versi lama tidak diperlukan untuk deployment Vercel. `npm run preview` menjalankan preview Apps Script dengan Drive simulasi dan password khusus preview `preview-admin-only`; gunakan `npm run dev` untuk aplikasi Vercel.

## Referensi

- [Tema BSI dari pengguna](https://claude.ai/artifact/13eT27KS9MeTnWVxQAwoBW)
- [Vercel deployment](https://vercel.com/docs/git)
- [Google Drive API](https://developers.google.com/workspace/drive/api/guides/create-file)
- [Leica Nova TM60](https://leica-geosystems.com/products/total-stations/robotic-total-stations/leica-nova-tm60)
- Checklist Radar: SV-2248 Report Maintenance BSI April 2026, diberikan pengguna. Temuan historis tidak menjadi kondisi alat saat ini secara otomatis.
