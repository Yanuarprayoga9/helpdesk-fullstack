# Dokumentasi Lengkap Prisma Operations

## 1. Query Operations (Read)

| Operation | Deskripsi | Contoh Penggunaan |
|-----------|-----------|-------------------|
| `findUnique()` | Mencari satu record berdasarkan field unique | `await prisma.user.findUnique({ where: { id: 1 } })` |
| `findUniqueOrThrow()` | Seperti findUnique tapi throw error jika tidak ditemukan | `await prisma.user.findUniqueOrThrow({ where: { id: 1 } })` |
| `findFirst()` | Mencari record pertama yang cocok dengan kondisi | `await prisma.user.findFirst({ where: { email: { contains: "@gmail" } } })` |
| `findFirstOrThrow()` | Seperti findFirst tapi throw error jika tidak ditemukan | `await prisma.user.findFirstOrThrow({ where: { active: true } })` |
| `findMany()` | Mencari banyak record | `await prisma.user.findMany({ where: { age: { gte: 18 } } })` |
| `count()` | Menghitung jumlah record | `await prisma.user.count({ where: { active: true } })` |
| `aggregate()` | Melakukan agregasi data | `await prisma.user.aggregate({ _avg: { age: true } })` |
| `groupBy()` | Mengelompokkan data | `await prisma.user.groupBy({ by: ['role'], _count: true })` |

## 2. Write Operations (Create, Update, Delete)

| Operation | Deskripsi | Contoh Penggunaan |
|-----------|-----------|-------------------|
| `create()` | Membuat record baru | `await prisma.user.create({ data: { name: "John", email: "john@example.com" } })` |
| `createMany()` | Membuat banyak record sekaligus | `await prisma.user.createMany({ data: [{ name: "A" }, { name: "B" }] })` |
| `update()` | Update satu record | `await prisma.user.update({ where: { id: 1 }, data: { name: "Updated" } })` |
| `updateMany()` | Update banyak record | `await prisma.user.updateMany({ where: { active: false }, data: { active: true } })` |
| `upsert()` | Update jika ada, create jika tidak ada | `await prisma.user.upsert({ where: { email: "test@example.com" }, update: { name: "Updated" }, create: { name: "New", email: "test@example.com" } })` |
| `delete()` | Hapus satu record | `await prisma.user.delete({ where: { id: 1 } })` |
| `deleteMany()` | Hapus banyak record | `await prisma.user.deleteMany({ where: { active: false } })` |

## 3. Select Operations

| Select Option | Deskripsi | Contoh Penggunaan |
|---------------|-----------|-------------------|
| `select` | Pilih field tertentu | `await prisma.user.findMany({ select: { name: true, email: true } })` |
| `include` | Sertakan relasi | `await prisma.user.findMany({ include: { posts: true } })` |
| `distinct` | Nilai unik saja | `await prisma.user.findMany({ distinct: ['role'] })` |
| Nested select | Select field dalam relasi | `await prisma.user.findMany({ select: { name: true, posts: { select: { title: true } } } })` |

## 4. Where Conditions

| Condition | Deskripsi | Contoh Penggunaan |
|-----------|-----------|-------------------|
| `equals` | Sama dengan | `{ where: { name: "John" } }` atau `{ where: { name: { equals: "John" } } }` |
| `not` | Tidak sama dengan | `{ where: { name: { not: "John" } } }` |
| `in` | Dalam array | `{ where: { id: { in: [1, 2, 3] } } }` |
| `notIn` | Tidak dalam array | `{ where: { id: { notIn: [1, 2, 3] } } }` |
| `lt` | Kurang dari | `{ where: { age: { lt: 25 } } }` |
| `lte` | Kurang dari atau sama dengan | `{ where: { age: { lte: 25 } } }` |
| `gt` | Lebih dari | `{ where: { age: { gt: 18 } } }` |
| `gte` | Lebih dari atau sama dengan | `{ where: { age: { gte: 18 } } }` |
| `contains` | Mengandung string | `{ where: { name: { contains: "John" } } }` |
| `startsWith` | Dimulai dengan | `{ where: { name: { startsWith: "J" } } }` |
| `endsWith` | Diakhiri dengan | `{ where: { name: { endsWith: "n" } } }` |
| `AND` | Kondisi AND | `{ where: { AND: [{ age: { gt: 18 } }, { active: true }] } }` |
| `OR` | Kondisi OR | `{ where: { OR: [{ name: "John" }, { name: "Jane" }] } }` |
| `NOT` | Kondisi NOT | `{ where: { NOT: { name: "John" } } }` |

