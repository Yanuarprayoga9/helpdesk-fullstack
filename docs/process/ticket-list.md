# 📄 Ticket Query - `findMany` with Filters and Relations

Dokumentasi ini menjelaskan penggunaan query Prisma untuk mengambil daftar tiket dari database dengan berbagai filter dan relasi yang disertakan.

---

## 🔍 Deskripsi

Fungsi ini digunakan untuk mengambil semua data tiket (`Ticket`) dari database yang **tidak dihapus** (`deleted: false`), dengan fitur pencarian, filter, dan relasi yang fleksibel. Data yang dikembalikan mencakup informasi seperti kategori, pembuat tiket, prioritas, status, dan proyek terkait.

---

## 📅 Parameter (dari context/fungsi pemanggil)

| Parameter      | Tipe       | Deskripsi                                                         |
| -------------- | ---------- | ----------------------------------------------------------------- |
| `search`       | `string?`  | Kata kunci pencarian berdasarkan `title` atau `description` tiket |
| `assignedToMe` | `boolean?` | Menyaring tiket yang ditugaskan kepada `createdById`              |
| `categoryId`   | `string?`  | Filter berdasarkan ID kategori                                    |
| `createdById`  | `string?`  | Filter berdasarkan ID pembuat tiket                               |
| `projectId`    | `string?`  | Filter berdasarkan ID proyek                                      |
| `priority`     | `string?`  | Filter berdasarkan nama prioritas                                 |
| `status`       | `string?`  | Filter berdasarkan nama status                                    |
| `category`     | `string?`  | Filter berdasarkan nama kategori                                  |
| `orderBy`      | `object`   | Objek Prisma `orderBy` untuk pengurutan hasil                     |

---

## ⚙️ Prisma Query

### Fungsi Utama

```ts
const tickets = await prisma.ticket.findMany({
  where: {
    deleted: false,
    ...(search && {
      OR: [
        {
          title: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
      ],
    }),
    ...(assignedToMe && {
      assignees: {
        some: {
          userId: createdById,
          deleted: false,
        },
      },
    }),
    ...(categoryId && { categoryId }),
    ...(createdById && { createdById }),
    ...(projectId && { projectId }),
    ...(priority && { priority: { name: { contains: priority } } }),
    ...(status && { status: { name: { contains: status } } }),
    ...(category && { category: { name: { contains: category } } }),
  },
  orderBy: orderBy,
  include: {
    category: {
      select: {
        name: true,
      },
    },
    createdBy: {
      select: {
        id: true,
        name: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    },
    priority: {
      select: {
        color: true,
        name: true,
      },
    },
    status: {
      select: {
        name: true,
        color: true,
      },
    },
    project: true,
  },
});
```

---

## 📤 Contoh Hasil Output

```json
[
  {
    "id": "uuid-123",
    "title": "Error saat login",
    "description": "Terjadi error 500",
    "category": { "name": "Bug" },
    "createdBy": {
      "id": "user-001",
      "name": "Ahmad Saifudin",
      "role": { "name": "Developer" }
    },
    "priority": { "name": "High", "color": "red" },
    "status": { "name": "Open", "color": "green" },
    "project": { ... }
  },
  ...
]
```

---

## ✅ Catatan

* **Dynamic filter** digunakan dengan menyebar kondisi opsional menggunakan `...(condition && { key: value })`.
* Parameter seperti `priority`, `status`, dan `category` disaring berdasarkan **`contains`**, sehingga pencarian tidak bersifat persis (case-insensitive partial match).
* Gunakan parameter `orderBy` untuk mengurutkan berdasarkan field tertentu, contoh:

  ```ts
  orderBy: { createdAt: "desc" }
  ```

---

## 📦 Kebutuhan

* Prisma v4+
* Model `Ticket` dengan relasi ke `Category`, `User`, `Role`, `Priority`, `Status`, dan `Project`

---

Jika ingin ditambahkan juga definisi model Prisma untuk `Ticket`, silakan beri tahu.
