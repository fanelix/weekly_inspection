# API Vercel

`GET /api/rpc` mengembalikan bootstrap: schema Radar/RTS, batas foto, tiket form, dan flags konfigurasi. Flags menunjukkan environment variables tersedia, bukan bukti OAuth aktif.

`POST /api/rpc` memakai JSON `{ "method": "...", "payload": {} }`, origin aplikasi yang diizinkan, dan maksimal 2 MB body. Frontend menggunakan cookie same-origin; API tidak membuka CORS lintas situs. Respons sukses `ok: true`, kegagalan `ok: false` dengan `message` dan opsional `errors` per field.

| Method | Otorisasi dan kegunaan |
| --- | --- |
| `getBootstrap` | Schema/configuration flags tanpa secret |
| `listRadars` | Tiket bootstrap; daftar radar tambahan dari folder Radar (`radar-registry-<ID>.json`) |
| `addRadar` | Tiket bootstrap + PIN opsional; ID dinormalisasi (kapital, 2–24 karakter), duplikat memilih entri yang ada, maksimal 100 radar tambahan |
| `allocateInspection` | Tiket bootstrap + PIN opsional; validasi jawaban dan metadata foto, alokasi ID Drive, belum menulis file |
| `beginInspection` | Tiket upload; verifikasi jawaban sama, buat folder dan pending dengan ID tetap |
| `uploadInspectionPhoto` | Tiket upload; satu foto base64, signature/type/size/SHA-256 cocok alokasi |
| `commitInspection` | Tiket upload; periksa foto, CSV, lalu manifest lengkap paling akhir |
| `getInspection` | Kunci bukti pengiriman sendiri, atau cookie admin dengan marker `token` |
| `getInspectionPhoto` | Otorisasi laporan dan batas parent, ukuran serta digest foto baru |
| `loginAdmin` | Tiket bootstrap + password; cookie HttpOnly, respons marker `cookie` tanpa token sesi |
| `logoutAdmin` | Cookie admin; hapus cookie browser |
| `listInspections` | Cookie admin; filter tanggal/unit/kondisi dan cursor terikat filter |
| `checkStorage` | Cookie admin; akses OAuth aktual serta metadata folder root/Radar/RTS |

Tiket bootstrap berlaku 15 menit, upload 24 jam, cookie admin 1 jam. Nama helper server bukan method publik. Retry memakai upload ticket dan ID yang sama; pengubahan isi membutuhkan inspeksi baru. Laporan Apps Script lama menggunakan UUID dan tetap dapat ditemukan berdasarkan nama folder.

Radar tambahan hanya menambah file kecil `radar-registry-<ID>.json` di folder Radar; file itu bukan folder laporan sehingga tidak muncul di riwayat. ID radar yang tidak ada di daftar bawaan divalidasi terhadap registry saat `allocateInspection` dan `beginInspection`.

Tidak ada endpoint delete, rename, perubahan sharing, atau akses file arbitrer. Pengujian API dan transaksi ada pada `tests/vercel-api.test.mjs` dan `tests/vercel.test.mjs`.
