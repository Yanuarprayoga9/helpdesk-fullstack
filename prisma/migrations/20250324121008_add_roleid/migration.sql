/*
  Warnings:

  - You are about to drop the column `assignedById` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_assignedById_fkey`;

-- DropForeignKey
ALTER TABLE `UserRole` DROP FOREIGN KEY `UserRole_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRole` DROP FOREIGN KEY `UserRole_userId_fkey`;

-- DropIndex
DROP INDEX `Ticket_assignedById_fkey` ON `Ticket`;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `assignedById`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `roleId` VARCHAR(36) NOT NULL;

-- DropTable
DROP TABLE `UserRole`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