## 5. Ordering & Pagination

| Option | Deskripsi | Contoh Penggunaan |
|--------|-----------|-------------------|
| `orderBy` | Mengurutkan | `await prisma.user.findMany({ orderBy: { name: 'asc' } })` |
| Multiple orderBy | Urutan berganda | `await prisma.user.findMany({ orderBy: [{ name: 'asc' }, { age: 'desc' }] })` |
| `skip` | Lewati record | `await prisma.user.findMany({ skip: 10 })` |
| `take` | Ambil sejumlah record | `await prisma.user.findMany({ take: 5 })` |
| `cursor` | Pagination dengan cursor | `await prisma.user.findMany({ cursor: { id: 10 }, take: 5 })` |

## 6. Relasi Operations

| Operation | Deskripsi | Contoh Penggunaan |
|-----------|-----------|-------------------|
| `connect` | Menghubungkan ke record existing | `await prisma.post.create({ data: { title: "Test", author: { connect: { id: 1 } } } })` |
| `disconnect` | Memutus hubungan | `await prisma.post.update({ where: { id: 1 }, data: { author: { disconnect: true } } })` |
| `create` | Membuat record baru dan menghubungkan | `await prisma.user.create({ data: { name: "John", posts: { create: { title: "First Post" } } } })` |
| `createMany` | Membuat banyak record relasi | `await prisma.user.create({ data: { name: "John", posts: { createMany: { data: [{ title: "Post 1" }, { title: "Post 2" }] } } } })` |
| `update` | Update record relasi | `await prisma.user.update({ where: { id: 1 }, data: { posts: { update: { where: { id: 1 }, data: { title: "Updated" } } } } })` |
| `updateMany` | Update banyak record relasi | `await prisma.user.update({ where: { id: 1 }, data: { posts: { updateMany: { where: { published: false }, data: { published: true } } } } })` |
| `delete` | Hapus record relasi | `await prisma.user.update({ where: { id: 1 }, data: { posts: { delete: { id: 1 } } } })` |
| `deleteMany` | Hapus banyak record relasi | `await prisma.user.update({ where: { id: 1 }, data: { posts: { deleteMany: { published: false } } } })` |

## 7. Transactions

| Type | Deskripsi | Contoh Penggunaan |
|------|-----------|-------------------|
| Sequential | Transaksi berurutan | `await prisma.$transaction([prisma.user.create({...}), prisma.post.create({...})])` |
| Interactive | Transaksi interaktif | `await prisma.$transaction(async (tx) => { const user = await tx.user.create({...}); await tx.post.create({...}); })` |

## 8. Raw Queries

| Operation | Deskripsi | Contoh Penggunaan |
|-----------|-----------|-------------------|
| `$queryRaw` | Raw query dengan return typed | `await prisma.$queryRaw\`SELECT * FROM User WHERE age > ${18}\`` |
| `$executeRaw` | Raw query untuk operasi non-select | `await prisma.$executeRaw\`UPDATE User SET active = true WHERE id = ${1}\`` |
| `$queryRawUnsafe` | Raw query tanpa prepared statement | `await prisma.$queryRawUnsafe('SELECT * FROM User')` |

## 9. Utility Operations

