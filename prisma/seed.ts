import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function main() {
  const DEFAULT_PASSWORD = process.env.PLAIN_SEED_PASSWORD as string;

  if (!DEFAULT_PASSWORD) {
    throw new Error("❌ PLAIN_SEED_PASSWORD is not set in .env");
  }

  // Seed Roles
  await prisma.role.createMany({
    data: [
      { id: '1', name: 'Developer' },
      { id: '2', name: 'DevOps' },
      { id: '3', name: 'Admin' },
      { id: '4', name: 'Project Manager' },
    ],
    skipDuplicates: true,
  });

  // Seed Categories
  await prisma.category.createMany({
    data: [
      { id: '1', name: 'Bug Sistem' },
      { id: '2', name: 'Gangguan Infrastruktur' },
      { id: '3', name: 'Permintaan Deployment' },
      { id: '4', name: 'Permintaan Perubahan' },
    ],
    skipDuplicates: true,
  });

  // Seed Projects
  await prisma.project.createMany({
    data: [
      {
        id: "proj-201",
        name: "BJB Loan Management System (Consumer)",
        imageUrl: null,
        deleted: false,
      },
      {
        id: "proj-202",
        name: "BJB Loan Management System (Commercial)",
        imageUrl: "https://placehold.co/600x400?text=BJB+Loan+System",
        deleted: false,
      },
      {
        id: "proj-203",
        name: "SATPOL PP SISAPPRA",
        imageUrl: "https://placehold.co/600x400?text=SISAPPRA",
        deleted: false,
      },
      {
        id: "proj-204",
        name: "Tripatra",
        imageUrl: "https://placehold.co/600x400?text=Tripatra",
        deleted: false,
      },
      {
        id: "proj-205",
        name: "SKK Migas DevOps",
        imageUrl: "https://placehold.co/600x400?text=SKK+Migas+DevOps",
        deleted: false,
      },
      {
        id: "proj-206",
        name: "ODOO Warehouse Management System",
        imageUrl: null,
        deleted: false,
      },
      {
        id: "proj-207",
        name: "Telkomsel Project",
        imageUrl: null,
        deleted: false,
      },
    ],
    skipDuplicates: true,
  });

  // Seed Priorities
  await prisma.priority.createMany({
    data: [
      { id: '1', name: 'Critical', color: 'red' },
      { id: '2', name: 'High', color: 'orange' },
      { id: '3', name: 'Medium', color: 'yellow' },
      { id: '4', name: 'Low', color: 'green' },
    ],
    skipDuplicates: true,
  });

  // Seed Statuses
  await prisma.status.createMany({
    data: [
      { id: '1', name: 'New', color: 'blue' },
      { id: '2', name: 'InProgress', color: 'yellow' },
      { id: '3', name: 'Resolved', color: 'green' },
      { id: '4', name: 'Reopened', color: 'purple' },
      { id: '5', name: 'Closed', color: 'gray' },
      { id: '6', name: 'OnHold', color: 'orange' },
      { id: '7', name: 'requestHelp', color: 'orange' },
    ],
    skipDuplicates: true,
  });

  const additionalUsers = [
    { id: "2025002", name: "Adrian Putra Ramadhan", email: "adrianramadhan881@tsgitdev.com", roleId: "1" },
    { id: "2222015", name: "Afmi Rurifandho", email: "afmi.ruri@tsgitdev.com", roleId: "1" },
    { id: "1122014", name: "Alfian Nahar Aswinda", email: "alfian.aswinda@gmail.com", roleId: "1" },
    { id: "1122008", name: "Alvin Syahbana", email: "dev.alvin.syahbana@tsgitdev.com", roleId: "1" },
    { id: "2222020", name: "Bagas Aji Satria", email: "bagas.aji@tsgitdev.com", roleId: "4" },
    { id: "3322004", name: "Bambang Pilu Hartato", email: "bamzato92.bp@tsgitdev.com", roleId: "1" },
    { id: "1123039", name: "Candra Purnama Alam", email: "candrapurnama@tsgitdev.com", roleId: "1" },
    { id: "3322003", name: "Daffa Arya Agusta", email: "daffa.agusta@tsgitdev.com", roleId: "1" },
    { id: "1122006", name: "Denden Raka Setiawan", email: "raka@tsgitdev.com", roleId: "1" },
    { id: "2222021", name: "Doni Hadimas Aprilian", email: "donihadimasaprilian@tsgitdev.com", roleId: "1" },
    { id: "2222002", name: "Dudung Abdussomad Toha", email: "dudung@tsgitdev.com", roleId: "3" },
    { id: "1122002", name: "Faiza Renaldi", email: "faiza.renaldi@tsgitdev.com", roleId: "3" },
    { id: "1122013", name: "Faris Raihan Hadibrata", email: "farisraihanhadibrata@tsgitdev.com", roleId: "1" },
    { id: "1122009", name: "Faskal Hasbullah Pulungan", email: "hasbullahpoel@gmail.com", roleId: "1" },
    { id: "2222005", name: "Galih Yuga Pangestu", email: "galihyuga@tsgitdev.com", roleId: "1" },
    { id: "1123030", name: "Hafiz ali Pratama", email: "Pratamahafizali@tsgitdev.com", roleId: "1" },
    { id: "1123045", name: "Ibnu Hilal Hamdi", email: "ibnuhilal@tsgitdev.com", roleId: "2" },
    { id: "2223032", name: "Ihsan Karunia Mindara", email: "ihsankarunia09@gmail.com", roleId: "1" },
    { id: "2025001", name: "Ike Sri Rahayu", email: "ikesrirahayu@tsgitdev.com", roleId: "1" },
    { id: "2222001", name: "Irma Santikarama", email: "santikaramairma@tsgitdev.com", roleId: "4" },
    { id: "3322009", name: "Irvan Ulul Azmi", email: "irvanua316@tsgitdev.com", roleId: "1" },
    { id: "1123025", name: "Juju Juhaenah Rais", email: "juju.rais77@tsgitdev.com", roleId: "4" },
    { id: "1122010", name: "Karima Siti Masna", email: "karima@tsgitdev.com", roleId: "1" },
    { id: "1123036", name: "Lidya Siti Hafsari", email: "lidyash@tsgitdev.com", roleId: "1" },
    { id: "2222007", name: "MOCH. NURUL KAFI", email: "nurulkafi18@tsgitdev.com", roleId: "1" },
    { id: "2025003", name: "Muhammad Adnan Ramadhan", email: "adnan53181@tsgitdev.com", roleId: "1" },
    { id: "1122011", name: "Muhammad Dzatul kahfi", email: "muhammad.kahfi@tsgitdev.com", roleId: "1" },
    { id: "2222009", name: "Muhammad Hasan Thoriq Almuwaffaq", email: "mhasanthoriqa@tsgitdev.com", roleId: "1" },
    { id: "3323029", name: "Muhammad Wahyu Ichsan", email: "m.wahyuikhsan14@tsgitdev.com", roleId: "1" },
    { id: "3322008", name: "Nugroho Wahid Febriyanto", email: "nugrohowahidf22@tsgitdev.com", roleId: "2" },
    { id: "1122015", name: "Putri Kurnia Handayani", email: "putrikurnia@tsgitdev.com", roleId: "3" },
    { id: "2222010", name: "Reji Pikriyansah", email: "rejipyansyah@tsgitdev.com", roleId: "1" },
    { id: "2223029", name: "Rifki Imam Abdillah", email: "rimamabdillah@tsgitdev.com", roleId: "1" },
    { id: "2222012", name: "Rinaldi Suprayoga", email: "rinaldis@tsgitdev.com", roleId: "1" },
    { id: "1122003", name: "Risma Restu Ramadina", email: "resturisma18@tsgitdev.com", roleId: "4" },
    { id: "1122005", name: "Romly S Albakir", email: "romly@tsgitdev.com", roleId: "4" },
    { id: "1123040", name: "Safrina Tri Arti", email: "Safrinata@gmail.com", roleId: "3" },
    { id: "3322007", name: "Sofyan Wanadi", email: "sofyan.wanadi@tsgitdev.com", roleId: "1" },
    { id: "2025004", name: "Yanuar Prayoga", email: "yanuarprayogat@tsgitdev.com", roleId: "1" },
    { id: "2222004", name: "Yusuf Andas Ramadhan", email: "yusufandas@tsgitdev.com", roleId: "1" },
  ];

  await prisma.user.createMany({
    data: await Promise.all(
      additionalUsers.map(async (user) => ({
        ...user,
        password: await hashPassword(DEFAULT_PASSWORD),
      }))
    ),
    skipDuplicates: true,
  });

  const tickets = [
    {
      id: 'ticket-001',
      title: "Tombol 'Tandai Semua Dibaca' tidak tampil notif saat koneksi gagal",
      description: "Klik tombol 'Tandai Semua Dibaca' saat koneksi gagal -> tidak tampil notif apapun (error/bug)",
      priorityId: '1',
      statusId: '1',
      createdById: '2025004',
      categoryId: '1',
      projectId: 'proj-101',
      backlog: 1,
      imageUrl: null,
      createdAt: new Date(),
      deleted: false,
    },
    {
      id: 'ticket-002',
      title: "Uncheck bidang keahlian hilang dari tab SME",
      description: "Uncheck bidang keahlian yang diajukan calon SME mengakibatkan pilihan tersebut hilang bukan 'ditolak' sehingga tidak ada tampilan penolakan di tab bidang keahlian",
      priorityId: '2',
      statusId: '1',
      createdById: '2025004',
      categoryId: '4',
      projectId: 'proj-201',
      backlog: 2,
      imageUrl: null,
      createdAt: new Date(),
      deleted: false,
    },
    {
      id: 'ticket-003',
      title: "Tambah role baru tidak menyimpan",
      description: "Menambahkan role baru -> klik simpan belum menyimpan pada system",
      priorityId: '2',
      statusId: '1',
      createdById: '2025004',
      categoryId: '4',
      projectId: 'proj-201',
      backlog: 3,
      imageUrl: null,
      createdAt: new Date(),
      deleted: false,
    },
    {
      id: 'ticket-004',
      title: "Dokumen tab 'Terbaru' tidak sesuai urutan waktu unggah",
      description: "Klik tab 'Terbaru' menampilkan dokumen berdasarkan waktu unggah -> Dokumen ditampilkan berdasarkan urutan waktu unggah terbaru ke terlama. saat ini masih belum diurutkan sesuai Waktu",
      priorityId: '3',
      statusId: '1',
      createdById: '2025004',
      categoryId: '1',
      projectId: 'proj-201',
      backlog: 4,
      imageUrl: null,
      createdAt: new Date(),
      deleted: false,
    },
    {
      id: 'ticket-005',
      title: "Tombol 'Tandai Semua Dibaca' gagal koneksi",
      description: "Klik tombol 'Tandai Semua Dibaca' saat koneksi gagal -> tidak tampil notif apapun",
      priorityId: '1',
      statusId: '1',
      createdById: '2025004',
      categoryId: '1',
      projectId: 'proj-201',
      backlog: 5,
      imageUrl: null,
      createdAt: new Date(),
      deleted: false,
    },
  ];

  try {
    await prisma.ticket.createMany({
      data: tickets,
      skipDuplicates: true,
    });
    console.log("✅ Ticket seeding berhasil");
  } catch (error) {
    console.error("❌ Gagal seeding ticket:", error);
  }



  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
