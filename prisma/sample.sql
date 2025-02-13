-- Insert sample data into Role
INSERT INTO "Role" ("id", "name") VALUES
('9f15be7c-f78a-4b0c-9090-3a742b9abdb2', 'Developer'),
('9f15be7c-f78a-4b0c-9090-3a742b9abdb3', 'Manager'),
('9f15be7c-f78a-4b0c-9090-3a742b9abdb4', 'Admin');

-- Insert sample data into User
INSERT INTO "User" ("id", "name", "email", "password", "createdAt", "updatedAt") VALUES
('cb74b4bb-d3ec-47a9-922d-1f7e9f1e08e3', 'John Doe', 'john.doe@example.com', 'hashedpassword', NOW(), NOW()),
('cfbe9c93-7a94-4ae7-8bfa-698f2836b63b', 'Jane Smith', 'jane.smith@example.com', 'hashedpassword', NOW(), NOW());

-- Insert sample data into Project
INSERT INTO "Project" ("id", "name", "createdAt", "updatedAt") VALUES
('7a9926b2-92c4-4a83-b28b-9efdd8e7c7fe', 'Project Alpha', NOW(), NOW()),
('9f5c2277-5e1a-47eb-b5f7-38be3e273d62', 'Project Beta', NOW(), NOW());

-- Insert sample data into ProjectUser
INSERT INTO "ProjectUser" ("id", "projectId", "userId", "createdAt") VALUES
('b7c1ad9e-bf12-4f3a-a327-c64f7cd62f26', '7a9926b2-92c4-4a83-b28b-9efdd8e7c7fe', 'cb74b4bb-d3ec-47a9-922d-1f7e9f1e08e3', NOW()),
('b7c1ad9e-bf12-4f3a-a327-c64f7cd62f27', '9f5c2277-5e1a-47eb-b5f7-38be3e273d62', 'cfbe9c93-7a94-4ae7-8bfa-698f2836b63b', NOW());

-- Insert sample data into Ticket
INSERT INTO "Ticket" ("id", "title", "description", "priorityId", "statusId", "createdById", "assignedById", "categoryId", "createdAt", "updatedAt", "projectId") VALUES
('b013570a-4ff4-46db-97ae-4cb9ff2767be', 'Bug in login', 'User unable to log in due to invalid credentials', 'de8a1a0b-dbd7-467f-b38e-e3fa060602b8', '9e6c1db8-74b9-4115-87da-c665d10de0cc', 'cb74b4bb-d3ec-47a9-922d-1f7e9f1e08e3', 'cfbe9c93-7a94-4ae7-8bfa-698f2836b63b', '1a6a47a3-bd6f-4b6d-aef5-38d46308d7c9', NOW(), NOW(), '7a9926b2-92c4-4a83-b28b-9efdd8e7c7fe'),
('1c25b1e4-b4b0-44fc-9f89-2fe7b8c499f0', 'Feature request', 'Add new feature for admin panel', 'de8a1a0b-dbd7-467f-b38e-e3fa060602b8', 'c98ba0bb-118d-4a3d-b12d-df5a7349c601', 'cfbe9c93-7a94-4ae7-8bfa-698f2836b63b', 'cfbe9c93-7a94-4ae7-8bfa-698f2836b63b', '1a6a47a3-bd6f-4b6d-aef5-38d46308d7c9', NOW(), NOW(), '9f5c2277-5e1a-47eb-b5f7-38be3e273d62');

-- Insert sample data into Priority
INSERT INTO "Priority" ("id", "name") VALUES
('de8a1a0b-dbd7-467f-b38e-e3fa060602b8', 'High'),
('a3928b12-0bfb-4c87-80c2-6235d7be9df8', 'Low');

-- Insert sample data into Status
INSERT INTO "Status" ("id", "name") VALUES
('9e6c1db8-74b9-4115-87da-c665d10de0cc', 'Open'),
('c98ba0bb-118d-4a3d-b12d-df5a7349c601', 'InProgress');

-- Insert sample data into Category
INSERT INTO "Category" ("id", "name", "createdAt", "updatedAt") VALUES
('1a6a47a3-bd6f-4b6d-aef5-38d46308d7c9', 'Bug Sistem', NOW(), NOW()),
('9f5c2277-5e1a-47eb-b5f7-38be3e273d62', 'Permintaan Deployment', NOW(), NOW());

-- Insert sample data into TicketAssignee
INSERT INTO "TicketAssignee" ("id", "ticketId", "userId", "assignedAt") VALUES
('9b6f84d7-3946-44ea-bdd3-b8e54a0a8aef', 'b013570a-4ff4-46db-97ae-4cb9ff2767be', 'cfbe9c93-7a94-4ae7-8bfa-698f2836b63b', NOW());

-- Insert sample data into TicketHistory
INSERT INTO "TicketHistory" ("id", "ticketId", "oldStatus", "newStatus", "changedAt") VALUES
('a68feff3-07e0-4f30-bd83-0a22cc9fc0f5', 'b013570a-4ff4-46db-97ae-4cb9ff2767be', 'Open', 'InProgress', NOW());
