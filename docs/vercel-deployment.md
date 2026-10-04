# Deploy Weekly Inspection di Vercel

Versi 2 menjalankan frontend dan backend Node.js melalui Vercel. Apps Script tidak dibutuhkan untuk versi ini. Google Drive tetap menjadi penyimpanan utama. Laporan UUID dari versi Apps Script tetap dapat dibaca.

## 1. Import GitHub

Di dashboard Vercel, pilih **Add New → Project → Import** repository `fanelix/weekly_inspection`.

| Pengaturan | Nilai |
| --- | --- |
| Framework preset | Other |
| Root directory | Root repo, kosong/default |
| Node.js | 24.x |
| Build command | `npm run build` |
| Output directory | `public` |
| Install command | `npm install --ignore-scripts` |

`vercel.json` sudah mengatur build, fungsi `/api/rpc`, batas durasi 300 detik, serta security headers. Deploy dari `main`. Tampilan dapat diterbitkan sebelum OAuth tersedia, tetapi aplikasi akan menyatakan Drive belum terhubung dan pengiriman akan ditolak sampai env lengkap.

## 2. Environment Variables

Tambahkan pada **Project → Settings → Environment Variables** untuk environment produksi. Isi langsung dalam Vercel; jangan kirim secret melalui chat, jangan commit `.env.local`.

| Nama | Isi |
| --- | --- |
| `APP_SECRET` | Secret acak minimal 32 karakter, dianjurkan 64 karakter acak; gunakan password generator tepercaya. |
| `ADMIN_PASSWORD` | Password admin unik, minimal 12 karakter. |
| `GOOGLE_CLIENT_ID` | Client ID OAuth milik project Google Cloud Anda. |
| `GOOGLE_CLIENT_SECRET` | Client secret pasangan client ID tersebut. |
| `GOOGLE_REFRESH_TOKEN` | Refresh token OAuth dari akun yang memiliki akses folder Drive. |
| `APP_ORIGIN` | Origin URL produksi Vercel atau custom domain, misalnya `https://nama-project.vercel.app`, tanpa path. |
| `TECHNICIAN_PIN` | Opsional: PIN tim agar pengiriman tidak terbuka untuk semua orang. |

Folder sudah terkonfigurasi dalam server:

- Root: `1JoaN3UkwcEGNGo0awHsOdQgkWfvLi6hJ`.
- Radar: `1Hy712mdHN7nc9vl0qlvp7767mZ94mzkj`.
- RTS: `1doqkhGxYICXQJeRpLmtyc1mZl5olgMzt`.

Bila pindah, isi `ROOT_FOLDER_ID`, `RADAR_FOLDER_ID`, `RTS_FOLDER_ID`. Subfolder harus merupakan anak langsung root, dan akun OAuth harus dapat menulisnya. Backend tidak mengubah sharing.

`VERCEL_URL` otomatis menjadi origin tambahan yang diizinkan untuk deployment itu. `APP_ORIGIN` tetap perlu untuk alias/custom domain produksi. Jangan memakai secret produksi pada preview dari kontribusi yang tidak tepercaya.

## 3. OAuth Drive pemilik melalui browser

