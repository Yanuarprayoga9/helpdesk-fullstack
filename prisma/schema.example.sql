-- Table for User
CREATE TABLE
    `User` (
        `id` CHAR(36) PRIMARY KEY,
        `name` VARCHAR(50) NOT NULL,
        `email` VARCHAR(50) UNIQUE NOT NULL,
        `password` TEXT NOT NULL,
        `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Table for Project
CREATE TABLE
    `Project` (
        `id` CHAR(36) PRIMARY KEY,
        `name` VARCHAR(100) NOT NULL,
        `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Table for ProjectUser
CREATE TABLE
    `ProjectUser` (
        `id` CHAR(36) PRIMARY KEY,
        `projectId` CHAR(36) NOT NULL,
        `userId` CHAR(36) NOT NULL,
        `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (`projectId`) REFERENCES `Project` (`id`),
        FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
    );

-- Table for Role
CREATE TABLE
    `Role` (
        `id` CHAR(36) PRIMARY KEY,
        `name` VARCHAR(20) UNIQUE NOT NULL
    );

-- Table for UserRole
CREATE TABLE
    `UserRole` (
        `userId` CHAR(36) NOT NULL,
        `roleId` CHAR(36) NOT NULL,
        PRIMARY KEY (`userId`, `roleId`),
        FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
        FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`)
    );

-- Table for Category
CREATE TABLE
    `Category` (
        `id` CHAR(36) PRIMARY KEY,
        `name` VARCHAR(100) UNIQUE NOT NULL,
        `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Table for Priority
CREATE TABLE
    `Priority` (
        `id` CHAR(36) PRIMARY KEY,
        `color` VARCHAR(20) NOT NULL,
        `name` VARCHAR(20) UNIQUE NOT NULL
    );

-- Table for Status
CREATE TABLE
    `Status` (
        `id` CHAR(36) PRIMARY KEY,
        `color` VARCHAR(20) NOT NULL,
        `name` VARCHAR(20) UNIQUE NOT NULL
    );

-- Table for Ticket
CREATE TABLE
    `Ticket` (
        `id` CHAR(36) PRIMARY KEY,
        `title` VARCHAR(50) NOT NULL,
        `description` TEXT NOT NULL,
        `priorityId` CHAR(36) NOT NULL,
        `statusId` CHAR(36),
        `createdById` CHAR(36) NOT NULL,
        `assignedById` CHAR(36),
        `categoryId` CHAR(36),
        `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (`priorityId`) REFERENCES `Priority` (`id`),
        FOREIGN KEY (`statusId`) REFERENCES `Status` (`id`),
        FOREIGN KEY (`createdById`) REFERENCES `User` (`id`),
        FOREIGN KEY (`assignedById`) REFERENCES `User` (`id`),
        FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`)
    );

-- Table for TicketAssignee
CREATE TABLE
    `TicketAssignee` (
        `id` CHAR(36) PRIMARY KEY,
        `ticketId` CHAR(36) NOT NULL,
        `userId` CHAR(36) NOT NULL,
        `assignedAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (`ticketId`, `userId`),
        FOREIGN KEY (`ticketId`) REFERENCES `Ticket` (`id`),
        FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
    );

-- Table for TicketHistory
CREATE TABLE
    `TicketHistory` (
        `id` CHAR(36) PRIMARY KEY,
        `ticketId` CHAR(36) NOT NULL,
        `changedById` CHAR(36),
        `oldStatusId` VARCHAR(20) NOT NULL,
        `newStatusId` VARCHAR(20) NOT NULL,
        `changeNotes` TEXT,
        `changedAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (`oldStatusId`) REFERENCES `Status` (`id`),
        FOREIGN KEY (`newStatusId`) REFERENCES `Status` (`id`),
        FOREIGN KEY (`ticketId`) REFERENCES `Ticket` (`id`),
        FOREIGN KEY (`changedById`) REFERENCES `User` (`id`)
    );

-- Table for TicketComment
CREATE TABLE
    `TicketComment` (
        `id` CHAR(36) PRIMARY KEY,
        `ticketId` CHAR(36) NOT NULL,
        `userId` CHAR(36) NOT NULL,
        `comment` TEXT NOT NULL,
        `imageUrl` VARCHAR(255),
        `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
        `parentCommentId` CHAR(36),
        FOREIGN KEY (`ticketId`) REFERENCES `Ticket` (`id`),
        FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
        FOREIGN KEY (`parentCommentId`) REFERENCES `TicketComment` (`id`)
    );

-- Table for TicketFeedback (commented out in schema)
-- CREATE TABLE `TicketFeedback` (
--   `id` CHAR(36) PRIMARY KEY,
--   `ticketId` CHAR(36) NOT NULL,
--   `userId` CHAR(36) NOT NULL,
--   `rating` INT DEFAULT 0,
--   `feedback` TEXT,
--   `submittedAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`),
--   FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
-- );