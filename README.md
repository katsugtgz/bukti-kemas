# Bukti Kemas

Aplikasi web bukti packing. Satu orang, satu kamera: scan resi, rekam video, stempel resi dan jam ke dalam gambar, simpan di komputer sendiri. Tanpa akun, tanpa cloud, tanpa biaya.

**v0.1.0 baru scaffold.** Scan, kamera, suara, dan simpan folder belum jalan. Jangan pakai rilis ini untuk sengketa marketplace.

Lisensi [AGPL-3.0](LICENSE). Aplikasi yang di-host wajib menaut ke [kode sumber](https://github.com/katsugtgz/bukti-kemas).

## Untuk siapa

PC gudang di Chrome, Edge, atau Brave. Itu jalur lengkap: pilih folder, video masuk ke disk.

Firefox dan Safari tetap bisa dipakai nanti, lewat unduh, bukan tulis folder. HP hanya darurat. Bukan aplikasi Android.

Buka lewat `https://` atau `http://localhost`. `file://` tidak bisa, karena kamera dan pemilih folder butuh konteks aman.

## Jalankan

Perlu Node.js 22 dan pnpm.

```bash
pnpm install
pnpm dev
```

Buka `http://localhost:5173`.

```bash
pnpm test
pnpm typecheck
pnpm build
```

## Status v1

`v1.0.0` baru ditag setelah scan USB mulai dan berhenti, scan kamera mulai, suara menyala, stempel kelihatan di frame, file masuk folder di Chrome desktop, unduh jalan di Firefox, resi ganda ditolak, cari-putar-unduh jalan, dan README ini plus lisensi AGPL tetap ada.

Spesifikasi v1 ada di issue berlabel `ready-for-agent`.

## Di luar v1

Akun, login, server wajib, unggah cloud, telemetri, integrasi Shopee/TikTok/Lazada, mode unboxing, banyak stasiun, PIN packer, GPS, dan tebakan kurir dari bentuk resi.

---

# Bukti Kemas

Web app for packing proof. One person, one camera: scan a receipt, record, burn the receipt and the clock into the frame, save the file on your own computer. No account, no cloud, no fee.

**v0.1.0 is a scaffold.** Scan, camera, voice, and folder save are not implemented. Do not use this release as marketplace evidence.

Licensed [AGPL-3.0](LICENSE). A hosted copy must link to the [source](https://github.com/katsugtgz/bukti-kemas).

## Who it is for

A packing PC on Chrome, Edge, or Brave. That is the full path: pick a folder, the video lands on disk.

Firefox and Safari will record later and download the file. They cannot write a user folder. A phone is an emergency preview, not the daily tool. This is not an Android app.

Open it over `https://` or `http://localhost`. `file://` cannot open the camera or the folder picker.

## Run

Node.js 22 and pnpm.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173`.

```bash
pnpm test
pnpm typecheck
pnpm build
```

## v1 status

`v1.0.0` is tagged only after USB scan starts and stops a clip, camera scan starts a clip, voice plays, the stamp is visible inside the saved frame, Chrome desktop writes the folder, Firefox can download, a duplicate receipt is rejected, search-play-download works, and this README plus the AGPL license are still in the repo.

The v1 spec is the GitHub issue labelled `ready-for-agent`.

## Out of v1

Accounts, login, a required server, cloud upload, telemetry, Shopee/TikTok/Lazada integration, unboxing mode, multi-station, a packer PIN, GPS, and guessing the courier from the receipt shape.
