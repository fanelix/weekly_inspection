# Weekly Inspection — Radar & RTS Leica TM60

Aplikasi inspeksi mingguan untuk field technician BSI: frontend responsif di HP, backend Google Apps Script, dan penyimpanan utama di Google Drive. Tidak ada kolom email dan teknisi tidak perlu memberikan akses Google Drive pribadinya.

**Status:** kode aplikasi tersedia. Web app produksi baru aktif setelah pemilik mengotorisasi dan men-deploy Google Apps Script. GitHub menyimpan kode; GitHub Pages tidak menjalankan backend ini. Preview lokal memakai Drive simulasi di memori, tidak mengirim data ke Google.

## Fitur

- Radar: General, Genset, Controller/komunikasi, Solar, Weather, Trailer/container, dan temuan; mengikuti checklist SV-2248 April 2026.
- RTS Leica TM60: nivo/level, kebersihan lensa/bodi, dudukan alat, panel/kelistrikan, Moxa/jaringan, solar, baterai/charge controller, serta dudukan/area.
- Foto melalui kamera atau galeri untuk setiap bagian yang diperiksa; kompresi otomatis, maksimum 1 MB/foto dan 8 MB total.
- Status Diperiksa / Tidak diperiksa / N/A; catatan wajib untuk masalah atau item yang tidak diperiksa. Kondisi tidak dipilih otomatis.
- Pembacaan aktual opsional; nilai kosong tidak menjadi nol. Satuan sesuai display, tanpa ambang alarm yang diinventarisasi.
- UUID dan commit marker mencegah laporan ganda saat mencoba ulang; proses belum lengkap tidak masuk riwayat.
- Draft jawaban pada tab browser; foto yang belum terkirim harus dilampirkan ulang setelah reload.
- Bukti pengiriman, CSV, ZIP beserta foto, laporan terstruktur, serta cetak / Save as PDF.
- Riwayat admin dengan filter peralatan, unit, kondisi, dan rentang tanggal; pagination dan ekspor data yang telah dimuat.
- Password admin, sesi 1 jam, PIN teknisi opsional; tanpa secret di frontend atau GitHub.

## Penyimpanan Drive

Folder utama: [Weekly Inspection](https://drive.google.com/drive/folders/1JoaN3UkwcEGNGo0awHsOdQgkWfvLi6hJ).

Folder aktif sudah dibuat dan diuji tulis:

| Jenis | Folder |
| --- | --- |
| Radar | [Radar](https://drive.google.com/drive/folders/1Hy712mdHN7nc9vl0qlvp7767mZ94mzkj) |
| RTS | [RTS](https://drive.google.com/drive/folders/1doqkhGxYICXQJeRpLmtyc1mZl5olgMzt) |

```text
Weekly Inspection/
  Radar/<uuid>/
    pending.json
    General_Image.jpg
    ...
    inspection.csv
    inspection.json
  RTS/<uuid>/
    pending.json
    RTS_Instrument_Image.jpg
    ...
    inspection.csv
    inspection.json
```

`inspection.json` dibuat paling akhir dan menandai laporan lengkap. `pending.json` menyimpan digest transaksi untuk retry; jangan mengedit file internal ini. Tidak ada database lokal wajib, service account, atau server Node yang harus di-host. Tidak mengubah spreadsheet/Form/Apps Script lama di folder tersebut.

**Akses folder saat pemeriksaan:** Anyone with link — Editor. Foto dan laporan di bawah folder akan mengikuti akses Drive tersebut. Password admin aplikasi hanya membatasi menu aplikasi, bukan akses langsung yang telah diberikan oleh Drive. Atur sharing folder melalui pemilik Drive bila akses tersebut ingin dibatasi; aplikasi tidak mengubah sharing.

## Menjalankan tanpa terminal

Ikuti [panduan deployment](docs/deployment.md). Paket siap salin di `dist/` hanya terdiri dari tiga file:

1. `Code.gs` — seluruh backend.
2. `Index.html` — seluruh frontend dan validasi client.
3. `appsscript.json` — manifest.

Tidak perlu API key, OAuth client secret, npm install, atau token GitHub untuk memakai aplikasi. Akun pemilik tetap harus memberikan izin Google saat mengaktifkan Apps Script. Jika kebijakan Google Workspace tidak menyediakan akses anonymous, teknisi mungkin tetap perlu login sesuai kebijakan domain; aplikasi sendiri tidak meminta email.

## Pengembangan

Node 22+; CI memakai Node 24. Tidak ada dependency npm pihak ketiga.

```bash
npm run check
npm test
npm run preview
```

Preview lokal di port 4173, dengan password admin **khusus preview** `preview-admin-only`. Password ini hanya ada dalam adapter pengujian dan tidak menjadi password aplikasi Google Apps Script.

Setelah mengubah validasi:

```bash
npm run sync-rules
npm run check
npm test
npm run bundle
```

Backend dalam `appsscript/`: `Schema.gs`, `Validation.gs`, `Config.gs`, `Auth.gs`, `Storage.gs`, `Code.gs`. Frontend: `Index.html`, `Styles.html`, `Client.html`, `Rules.html`, `Zip.html`. File `dist/` dihasilkan otomatis; jangan mengedit bundle langsung.

## Uji dan batas operasional

Suite memeriksa validasi Radar/RTS, N/A, foto, nilai nol/satuan, tanggal, formula/multiline CSV, retry, transaksi parsial, akses laporan sendiri, admin, dan PIN. Drive dalam tes disimulasikan; uji ini tidak menggantikan smoke test deployment Google nyata. Gunakan checklist deployment sebelum membagikan URL kepada teknisi.

Apps Script dan Drive memiliki kuota akun. Foto dikirim setelah kompresi dan riwayat dibaca bertahap. Urutan tanggal terbaru berlaku pada halaman/data yang sudah dimuat; gunakan filter tanggal dan muat halaman berikutnya untuk data lama. Sesi cache dapat hilang lebih awal; login ulang atau kirim ulang dengan UUID yang sama. Paket ZIP dihasilkan pada perangkat pengisi.

Form tidak mengubah leveling, resection, kalibrasi, firmware, atau konfigurasi monitoring. Temuan keselamatan dan tindakan pada alat tetap mengikuti prosedur site.

## Referensi

- [Google Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)
- [HTML Service dan RPC privat](https://developers.google.com/apps-script/guides/html/communication)
- [Drive service](https://developers.google.com/apps-script/reference/drive)
- [Leica Nova TM60](https://leica-geosystems.com/products/total-stations/robotic-total-stations/leica-nova-tm60)
- Checklist Radar: SV-2248 Report Maintenance BSI April 2026, diberikan oleh pengguna. Temuan maintenance historis tidak menjadi kondisi saat ini yang diisi otomatis.
