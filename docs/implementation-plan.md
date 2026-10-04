# Weekly Inspection Implementation Plan

> **For agentic workers:** use native execution for this implementation.

**Goal:** form Radar dan Leica TM60 beserta riwayat admin dan penyimpanan langsung Drive.

**Architecture:** Apps Script V8 + HTML Service; Drive menyimpan foto, CSV, JSON commit marker. Backend helper dipisah menurut schema, validation, auth, storage, dan API.

**Tech Stack:** JavaScript, Google Apps Script, HTML/CSS, Node 24 test runner; tidak ada paket runtime pihak ketiga.

**Spec:** `docs/design.md`

## Global Constraints

- Folder Drive tepat sesuai konfigurasi; tidak menulis data operasional ke GitHub.
- Tidak ada email teknisi; pemeriksaan/foto hanya mengikuti bagian aktif.
- Tidak mengubah kalibrasi/resection alat atau sharing Drive.
- Helper RPC berakhiran `_`; secret hanya Script Properties.

## Review Focus

- Retry setelah Drive sebagian tersimpan tidak membuat inspeksi ganda.
- N/A tidak membawa temuan lama yang tersembunyi.
- Kunci laporan/PIN/password salah tidak membaca riwayat atau foto.
- Angka dan tanggal tidak valid ditolak; nilai kosong bukan nol.
- Input HTML/formula tidak dieksekusi pada UI/CSV.

## Tasks

1. Schema + validation: tes Radar/RTS, status N/A, foto, temuan, pembacaan, tanggal, CSV; implementasikan validator bersama backend/frontend.
2. Drive + auth + API: tes transaksi/retry, laporan sendiri, admin, sesi, pagination; implementasikan storage dengan commit marker dan lock.
3. Frontend: wizard responsif, kompres foto, draft lokal jawaban, retry ID tetap, hasil/CSV/print, admin/filter/detail/photo/export.
4. Delivery: deployment guide tanpa terminal, manifest, CI, syntax/tests; commit source ke main dengan parent SHA yang diverifikasi dan tanpa force push.
