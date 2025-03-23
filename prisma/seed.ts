import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
  const user = await prisma.user.create({
    data: {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      roleId : '3'
    },
  });

  // Seed Projects
  const project = await prisma.project.create({
    data: {
      id: '1',
      name: 'Project A',
    },
  });

  // Seed Tickets
  const ticket = await prisma.ticket.create({
    data: {
      id: '1',
      title: 'Bug in login system',
      description: 'Users unable to login due to server error.',
      priorityId: '1',
      statusId: '1',
      createdById: '1',
      categoryId: '1',
      projectId: '1',
    },
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
