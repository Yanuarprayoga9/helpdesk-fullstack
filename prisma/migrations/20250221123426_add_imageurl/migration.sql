/*
  Warnings:

  - You are about to alter the column `projectId` on the `ticket` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(36)`.

*/
-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_projectId_fkey`;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `imageUrl` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `imageUrl` VARCHAR(100) NULL,
    MODIFY `projectId` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `imageUrl` VARCHAR(100) NULL DEFAULT 'https://avatar.iran.liara.run/public';

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
