# Migrasi Weekly Inspection ke Vercel

Tujuan pengguna: memakai tema BSI pada https://claude.ai/artifact/13eT27KS9MeTnWVxQAwoBW, menjalankan frontend dan backend melalui Vercel, mempertahankan Radar/RTS Leica TM60, dan menyimpan foto/laporan dalam folder Drive yang sudah disetujui.

## Desain

Frontend HTML/CSS/JavaScript ringan memakai token referensi: header navy #224882, strip #c6e1c5, kolom #f3f3f3, panel putih, sudut siku, Roboto/system-ui, kontrol 48px, tema terang/gelap. Bahasa Indonesia, angka Indonesia, nama field technician tanpa email. Checklist dan pilihan yang disimpan tetap mengikuti schema yang sudah disetujui; tema tidak menambah ambang alat atau data dashboard contoh.

Vercel menyediakan satu fungsi Node.js 24 pada /api/rpc. API Drive dipanggil hanya dari server dengan OAuth client ID, client secret, dan refresh token pemilik yang disimpan sebagai environment variables. Tidak ada kredensial Google di frontend/repo. OAuth diperlukan karena folder berada di My Drive dan service account tidak memiliki kuota untuk memiliki file. Apps Script lama tetap tersedia sebagai versi terdahulu, tetapi bukan dependensi aplikasi Vercel.

Tidak memakai database/cache eksternal. Drive adalah penyimpanan laporan. Untuk transaksi baru, server meminta file IDs dari Drive sebelum penulisan; frontend menyimpan alokasi yang ditandatangani sebelum memulai upload. ID folder menjadi ID inspeksi baru. Semua retry memakai file IDs sama; benturan create 409 dibaca kembali dan diverifikasi, sehingga konkurensi tidak menghasilkan file/folder kedua. UUID laporan Apps Script tetap dapat dibaca melalui pencarian folder lama.

Upload satu foto per permintaan, maksimal 1 MB dan total 8 MB. Alokasi mengikat schema, jawaban normal, hash foto, key receipt, dan semua file IDs. pending.json sebelum foto; inspection.json menjadi commit marker terakhir. Laporan yang belum lengkap tidak masuk riwayat. Retry payload berubah ditolak. API memeriksa parent dan ukuran sebelum membaca foto; manifest tidak boleh menunjuk file di luar folder.

Password admin server saja; cookie HttpOnly, Secure, SameSite=Strict berdurasi satu jam. Cookie logout dihapus; token stateless yang dicuri dapat bertahan sampai kedaluwarsa. Rotasi APP_SECRET membatalkan semua sesi. PIN teknisi opsional. Tiket bootstrap 15 menit, tiket upload 24 jam. Semua request mutasi memeriksa Origin; tidak membuka CORS. Vercel Firewall dianjurkan untuk batas percobaan login lintas-instance; aplikasi tidak mengklaim counter RAM sebagai batas global.

Sebelum env Drive tersedia, frontend menyatakan Drive belum terhubung dan tidak menyatakan laporan berhasil. Rahasia tidak diminta melalui chat. Deployment dan uji Drive nyata baru dinyatakan berhasil setelah koneksi pemilik dan URL produksi diverifikasi. Izin folder tetap mengikuti sharing Drive yang ada.

## Verifikasi

Tes transaksi parsial/retry simultan, foto per-request, digest/MIME, confinement, sesi/Origin, schema/CSV, kompatibilitas laporan lama, konfigurasi belum aktif, bundle deterministik. Periksa build/CI dan tampilan browser bila runtime preview tersedia; jangan mengklaim smoke test Google nyata berdasarkan adapter memori.
