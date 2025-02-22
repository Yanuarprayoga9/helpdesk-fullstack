/*
  Warnings:

  - Made the column `imageUrl` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `imageUrl` VARCHAR(100) NOT NULL DEFAULT 'https://avatar.iran.liara.run/public';
