-- CreateTable
CREATE TABLE `TicketAssignmentRequest` (
    `id` VARCHAR(36) NOT NULL,
    `ticketId` VARCHAR(36) NOT NULL,
    `requestedById` VARCHAR(36) NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `notes` TEXT NULL,
    `requestedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TicketAssignmentRequest` ADD CONSTRAINT `TicketAssignmentRequest_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketAssignmentRequest` ADD CONSTRAINT `TicketAssignmentRequest_requestedById_fkey` FOREIGN KEY (`requestedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
