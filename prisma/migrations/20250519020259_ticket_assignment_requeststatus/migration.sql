/*
  Warnings:

  - You are about to alter the column `status` on the `ticketassignmentrequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `ticketassignmentrequest` MODIFY `status` ENUM('Pending', 'Rejected') NOT NULL DEFAULT 'Pending';
