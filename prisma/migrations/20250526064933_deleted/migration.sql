/*
  Warnings:

  - You are about to drop the column `deleted` on the `priority` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `priority` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `status` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `priority` DROP COLUMN `deleted`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `role` DROP COLUMN `deleted`;

-- AlterTable
ALTER TABLE `status` DROP COLUMN `deleted`;
