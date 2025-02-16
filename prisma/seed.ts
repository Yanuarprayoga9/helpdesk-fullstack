import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed Role
    await prisma.role.createMany({
        data: [
            { id: 'uuid1', name: 'Developer' },
            { id: 'uuid2', name: 'Manager' },
            { id: 'uuid3', name: 'Admin' },
            { id: 'uuid4', name: 'DevOps' },
        ],
    });

    // Seed User
    await prisma.user.createMany({
        data: [
            { id: 'uuid-user-1', name: 'Yanuar Prayoga', email: 'yanuar@example.com', password: 'hashedpassword' },
            { id: 'uuid-user-2', name: 'John Doe', email: 'johndoe@example.com', password: 'hashedpassword' },
            { id: 'uuid-user-3', name: 'Jane Smith', email: 'janesmith@example.com', password: 'hashedpassword' },
        ],
    });

    // Seed UserRole
    await prisma.userRole.createMany({
        data: [
            { userId: 'uuid-user-1', roleId: 'uuid1' },
            { userId: 'uuid-user-2', roleId: 'uuid2' },
            { userId: 'uuid-user-3', roleId: 'uuid3' },
        ],
    });

    // Seed Project
    await prisma.project.createMany({
        data: [
            { id: 'uuid-project-1', name: 'Project A' },
            { id: 'uuid-project-2', name: 'Project B' },
        ],
    });

    // Seed ProjectUser
    await prisma.projectUser.createMany({
        data: [
            { id: 'uuid-projectUsr-1', projectId: 'uuid-project-1', userId: 'uuid-user-1' },
            { id: 'uuid-projectUsr-2', projectId: 'uuid-project-2', userId: 'uuid-user-2' },
        ],
    });

    // Seed Category
    await prisma.category.createMany({
        data: [
            { id: 'uuid-category-1', name: 'Bug Sistem' },
            { id: 'uuid-category-2', name: 'Gangguan Infrastruktur' },
        ],
    });

    // Seed Priority
    await prisma.priority.createMany({
        data: [
            { id: 'uuid-priority-1', color: 'red', name: 'Critical' },
            { id: 'uuid-priority-2', color: 'yellow', name: 'High' },
        ],
    });

    // Seed Status
    await prisma.status.createMany({
        data: [
            { id: 'uuid-status-1', color: 'green', name: 'Open' },
            { id: 'uuid-status-2', color: 'blue', name: 'InProgress' },
        ],
    });

    // Seed Ticket
    await prisma.ticket.createMany({
        data: [
            {
                id: 'uuid-ticket-1',
                title: 'Bug pada sistem login',
                description: 'Deskripsi tentang bug login...',
                priorityId: 'uuid-priority-1',
                statusId: 'uuid-status-1',
                createdById: 'uuid-user-1',
                projectId: 'uuid-project-1',
            },
            {
                id: 'uuid-ticket-2',
                title: 'Permintaan upgrade server',
                description: 'Deskripsi tentang upgrade server...',
                priorityId: 'uuid-priority-2',
                statusId: 'uuid-status-2',
                createdById: 'uuid-user-2',
                projectId: 'uuid-project-2',
            },
        ],
    });

    // Seed TicketAssignee
    await prisma.ticketAssignee.createMany({
        data: [
            { id: 'uuid-ticketass-1', ticketId: 'uuid-ticket-1', userId: 'uuid-user-2' },
            { id: 'uuid-ticketass-2', ticketId: 'uuid-ticket-2', userId: 'uuid-user-3' },
        ],
    });

    // Seed TicketHistory
    await prisma.ticketHistory.createMany({
        data: [
            {
                id: 'uuid-tickethis-1',
                ticketId: 'uuid-ticket-1',
                oldStatusId: 'uuid-status-1',
                newStatusId: 'uuid-status-2',
                changedById: 'uuid-user-1',
                changeNotes: 'Status berubah dari Open ke InProgress',
            },
            {
                id: 'uuid-tickethis-2',
                ticketId: 'uuid-ticket-1',
                oldStatusId: 'uuid-status-2',
                newStatusId: 'uuid-status-1',
                changedById: 'uuid-user-2',
                changeNotes: 'Status dikembalikan ke Open',
            },
        ],
    });

    // Seed TicketComment
    await prisma.ticketComment.createMany({
        data: [
            { id: 'uuid-ticketcom-1', ticketId: 'uuid-ticket-1', userId: 'uuid-user-1', comment: 'Saya telah memperbaiki bug ini' },
            { id: 'uuid-ticketcom-2', ticketId: 'uuid-ticket-2', userId: 'uuid-user-2', comment: 'Upgrade server berhasil dilakukan' },
        ],
    });

    console.log('Seeding selesai!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