| Operation | Deskripsi | Contoh Penggunaan |
|-----------|-----------|-------------------|
| `$connect()` | Koneksi manual ke database | `await prisma.$connect()` |
| `$disconnect()` | Putus koneksi dari database | `await prisma.$disconnect()` |
| `$use()` | Middleware | `prisma.$use(async (params, next) => { return next(params); })` |
| `$on()` | Event listener | `prisma.$on('query', (e) => console.log(e))` |

## 10. Aggregation Functions

| Function | Deskripsi | Contoh Penggunaan |
|----------|-----------|-------------------|
| `_count` | Menghitung | `await prisma.user.aggregate({ _count: { id: true } })` |
| `_sum` | Menjumlahkan | `await prisma.order.aggregate({ _sum: { amount: true } })` |
| `_avg` | Rata-rata | `await prisma.user.aggregate({ _avg: { age: true } })` |
| `_min` | Nilai minimum | `await prisma.user.aggregate({ _min: { age: true } })` |
| `_max` | Nilai maximum | `await prisma.user.aggregate({ _max: { age: true } })` |

## 11. Contoh Penggunaan Kompleks

### Contoh 1: Query dengan Multiple Conditions
```javascript
const users = await prisma.user.findMany({
  where: {
    AND: [
      { age: { gte: 18 } },
      { active: true },
      { 
        OR: [
          { role: 'admin' },
          { role: 'moderator' }
        ]
      }
    ]
  },
  select: {
    id: true,
    name: true,
    email: true,
    posts: {
      select: {
        title: true,
        published: true
      },
      where: { published: true }
    }
  },
  orderBy: [
    { name: 'asc' },
    { createdAt: 'desc' }
  ],
  skip: 10,
  take: 5
});
```

### Contoh 2: Nested Create dengan Relasi
```javascript
const user = await prisma.user.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
    profile: {
      create: {
        bio: "Software Developer",
        avatar: "avatar.jpg"
      }
    },
    posts: {
      create: [
        {
          title: "First Post",
          content: "Hello World",
          categories: {
            connectOrCreate: [
              {
                where: { name: "Tech" },
                create: { name: "Tech" }
              }
            ]
          }
        }
      ]
    }
  },
  include: {
    profile: true,
    posts: {
      include: {
        categories: true
      }
    }
  }
});
```

### Contoh 3: Batch Operations
```javascript
// Batch create
await prisma.user.createMany({
  data: [
    { name: "User 1", email: "user1@example.com" },
    { name: "User 2", email: "user2@example.com" },
    { name: "User 3", email: "user3@example.com" }
  ],
  skipDuplicates: true
});

// Batch update
await prisma.user.updateMany({
  where: { 
    createdAt: { 
      lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
    }
  },
  data: { active: false }
});
```

## 12. Error Handling

| Error Type | Deskripsi | Contoh Handling |
|------------|-----------|-----------------|
| `PrismaClientKnownRequestError` | Error yang diketahui | `if (error.code === 'P2002') { // Unique constraint }` |
| `PrismaClientUnknownRequestError` | Error tidak diketahui | `console.error('Unknown error:', error.message)` |
| `PrismaClientValidationError` | Error validasi | `console.error('Validation error:', error.message)` |
| `NotFoundError` | Record tidak ditemukan | `try { await findUniqueOrThrow() } catch (error) { }` |

## Tips Penggunaan

1. **Gunakan `select` untuk optimasi**: Hanya ambil field yang diperlukan
2. **Leverage `include` untuk relasi**: Lebih efisien daripada query terpisah
3. **Gunakan `findUniqueOrThrow`**: Ketika yakin record harus ada
4. **Batch operations**: Gunakan `createMany`, `updateMany` untuk performa lebih baik
5. **Transactions**: Untuk operasi yang harus atomik
6. **Indexing**: Pastikan field yang sering di-query memiliki index yang tepat