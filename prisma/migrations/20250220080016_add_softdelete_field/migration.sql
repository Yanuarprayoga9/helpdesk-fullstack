-- AlterTable
ALTER TABLE `category` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `priority` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `projectuser` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `role` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `status` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `ticketassignee` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `ticketcomment` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `tickethistory` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `userrole` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;
