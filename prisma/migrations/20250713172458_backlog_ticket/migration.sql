/*
  Warnings:

  - Added the required column `backlog` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `backlog` INTEGER NOT NULL;
