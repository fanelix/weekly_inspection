# Aktivasi web app melalui browser

> Panduan ini untuk versi Apps Script lama. Untuk versi 2 yang di-host di Vercel, gunakan [panduan Vercel](vercel-deployment.md).

## 1. Buat project Google Apps Script baru

Masuk ke [Google Apps Script](https://script.google.com/) dengan akun yang memiliki akses tulis ke folder Weekly Inspection. Buat project baru bernama **BSI Weekly Inspection — Radar & RTS**. Gunakan project baru agar Apps Script/Form yang sudah ada tidak tertimpa.

## 2. Salin tiga file bundle

1. Buka `dist/Code.gs` dari repo, salin seluruh isi ke file `Code.gs` di editor Apps Script.
2. Tambahkan file HTML bernama **Index**. Salin seluruh isi `dist/Index.html`.
3. Buka **Project Settings**, aktifkan **Show appsscript.json manifest file in editor**. Salin isi `dist/appsscript.json` ke manifest.
4. Simpan project. Tidak perlu mengaktifkan Advanced Drive API atau layanan tambahan.

## 3. Konfigurasi password admin

Pada **Project Settings → Script Properties**, tambahkan:

| Property | Isi |
| --- | --- |
| `ADMIN_PASSWORD` | Password unik minimal 12 karakter; pilih password kuat, tidak dipakai untuk akun lain. |
| `TECHNICIAN_PIN` | Opsional, minimal 6 karakter; kosong/tidak ditambahkan bila form tanpa PIN. |

Folder default sudah tepat sesuai folder yang disetujui. Jika kelak pindah folder, tambahkan `ROOT_FOLDER_ID`, `RADAR_FOLDER_ID`, `RTS_FOLDER_ID`; subfolder harus berada di dalam folder utama. Gunakan raw ID, bukan seluruh URL.

Pada editor, pilih fungsi **setup_**, lalu **Run**. Berikan izin Google Drive kepada script yang Anda buat. Fungsi memverifikasi folder dan mengganti password/PIN plaintext menjadi digest salted; property plaintext dihapus setelah berhasil. Fungsi berakhiran `_` tidak dapat dipanggil melalui frontend web app.

Untuk mengganti password, set `ADMIN_PASSWORD` baru lalu jalankan `setup_` lagi. Untuk menonaktifkan PIN teknisi, hapus `TECHNICIAN_PIN_HASH`. Jangan menghapus `PASSWORD_SALT` ketika password/hash lama masih digunakan.

## 4. Deploy

1. Klik **Deploy → New deployment**.
2. Pilih jenis **Web app**.
3. **Execute as: Me** (pemilik/deployer).
4. **Who has access: Anyone** untuk akses tanpa login Google, jika tersedia pada akun/domain.
5. Deploy dan salin URL **`/exec`** yang diberikan Google. URL `/dev` hanya untuk pengembangan/editor.

Script menggunakan izin Drive pemilik; teknisi hanya mengisi form. Akun/domain Google dapat membatasi pilihan anonymous. Jangan menurunkan kebijakan organisasi untuk melewati pembatasan; pakai pilihan akses yang diizinkan atau minta administrator domain menetapkan deployment.

## 5. Smoke test sebelum digunakan

- Buka URL `/exec` pada browser incognito/HP dan pastikan pilihan Radar/RTS tampil.
- Isi satu laporan **TEST ONLY** dan foto contoh; pilih N/A untuk komponen yang tidak benar-benar diperiksa. Jangan memakai data test sebagai laporan operasional.
- Pastikan folder UUID, foto, `inspection.csv`, dan `inspection.json` muncul di subfolder yang benar.
- Unduh ZIP dan buka CSV serta foto; periksa waktu WIB, unit, dan catatan.
- Login admin memakai password yang Anda tentukan, filter laporan test, buka detail, dan cetak/Save as PDF.
- Coba satu submission RTS dengan foto dan satu Radar; periksa validasi foto/checklist.
- Refresh form sebelum terkirim: jawaban draft dapat dipulihkan, foto perlu dilampirkan ulang.
- Periksa sharing folder Drive. Akses admin aplikasi tidak mengurangi izin Anyone with link pada folder.

Hapus/kelola laporan test melalui Drive sesuai prosedur Anda. Aplikasi tidak menyediakan penghapusan massal atau penghapusan permanen.

## 6. Hubungkan AppSheet

Setelah URL `/exec` lulus smoke test, ganti tautan menu Radar Inspection dan RTS Inspection dengan URL tersebut. Kedua jenis inspeksi dipilih pada halaman awal. Jangan mengganti menu dengan URL GitHub repo karena repo berisi source code, bukan web app produksi.

## Pembaruan versi

Ganti file bundle, lalu **Deploy → Manage deployments → Edit → New version → Deploy**. Memakai deployment yang sama mempertahankan URL `/exec`. Penggantian kode saja tidak memperbarui versi deployment yang sudah aktif.

## Masalah umum

| Pesan/gejala | Tindakan |
| --- | --- |
| Drive permission denied | Pastikan akun deployer dapat menulis folder dan jalankan setup_/otorisasi dengan akun itu. |
| Admin belum dikonfigurasi | Set ADMIN_PASSWORD, jalankan setup_, lalu deploy versi baru bila kode berubah. |
| Sesi form/admin berakhir | Login ulang atau tekan Kirim lagi; UUID dipertahankan sehingga retry tidak menggandakan laporan. |
| ID sudah digunakan dengan isi berbeda | Jangan ubah submission yang sudah dimulai. Jika memang perlu isi baru, mulai inspeksi baru dengan UUID baru. |
| Foto gagal dibuka | Gunakan JPEG/PNG/WebP yang bisa dibuka browser; HEIC bergantung dukungan browser. |
| Quota/execution time exceeded | Tunggu kuota pulih; coba UUID sama. Periksa log Apps Script dan jumlah/ukuran foto. |
| Anyone tidak tersedia | Kebijakan akun/domain membatasi anonymous; gunakan akses yang diizinkan. |
