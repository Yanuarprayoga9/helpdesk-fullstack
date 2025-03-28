import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10); // Generate salt dengan 10 rounds
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function main() {
  const DEFAULT_PASSWORD = process.env.PLAIN_SEED_PASSWORD as string; // Ambil langsung dari .env
  if (!DEFAULT_PASSWORD) {
    throw new Error("❌ PLAIN_SEED_PASSWORD is not set in .env");
  }

  // Seed Roles
  const roles = await prisma.role.createMany({
    data: [
      { id: '1', name: 'Developer' },
      { id: '2', name: 'DevOps' },
      { id: '3', name: 'Admin' },
      { id: '4', name: 'Manager' },
    ],
    skipDuplicates: true,
  });

  // Seed Categories
  const categories = await prisma.category.createMany({
    data: [
      { id: '1', name: 'Bug Sistem' },
      { id: '2', name: 'Gangguan Infrastruktur' },
      { id: '3', name: 'Permintaan Deployment' },
      { id: '4', name: 'Permintaan Perubahan' },
    ],
    skipDuplicates: true,
  });
  const projects = await prisma.project.createMany({
    data: [
      {
        id: "proj-101",
        name: "Helpdesk Automation System",
        imageUrl: "https://placehold.co/600x400?text=Helpdesk+Automation",
        deleted: false,
      },
      {
        id: "proj-102",
        name: "E-commerce Platform",
        imageUrl: "https://placehold.co/600x400?text=E-commerce+Platform",
        deleted: false,
      },
      {
        id: "proj-103",
        name: "AI Chatbot Development",
        imageUrl: "https://placehold.co/600x400?text=AI+Chatbot",
        deleted: false,
      },
      {
        id: "proj-104",
        name: "DevOps Pipeline Optimization",
        imageUrl: "https://placehold.co/600x400?text=DevOps+Pipeline",
        deleted: false,
      },
      {
        id: "proj-105",
        name: "Mobile Banking App",
        imageUrl: "https://placehold.co/600x400?text=Mobile+Banking",
        deleted: false,
      },
    ],
    skipDuplicates: true,
  });
  // Seed Priorities
  const priorities = await prisma.priority.createMany({
    data: [
      { id: '1', name: 'Critical', color: 'red' },
      { id: '2', name: 'High', color: 'orange' },
      { id: '3', name: 'Medium', color: 'yellow' },
      { id: '4', name: 'Low', color: 'green' },
    ],
    skipDuplicates: true,
  });

  // Seed Statuses
  const statuses = await prisma.status.createMany({
    data: [
      { id: '1', name: 'Open', color: 'blue' },
      { id: '2', name: 'InProgress', color: 'yellow' },
      { id: '3', name: 'Escalated', color: 'red' },
      { id: '4', name: 'Resolved', color: 'green' },
      { id: '5', name: 'Reopened', color: 'purple' },
      { id: '6', name: 'Closed', color: 'gray' },
      { id: '7', name: 'OnHold', color: 'orange' },
    ],
    skipDuplicates: true,
  });

  // Seed Users
  await prisma.user.createMany({
    data: await Promise.all([
      {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        password: await hashPassword(DEFAULT_PASSWORD),
        roleId: "3",
      },
      {
        id: "2",
        name: "DevOps Engineer",
        email: "devops@example.com",
        password: await hashPassword(DEFAULT_PASSWORD),
        roleId: "2",
      },
      {
        id: "3",
        name: "Software Developer",
        email: "developer@example.com",
        password: await hashPassword(DEFAULT_PASSWORD),
        roleId: "1",
      },
      {
        id: "4",
        name: "Project Manager",
        email: "manager@example.com",
        password: await hashPassword(DEFAULT_PASSWORD),
        roleId: "4",
      },
    ]),
    skipDuplicates: true,
  });



  // Seed Tickets
  const ticket = await prisma.ticket.createMany({
    data: [
      {
        id: '1',
        title: 'Bug in login system',
        description: 'Users unable to login due to server error.',
        priorityId: '1',
        statusId: '1',
        createdById: '1',
        categoryId: '1',
        projectId: '1',
      },
      {
        id: '2',
        title: 'Bug in login system',
        description: 'Users unable to login due to server error.',
        priorityId: '1',
        statusId: '1',
        createdById: '1',
        categoryId: '1',
        projectId: '1',
      },
    ],
    skipDuplicates: true, // Mencegah duplikasi

  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
