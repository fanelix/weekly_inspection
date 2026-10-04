# Weekly Inspection — Radar dan RTS

Aplikasi inspeksi mingguan untuk field technician BSI. Teknisi memasukkan nama, waktu WIB, unit, lokasi, checklist, pembacaan aktual, catatan, dan foto; tidak ada kolom email. Kode backend dan frontend berada di `fanelix/weekly_inspection`.

## Arsitektur

Google Apps Script V8 menyediakan backend dan HTML Service menyediakan frontend responsif. `google.script.run` memanggil backend tanpa server tambahan atau kredensial Google di browser. Web app dijalankan sebagai pemilik saat deployment; pemilik perlu melakukan otorisasi Google sekali. Apps Script dipilih dibanding server Node + OAuth karena kebutuhan penyimpanan langsung di Drive dan penggunaan melalui web tanpa instalasi lokal.

Drive adalah penyimpanan utama. Folder tujuan adalah `1JoaN3UkwcEGNGo0awHsOdQgkWfvLi6hJ`, dengan subfolder Radar dan RTS yang sudah dibuat. Setiap inspeksi memiliki folder UUID, foto, CSV, dan `inspection.json` sebagai penanda transaksi lengkap. Tidak ada database atau salinan server lain yang wajib dipelihara.

## Form

Radar mempertahankan checklist SV-2248 April 2026: general, genset, controller, solar, weather sensor, trailer/container, dan temuan. Genset hanya menampilkan kondisi visual, fuel level, oil level, nomor genset, tegangan baterai, catatan, dan foto; Controller kondisi umum, kondisi laptop, dan foto; Solar kebersihan, kabel, mounting, dan foto; Weather sensor kondisi umum dan foto. Bagian tanpa kolom catatan atau foto di schema tidak mewajibkannya; temuan masalah dirangkum pada halaman Temuan. Pembacaan tidak diisi nol otomatis; satuan mengikuti display. RTS Leica TM60: alat/nivo/kebersihan, panel kelistrikan, Moxa/jaringan, solar, baterai/charge controller, dudukan/area, dan temuan. Kalibrasi/resection/restart bukan tindakan otomatis form.

Status bagian: Diperiksa, Tidak diperiksa, Tidak berlaku (N/A). Bagian yang diperiksa wajib checklist dan satu foto. Temuan atau item tidak diperiksa wajib catatan. Pilihan kondisi tidak dipilih otomatis. Data tersembunyi pada bagian N/A diabaikan. Foto tambahan temuan opsional. Maksimum foto 1 MB, total 8 MB; browser mengompres sebelum pengiriman.

## Keamanan dan transaksi

Endpoint publik hanya bootstrap, pengiriman, dan pembacaan laporan sendiri memakai kunci bukti pengiriman acak. Riwayat/filter/detail/ekspor massal memerlukan password admin dan sesi cache 1 jam. PIN teknisi opsional. Password disimpan sebagai digest salted di Script Properties, tidak di GitHub atau HTML. Semua helper backend berakhiran `_` sehingga tidak menjadi RPC publik.

Pengiriman memakai UUID dan digest payload. Lock mencegah duplikasi. Retry dengan UUID dan payload sama mengembalikan hasil yang sudah tersimpan; perubahan isi memakai UUID sama ditolak. Foto dan CSV dibuat sebelum JSON commit marker. Folder pending tidak tampil di riwayat; retry melanjutkan folder itu. CSV melindungi formula injection; UI menampilkan teks sebagai teks, bukan HTML.

Folder Drive yang diberikan saat pemeriksaan memiliki Anyone with link — Editor. Aplikasi tidak mengubah sharing. Kontrol admin aplikasi tidak mengatasi akses langsung Drive yang sudah diberikan. Pemilik dapat membatasi sharing folder melalui Drive jika diinginkan.

## Verifikasi dan batas

Tes Node menjalankan kode `.gs` dalam VM dengan implementasi Drive in-memory untuk memverifikasi transaksi, validasi, autentikasi, pagination, dan ekspor. CI memeriksa sintaks dan menjalankan suite. Deployment nyata memerlukan otorisasi/deployment pemilik Google; akses connector sesi ini tidak menjadi kredensial runtime aplikasi. Tidak ada klaim live sebelum deployment terverifikasi.
