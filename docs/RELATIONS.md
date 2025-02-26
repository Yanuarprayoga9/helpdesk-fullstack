# RELATIONS
![text](reverse%20engineer.png)

### User - Role (Many-to-Many)

Model yang terlibat: User, Role, UserRole
Penjelasan:

1. Seorang User bisa memiliki banyak Role.
2. Sebuah Role bisa dimiliki oleh banyak User.
Relasi ini direpresentasikan dengan tabel UserRole, yang berisi pasangan userId dan roleId.

### User - Project (Many-to-Many)

Model yang terlibat: User, Project, ProjectUser
Penjelasan:

1. Seorang User bisa terlibat dalam banyak Project.
2. Sebuah Project bisa memiliki banyak User.
Relasi ini direpresentasikan dengan tabel ProjectUser, yang berisi userId dan projectId.

### User - Ticket (One-to-Many)

Model yang terlibat: User, Ticket
Penjelasan:

1. Seorang User bisa membuat banyak Ticket → (createdById di Ticket).
2. Seorang User bisa menugaskan banyak Ticket ke pengguna lain → (assignedById di Ticket).
Seorang User bisa ditugaskan ke banyak Ticket → melalui TicketAssignee.

### User - TicketAssignee (Many-to-Many)

Model yang terlibat: User, Ticket, TicketAssignee
Penjelasan:

1. Seorang User bisa ditugaskan ke banyak Ticket.
2. Sebuah Ticket bisa memiliki banyak User yang ditugaskan.
Relasi ini direpresentasikan dengan tabel TicketAssignee, yang berisi userId dan ticketId.

### User - TicketComment (One-to-Many & Self-Referencing)

Model yang terlibat: User, TicketComment
Penjelasan:

1. Seorang User bisa memberikan banyak TicketComment pada berbagai Ticket.
Komentar bisa memiliki balasan (Self-Referencing) melalui parentCommentId.

### User - TicketHistory (One-to-Many)

Model yang terlibat: User, TicketHistory
Penjelasan:

1. Seorang User bisa mengubah status Ticket, yang dicatat dalam TicketHistory (changedById).

### Project - Ticket (One-to-Many)

Model yang terlibat: Project, Ticket
Penjelasan:

1. Sebuah Project bisa memiliki banyak Ticket.
2. Setiap Ticket harus terkait dengan satu Project (projectId).

### Ticket - Category (One-to-Many)

Model yang terlibat: Category, Ticket
Penjelasan:

1. Setiap Ticket bisa masuk dalam satu Category (categoryId).
2. Satu Category bisa memiliki banyak Ticket.

### Ticket - Priority (One-to-Many)

Model yang terlibat: Priority, Ticket
Penjelasan:

1. Setiap Ticket memiliki satu Priority (priorityId).
2. Satu Priority bisa digunakan oleh banyak Ticket.

### Ticket - Status (One-to-Many)

Model yang terlibat: Status, Ticket
Penjelasan:

1. Setiap Ticket memiliki satu Status (statusId).
2. Satu Status bisa digunakan oleh banyak Ticket.

### TicketHistory - Status (Two Relations)

Model yang terlibat: TicketHistory, Status
Penjelasan:

1. Setiap TicketHistory menyimpan perubahan status tiket.
oldStatusId menyimpan status sebelum perubahan.
newStatusId menyimpan status setelah perubahan.
