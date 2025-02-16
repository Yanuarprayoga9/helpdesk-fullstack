/*
  Warnings:

  - You are about to drop the column `newStatus` on the `tickethistory` table. All the data in the column will be lost.
  - You are about to drop the column `oldStatus` on the `tickethistory` table. All the data in the column will be lost.
  - Added the required column `newStatusId` to the `TicketHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldStatusId` to the `TicketHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `tickethistory` DROP COLUMN `newStatus`,
    DROP COLUMN `oldStatus`,
    ADD COLUMN `newStatusId` VARCHAR(191) NOT NULL,
    ADD COLUMN `oldStatusId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TicketHistory` ADD CONSTRAINT `TicketHistory_oldStatusId_fkey` FOREIGN KEY (`oldStatusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketHistory` ADD CONSTRAINT `TicketHistory_newStatusId_fkey` FOREIGN KEY (`newStatusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
