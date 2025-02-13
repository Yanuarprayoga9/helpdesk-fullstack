-- Tabel User untuk menyimpan data pengguna
CREATE TABLE "User" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- ID unik pengguna
    "name" VARCHAR(50) NOT NULL, -- Nama pengguna
    "email" VARCHAR(50) UNIQUE NOT NULL, -- Email pengguna (unik)
    "createdAt" TIMESTAMP DEFAULT NOW(), -- Waktu pembuatan akun
    "updatedAt" TIMESTAMP DEFAULT NOW() -- Waktu terakhir diperbarui
);

-- Tabel Role untuk menyimpan peran pengguna
CREATE TABLE "Role" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- ID unik peran
    "name" VARCHAR(20) UNIQUE NOT NULL -- Nama peran (unik)
);

-- Tabel UserRole untuk relasi many-to-many antara User dan Role
CREATE TABLE "UserRole" (
    "userId" UUID NOT NULL, -- ID pengguna
    "roleId" UUID NOT NULL, -- ID peran
    PRIMARY KEY ("userId", "roleId"),
    FOREIGN KEY ("userId") REFERENCES "User"("id"),
    FOREIGN KEY ("roleId") REFERENCES "Role"("id")
);

-- Tabel Category untuk menyimpan kategori tiket
CREATE TABLE "Category" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- ID unik kategori
    "name" VARCHAR(100) UNIQUE NOT NULL, -- Nama kategori (unik)
    "createdAt" TIMESTAMP DEFAULT NOW(), -- Waktu pembuatan
    "updatedAt" TIMESTAMP DEFAULT NOW() -- Waktu terakhir diperbarui
);

-- Tabel Priority untuk menyimpan tingkat prioritas tiket
CREATE TABLE "Priority" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- ID unik prioritas
    "name" VARCHAR(20) UNIQUE NOT NULL -- Nama prioritas (unik)
);

-- Tabel Status untuk menyimpan status tiket
CREATE TABLE "Status" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- ID unik status
    "name" VARCHAR(20) UNIQUE NOT NULL -- Nama status (unik)
);

-- Tabel Ticket untuk menyimpan data tiket
CREATE TABLE "Ticket" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- ID unik tiket
    "title" VARCHAR(50) NOT NULL, -- Judul tiket
    "description" TEXT NOT NULL, -- Deskripsi tiket
    "priorityId" UUID NOT NULL, -- ID prioritas tiket
    "statusId" UUID, -- ID status tiket (opsional)
    "createdById" UUID NOT NULL, -- ID pengguna yang membuat tiket
    "assignedById" UUID, -- ID pengguna yang ditugaskan tiket (opsional)
    "categoryId" UUID, -- ID kategori tiket (opsional)
    "createdAt" TIMESTAMP DEFAULT NOW(), -- Waktu pembuatan tiket
    "updatedAt" TIMESTAMP DEFAULT NOW(), -- Waktu terakhir diperbarui
    FOREIGN KEY ("priorityId") REFERENCES "Priority"("id"),
    FOREIGN KEY ("statusId") REFERENCES "Status"("id"),
    FOREIGN KEY ("createdById") REFERENCES "User"("id"),
    FOREIGN KEY ("assignedById") REFERENCES "User"("id"),
    FOREIGN KEY ("categoryId") REFERENCES "Category"("id")
);

-- Tabel TicketAssignee untuk menyimpan pengguna yang ditugaskan ke tiket
CREATE TABLE "TicketAssignee" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- ID unik
    "ticketId" UUID NOT NULL, -- ID tiket
    "userId" UUID NOT NULL, -- ID pengguna yang ditugaskan
    "assignedAt" TIMESTAMP DEFAULT NOW(), -- Waktu penugasan
    UNIQUE ("ticketId", "userId"),
    FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id"),
    FOREIGN KEY ("userId") REFERENCES "User"("id")
);

-- Tabel TicketHistory untuk menyimpan riwayat perubahan status tiket
CREATE TABLE "TicketHistory" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- ID unik
    "ticketId" UUID NOT NULL, -- ID tiket
    "changedById" UUID, -- ID pengguna yang mengubah status (opsional)
    "oldStatus" VARCHAR(20) NOT NULL, -- Status lama tiket
    "newStatus" VARCHAR(20) NOT NULL, -- Status baru tiket
    "changeNotes" TEXT, -- Catatan perubahan (opsional)
    "changedAt" TIMESTAMP DEFAULT NOW(), -- Waktu perubahan status
    FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id"),
    FOREIGN KEY ("changedById") REFERENCES "User"("id")
);

-- Tabel TicketComment untuk menyimpan komentar pada tiket
CREATE TABLE "TicketComment" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- ID unik komentar
    "ticketId" UUID NOT NULL, -- ID tiket terkait
    "userId" UUID NOT NULL, -- ID pengguna yang mengomentari
    "comment" TEXT NOT NULL, -- Isi komentar
    "imageUrl" VARCHAR(255), -- URL gambar terkait komentar (opsional)
    "createdAt" TIMESTAMP DEFAULT NOW(), -- Waktu komentar dibuat
    "parentCommentId" UUID, -- ID komentar induk jika ini adalah balasan (opsional)
    FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id"),
    FOREIGN KEY ("userId") REFERENCES "User"("id"),
    FOREIGN KEY ("parentCommentId") REFERENCES "TicketComment"("id")
);

-- Tabel TicketFeedback untuk menyimpan umpan balik pada tiket
CREATE TABLE "TicketFeedback" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- ID unik umpan balik
    "ticketId" UUID NOT NULL, -- ID tiket terkait
    "userId" UUID NOT NULL, -- ID pengguna yang memberi umpan balik
    "rating" INT DEFAULT 0, -- Rating umpan balik (default 0)
    "feedback" TEXT, -- Isi umpan balik (opsional)
    "submittedAt" TIMESTAMP DEFAULT NOW(), -- Waktu pengiriman umpan balik
    FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id"),
    FOREIGN KEY ("userId") REFERENCES "User"("id")
);
