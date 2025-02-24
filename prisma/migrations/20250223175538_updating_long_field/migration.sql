/*
  Warnings:

  - You are about to alter the column `projectId` on the `ticket` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(36)`.
  - Made the column `statusId` on table `ticket` required. This step will fail if there are existing NULL values in that column.
  - Made the column `assignedById` on table `ticket` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `ticket` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `ticket` required. This step will fail if there are existing NULL values in that column.
  - Made the column `changedById` on table `tickethistory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `changeNotes` on table `tickethistory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_assignedById_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_statusId_fkey`;

-- DropForeignKey
ALTER TABLE `tickethistory` DROP FOREIGN KEY `TicketHistory_changedById_fkey`;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `imageUrl` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `imageUrl` VARCHAR(100) NULL,
    MODIFY `statusId` VARCHAR(36) NOT NULL,
    MODIFY `assignedById` VARCHAR(36) NOT NULL,
    MODIFY `categoryId` VARCHAR(36) NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `projectId` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `tickethistory` MODIFY `changedById` VARCHAR(36) NOT NULL,
    MODIFY `changeNotes` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `imageUrl` VARCHAR(100) NOT NULL DEFAULT 'https://avatar.iran.liara.run/public';

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_assignedById_fkey` FOREIGN KEY (`assignedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketHistory` ADD CONSTRAINT `TicketHistory_changedById_fkey` FOREIGN KEY (`changedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
