# Backend API

Transport adalah Google Apps Script HTML Service RPC (`google.script.run`). Semua response publik mengikuti `{ok: true, ...}` atau `{ok: false, message, errors?}`. Helper berakhiran `_` bukan endpoint publik.

| Method | Request | Response sukses |
| --- | --- | --- |
| `getBootstrap()` | — | schema Radar/RTS, batas foto, versi, `pinRequired`, ticket 15 menit |
| `saveInspection(request)` | `{type, id, receiptKey, ticket, pin?, answers, photos}` | `{id, type, savedAt, duplicate?}` |
| `getInspection(request)` | `{type, id, key}` atau `{type, id, token}` | `{record, csv}` |
| `getInspectionPhoto(request)` | `{type, id, field, key}` atau admin `token` | `{type, name, data}` base64 |
| `loginAdmin(request)` | `{password, ticket}` | `{token}` sesi 1 jam |
| `logoutAdmin(request)` | `{token}` | `{ok: true}` |
| `listInspections(request)` | `{token, type, cursor?, from?, to?, unit?, status?}` | `{items, nextCursor, skipped}` |

`type` hanya `RADAR` atau `RTS`. `id` UUID v4. `receiptKey` 64 hex acak dari Web Crypto, dikirim hanya kepada backend dan hanya digest disimpan di Drive. `photos` berisi `{field, type, data}` dengan base64 tanpa awalan data URL. Field foto harus tepat dari schema dan tidak boleh duplikat. Foto bagian N/A tidak disimpan.

`saveInspection` memvalidasi seluruh payload sebelum menulis. `pending.json` mengunci digest jawaban/foto untuk UUID itu. Sesudah foto dan CSV selesai, `inspection.json` menjadi commit marker. Retry hanya diizinkan dengan UUID, receipt key, dan payload identik. Laporan tersimpan bersifat immutable; koreksi dilakukan sebagai laporan baru.

`getInspection` dan photo menelusuri folder terkonfigurasi, bukan menerima arbitrary Drive file ID dari client. Response tidak memuat password, receipt digest, fingerprint, atau ID file foto internal. Riwayat hanya berisi laporan yang sudah memiliki commit marker.

Riwayat mengolah maksimum 100 folder dan menghasilkan maksimum 30 item per call; `nextCursor` digunakan untuk melanjutkan. Filter rentang tanggal menggunakan tanggal inspeksi WIB, bukan tanggal file dibuat. Pengurutan terbaru berlaku pada data yang sudah dimuat. `skipped` menghitung data rusak, bukan pending folder.
