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
      { id: '4', name: 'Manager' },
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
  await prisma.ticket.createMany({
    data: [
      {
        id: '1',
        title: 'Bug in login system',
        description: 'Users unable to login due to server error.',
        priorityId: '1',
        statusId: '1',
        createdById: '1',
        categoryId: '1',
        projectId: 'proj-101', // ✅ FIXED
      },
      {
        id: '2',
        title: 'UI tidak responsive',
        description: 'Layout pecah di layar kecil.',
        priorityId: '2',
        statusId: '2',
        createdById: '2',
        categoryId: '2',
        projectId: 'proj-102', // ✅ FIXED
      },
    ],
    skipDuplicates: true,
  });

  await prisma.ticketComment.createMany({
    data: [
      // Parent comment
      {
        id: '1',
        userId: '2', // DevOps Engineer
        ticketId: '1',
        isMostHelpful: true,
        comment: "These Azure DevOps pipeline failures are often related to authentication or network connectivity issues.",
        parentCommentId: null,
        deleted: false,
      },
      {
        id: '2',
        userId: '3', // Software Developer
        ticketId: '1',
        isMostHelpful: false,
        comment: "I don't think that's true. I created a new pipeline and still failed.",
        parentCommentId: null,
        deleted: false,
      },
      {
        id: '3',
        userId: '2', // AzureExpert = DevOps Engineer
        ticketId: '1',
        isMostHelpful: false,
        comment: "Check issue #111. Retry policy is handled by retry-nuget.ps1 script.",
        parentCommentId: null,
        deleted: false,
      },
      // Reply comment
      {
        id: '4',
        userId: '3',
        ticketId: '1',
        isMostHelpful: false,
        comment: "Hi @AzureExpert, you're right — it's possible to retry in other cases.",
        parentCommentId: '3',
        deleted: false,
      },
      {
        id: '5',
        userId: '2',
        ticketId: '1',
        isMostHelpful: false,
        comment: "It might be a memory issue in the agent. Try switching to M2 agent pool.",
        parentCommentId: '4',
        deleted: false,
      },
    ],
    skipDuplicates: true,
  });


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
