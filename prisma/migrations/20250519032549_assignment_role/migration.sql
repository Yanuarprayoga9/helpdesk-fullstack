-- AlterTable
ALTER TABLE `ticketassignee` ADD COLUMN `role` ENUM('maintainer', 'member') NOT NULL DEFAULT 'member';

-- AlterTable
ALTER TABLE `ticketassignmentrequest` MODIFY `status` ENUM('Pending', 'Accepted', 'Rejected') NOT NULL DEFAULT 'Pending';