1. Buka [Google Cloud Console](https://console.cloud.google.com/), buat/pilih project dan aktifkan **Google Drive API**.
2. Pada **Google Auth Platform**, konfigurasi Branding/Audience sesuai akun/domain. Gunakan aplikasi Internal bila tersedia dan sesuai organisasi. Bila menggunakan External + Testing, tambahkan akun pemilik sebagai test user. Refresh token untuk mode Testing dengan scope Drive umumnya kedaluwarsa setelah tujuh hari; ikuti aturan Google untuk produksi/internal yang sesuai sebelum operasi rutin.
3. Buat client OAuth jenis **Web application**. Untuk membuat refresh token lewat browser menggunakan [Google OAuth Playground](https://developers.google.com/oauthplayground), tambahkan authorized redirect URI tepat `https://developers.google.com/oauthplayground`.
4. Di OAuth Playground, buka pengaturan (ikon roda gigi), centang **Use your own OAuth credentials**, lalu masukkan client ID dan client secret milik Anda. Pilih **Access type: Offline** dan **Force prompt: Consent** bila tersedia.
5. Pada langkah 1, masukkan scope `https://www.googleapis.com/auth/drive`, pilih **Authorize APIs**, lalu otorisasi dengan akun pemilik folder. Ini izin akun pemilik, bukan akun teknisi.
6. Pada langkah 2, pilih **Exchange authorization code for tokens**. Salin **Refresh token** langsung ke environment variable `GOOGLE_REFRESH_TOKEN` di Vercel. Access token sementara tidak perlu disalin; backend memperbaruinya otomatis.
7. Simpan `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET` pada Vercel dengan pasangan yang sama. Jangan membagikan tangkapan layar token/secret.

Akses Drive melalui ChatGPT tidak secara otomatis menjadi kredensial runtime Vercel. Service account tanpa impersonation tidak digunakan untuk My Drive: service account tidak memiliki storage quota dan tidak dapat memiliki file. Backend membatasi operasi ke folder konfigurasi, meskipun scope OAuth Drive pemilik lebih luas.

## 4. Redeploy setelah env berubah

Buka **Deployments → deployment terakhir → Redeploy**. Periksa URL hasil deployment dan pastikan pesan Drive belum terhubung hilang. Jika pesan tetap ada, periksa keenam env wajib dan environment Production.

## 5. Uji sebelum digunakan tim

1. Buka URL produksi pada HP/incognito. Form Radar dan RTS tampil; email tidak diminta.
2. Uji mode terang/gelap, perpindahan bagian, kamera/galeri, dan pesan field wajib.
3. Kirim laporan `TEST ONLY` dengan foto contoh; gunakan N/A untuk bagian yang tidak benar-benar diperiksa.
4. Pastikan folder ID inspeksi, `pending.json`, foto, `inspection.csv`, dan `inspection.json` muncul di subfolder yang benar. `inspection.json` menandai laporan lengkap.
5. Unduh CSV/ZIP, tampilkan foto, dan cetak/PDF. Login admin, periksa filter dan halaman riwayat.
6. Uji Radar dan RTS. Baca ulang laporan Apps Script lama bila tersedia.
7. Coba Kirim lagi dengan transaksi sama setelah koneksi terputus: IDs tetap, file tidak digandakan. Pengubahan jawaban/foto setelah transaksi dimulai perlu inspeksi baru.
8. Kelola laporan test langsung dari Drive menurut prosedur site. Aplikasi tidak memiliki endpoint delete.

## Batas yang perlu diketahui

- Foto 1 MB/foto dan 8 MB total; dikirim satu per request, bukan semua foto sekaligus. Vercel Functions membatasi request/response 4.5 MB.
- Tiket upload berlaku 24 jam. Simpan draf pada tab yang sama. Reload mempertahankan jawaban/alokasi, tetapi foto yang belum terkirim perlu dilampirkan ulang dengan file hasil kompresi identik. Bila tidak dapat menghasilkan foto identik, mulai inspeksi baru; folder pending tidak masuk riwayat.
- Riwayat membaca halaman Drive bertahap. Tanggal terbaru berlaku pada data yang sudah dimuat; gunakan filter dan Muat halaman berikutnya.
- Cookie admin HttpOnly, Secure, SameSite=Strict, satu jam. Logout menghapus cookie di browser; token stateless yang sudah dicuri masih dapat berlaku sampai kedaluwarsa. Rotasi APP_SECRET membatalkan semua sesi/tiket, termasuk upload pending.
- Batas login dalam proses adalah best effort per-instance. Gunakan Vercel Firewall untuk membatasi percobaan lintas-instance bila app tersedia publik.
- Root Drive pada pemeriksaan awal memiliki **Anyone with link — Editor**. Password admin app tidak mengurangi akses langsung Drive. Sharing hanya diubah oleh pemilik sesuai kebutuhan.
- File internal jangan diedit. Tiket memverifikasi isi pending dan foto baru diperiksa dengan SHA-256 saat dibaca, tetapi editor Drive tetap dapat mengganti manifest/file: penyimpanan ini bukan arsip tahan perubahan.
- Tests menggunakan adapter Drive memori; tests tidak membuktikan token OAuth nyata aktif atau backend sudah dapat menulis Drive produksi.

## Pengembangan lokal

Node.js 24:

```sh
npm run build
npm run dev
```

Buka `http://localhost:4173`. Tanpa `.env.local`, form tampil dengan status Drive belum terhubung; tidak ada data yang dikirim ke Google. Salin struktur `.env.example` ke `.env.local` hanya di lingkungan aman bila menguji akun sendiri.

## Referensi resmi

- [Vercel Git deployment](https://vercel.com/docs/git)
- [Vercel Function limits](https://vercel.com/docs/functions/limitations)
- [Google Drive pre-generated IDs](https://developers.google.com/workspace/drive/api/guides/create-file)
- [OAuth refresh token](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Refresh token expiration / Testing 7 hari](https://developers.google.com/identity/protocols/oauth2#expiration)
- [Drive service account/storage constraints](https://developers.google.com/workspace/drive/api/guides/handle-errors)
