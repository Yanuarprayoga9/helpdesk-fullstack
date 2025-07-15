# Prisma + MySQL Setup

Proyek ini menggunakan [Prisma ORM](https://www.prisma.io/) untuk manajemen database.

## 📦 Instalasi

Pastikan kamu sudah menginstall dependensi terlebih dahulu:

```bash
npm install
```

## ⚙️ Inisialisasi Prisma

Untuk memulai Prisma pertama kali:

```bash
npx prisma init
```

Perintah ini akan membuat:

* Folder `prisma/`
* File `schema.prisma`
* File `.env` untuk menyimpan konfigurasi database

---

## 🛠️ Migrasi Database (Development)

Untuk membuat dan menerapkan migrasi saat development:

```bash
npx prisma migrate dev --name <nama-migrasi>
```

Contoh:

```bash
npx prisma migrate dev --name init
```

---

## 🔄 Reset Database + Seed Data

Jika kamu ingin me-*reset* database dan langsung mengisi data dummy awal (seeding):

```bash
npx prisma migrate reset
```

> Ini akan:
>
> * Menghapus semua data
> * Menjalankan semua migrasi dari awal
> * Menjalankan script `prisma/seed.ts` atau `prisma/seed.js` secara otomatis

---

## 🌱 Menjalankan Seed Secara Manual

Jika kamu ingin menjalankan seeding secara manual (misal setelah `db push`):

```bash
npx prisma db seed
```

Pastikan kamu sudah mendefinisikan script `seed` di `package.json` seperti ini:

Untuk TypeScript:

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

Untuk JavaScript:

```json
"prisma": {
  "seed": "node prisma/seed.js"
}
```

---

## 🚪 Push Skema Tanpa Migrasi (Experimental / Dev Only)

```bash
npx prisma db push
```

> Ini akan langsung menyinkronkan skema Prisma ke database tanpa membuat migrasi.

---

## 🔍 Prisma Studio (GUI)

Untuk membuka antarmuka visual dan eksplorasi data:

```bash
npx prisma studio
```

---

## 🪰 Daftar Perintah CLI Prisma

| Perintah                    | Deskripsi                                         |
| --------------------------- | ------------------------------------------------- |
| `npx prisma init`           | Inisialisasi proyek Prisma                        |
| `npx prisma migrate dev`    | Membuat dan menerapkan migrasi saat development   |
| `npx prisma migrate reset`  | Reset database dan jalankan migrasi serta seeding |
| `npx prisma migrate deploy` | Menerapkan migrasi ke environment production      |
| `npx prisma migrate status` | Melihat status migrasi                            |
| `npx prisma db push`        | Push skema Prisma ke database tanpa migrasi       |
| `npx prisma db pull`        | Menarik struktur database ke file `schema.prisma` |
| `npx prisma db seed`        | Menjalankan seeding secara manual                 |
| `npx prisma generate`       | Generate Prisma Client dari skema                 |
| `npx prisma format`         | Memformat file `schema.prisma`                    |
| `npx prisma validate`       | Validasi file `schema.prisma`                     |
| `npx prisma studio`         | GUI visual editor untuk database                  |
| `npx prisma -v`             | Menampilkan versi Prisma yang digunakan           |
| `npx prisma --help`         | Menampilkan semua perintah yang tersedia          |

---

## 📚 Dokumentasi

* [Prisma Docs](https://www.prisma.io/docs)
* [CLI Reference](https://www.prisma.io/docs/reference/api-reference/command-reference)
