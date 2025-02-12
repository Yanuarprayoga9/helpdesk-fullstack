CREATE TABLE "User" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "role" TEXT CHECK("role" IN ('Developer', 'DevOps', 'Manager', 'Reporter')) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "Category" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "Ticket" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT CHECK("priority" IN ('Critical', 'High', 'Medium', 'Low')) NOT NULL,
    "status" TEXT CHECK("status" IN ('Open', 'InProgress', 'Escalated', 'Resolved', 'Reopened', 'Closed', 'OnHold')) DEFAULT 'Open',
    "createdById" UUID REFERENCES "User"("id") ON DELETE CASCADE,
    "assignedById" UUID REFERENCES "User"("id"),
    "categoryId" UUID REFERENCES "Category"("id"),
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "TicketAssignee" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "ticketId" UUID REFERENCES "Ticket"("id") ON DELETE CASCADE,
    "userId" UUID REFERENCES "User"("id") ON DELETE CASCADE,
    "assignedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "unique_ticket_assignee" UNIQUE ("ticketId", "userId")
);

CREATE TABLE "TicketAttachment" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "ticketId" UUID REFERENCES "Ticket"("id") ON DELETE CASCADE,
    "fileUrl" TEXT NOT NULL,
    "uploadedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "TicketHistory" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "ticketId" UUID REFERENCES "Ticket"("id") ON DELETE CASCADE,
    "changedById" UUID REFERENCES "User"("id"),
    "oldStatus" TEXT CHECK("oldStatus" IN ('Open', 'InProgress', 'Escalated', 'Resolved', 'Reopened', 'Closed', 'OnHold')),
    "newStatus" TEXT CHECK("newStatus" IN ('Open', 'InProgress', 'Escalated', 'Resolved', 'Reopened', 'Closed', 'OnHold')) NOT NULL,
    "changeNotes" TEXT,
    "changedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "TicketComment" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "ticketId" UUID REFERENCES "Ticket"("id") ON DELETE CASCADE,
    "userId" UUID REFERENCES "User"("id") ON DELETE CASCADE,
    "comment" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "parentCommentId" UUID REFERENCES "TicketComment"("id") ON DELETE CASCADE,
    CONSTRAINT "unique_comment_parent" UNIQUE ("ticketId", "parentCommentId")
);

CREATE TABLE "TicketFeedback" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "ticketId" UUID REFERENCES "Ticket"("id") ON DELETE CASCADE,
    "userId" UUID REFERENCES "User"("id") ON DELETE CASCADE,
    "rating" INT CHECK("rating" >= 1 AND "rating" <= 5) DEFAULT 0,
    "feedback" TEXT,
    "submittedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);
