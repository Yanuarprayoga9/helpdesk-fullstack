-- Menambahkan Role
INSERT INTO Role (id, name) VALUES
  ('uuid1', 'Developer'),
  ('uuid2', 'Manager'),
  ('uuid3', 'Admin'),
  ('uuid4', 'DevOps');

-- Menambahkan User
INSERT INTO User (id, name, email, password, createdAt, updatedAt) VALUES
  ('uuid-user-1', 'Yanuar Prayoga', 'yanuar@example.com', 'hashedpassword', NOW(), NOW()),
  ('uuid-user-2', 'John Doe', 'johndoe@example.com', 'hashedpassword', NOW(), NOW()),
  ('uuid-user-3', 'Jane Smith', 'janesmith@example.com', 'hashedpassword', NOW(), NOW());

-- Menambahkan UserRole (Relasi User dan Role)
INSERT INTO UserRole (userId, roleId) VALUES
  ('uuid-user-1', 'uuid1'), -- Yanuar sebagai Developer
  ('uuid-user-2', 'uuid2'), -- John sebagai Manager
  ('uuid-user-3', 'uuid3'); -- Jane sebagai Admin

-- Menambahkan Project
INSERT INTO Project (id, name, createdAt, updatedAt) VALUES
  ('uuid-project-1', 'Project A', NOW(), NOW()),
  ('uuid-project-2', 'Project B', NOW(), NOW());

-- Menambahkan ProjectUser (Relasi antara Project dan User)
INSERT INTO ProjectUser (id,projectId, userId, createdAt) VALUES
  ('uuid-projectUsr-1','uuid-project-1', 'uuid-user-1', NOW()), -- Yanuar bergabung di Project A
  ('uuid-projectUsr-2','uuid-project-2', 'uuid-user-2', NOW()); -- John bergabung di Project B

-- Menambahkan Category
INSERT INTO Category (id, name, createdAt, updatedAt) VALUES
  ('uuid-category-1', 'Bug Sistem', NOW(), NOW()),
  ('uuid-category-2', 'Gangguan Infrastruktur', NOW(), NOW());

-- Menambahkan Priority
INSERT INTO Priority (id, color, name) VALUES
  ('uuid-priority-1', 'red', 'Critical'),
  ('uuid-priority-2', 'yellow', 'High');

-- Menambahkan Status
INSERT INTO Status (id, color, name) VALUES
  ('uuid-status-1', 'green', 'Open'),
  ('uuid-status-2', 'blue', 'InProgress');

-- Menambahkan Ticket
INSERT INTO Ticket (id, title, description, priorityId, statusId, createdById, createdAt,updatedAt, projectId) VALUES
  ('uuid-ticket-1', 'Bug pada sistem login', 'Deskripsi tentang bug login...', 'uuid-priority-1', 'uuid-status-1', 'uuid-user-1', NOW(),NOW(), 'uuid-project-1'),
  ('uuid-ticket-2', 'Permintaan upgrade server', 'Deskripsi tentang upgrade server...', 'uuid-priority-2', 'uuid-status-2', 'uuid-user-2', NOW(),NOW(), 'uuid-project-2');

-- Menambahkan TicketAssignee (Relasi antara Ticket dan User yang ditugaskan)
INSERT INTO TicketAssignee (id,ticketId, userId, assignedAt) VALUES
  ('uuid-ticketass-1','uuid-ticket-1', 'uuid-user-2', NOW()), -- John ditugaskan pada Ticket 1
  ('uuid-ticketass-2','uuid-ticket-2', 'uuid-user-3', NOW()); -- Jane ditugaskan pada Ticket 2

-- Menambahkan TicketHistory (Riwayat status perubahan)
INSERT INTO TicketHistory (id, ticketId, oldStatusId, newStatusId, changedById, changeNotes, changedAt) VALUES
  ('uuid-tickethis-1', 'uuid-ticket-1', 'uuid-status-1', 'uuid-status-2', 'uuid-user-1', 'Status berubah dari Open ke InProgress', NOW()), 
  ('uuid-tickethis-2', 'uuid-ticket-1', 'uuid-status-2', 'uuid-status-1', 'uuid-user-2', 'Status dikembalikan ke Open', NOW());

-- Menambahkan TicketComment (Komentar di tiket)
INSERT INTO TicketComment (id,ticketId, userId, comment, createdAt) VALUES
  ('uuid-ticketcom-1','uuid-ticket-1', 'uuid-user-1', 'Saya telah memperbaiki bug ini', NOW()), -- Yanuar memberikan komentar pada Ticket 1
  ('uuid-ticketcom-2','uuid-ticket-2', 'uuid-user-2', 'Upgrade server berhasil dilakukan', NOW()); -- John memberikan komentar pada Ticket 2
