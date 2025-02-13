-- Create table for User
CREATE TABLE
    "User" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "name" VARCHAR(50) NOT NULL,
        "email" VARCHAR(50) UNIQUE NOT NULL,
        "password" TEXT NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT now (),
        "updatedAt" TIMESTAMPTZ DEFAULT now ()
    );

-- Create table for Project
CREATE TABLE
    "Project" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "name" VARCHAR(100) NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT now (),
        "updatedAt" TIMESTAMPTZ DEFAULT now ()
    );

-- Create table for ProjectUser
CREATE TABLE
    "ProjectUser" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "projectId" UUID NOT NULL,
        "userId" UUID NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT now (),
        CONSTRAINT "FK_ProjectUser_Project" FOREIGN KEY ("projectId") REFERENCES "Project" ("id"),
        CONSTRAINT "FK_ProjectUser_User" FOREIGN KEY ("userId") REFERENCES "User" ("id")
    );

-- Create table for Role
CREATE TABLE
    "Role" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "name" VARCHAR(20) UNIQUE NOT NULL
    );

-- Create table for UserRole
CREATE TABLE
    "UserRole" (
        "userId" UUID NOT NULL,
        "roleId" UUID NOT NULL,
        PRIMARY KEY ("userId", "roleId"),
        CONSTRAINT "FK_UserRole_User" FOREIGN KEY ("userId") REFERENCES "User" ("id"),
        CONSTRAINT "FK_UserRole_Role" FOREIGN KEY ("roleId") REFERENCES "Role" ("id")
    );

-- Create table for Category
CREATE TABLE
    "Category" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "name" VARCHAR(100) UNIQUE NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT now (),
        "updatedAt" TIMESTAMPTZ DEFAULT now ()
    );

-- Create table for Priority
CREATE TABLE
    "Priority" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "name" VARCHAR(20) UNIQUE NOT NULL
    );

-- Create table for Status
CREATE TABLE
    "Status" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "name" VARCHAR(20) UNIQUE NOT NULL
    );

-- Create table for Ticket
CREATE TABLE
    "Ticket" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "title" VARCHAR(50) NOT NULL,
        "description" TEXT NOT NULL,
        "priorityId" UUID NOT NULL,
        "statusId" UUID,
        "createdById" UUID NOT NULL,
        "assignedById" UUID,
        "categoryId" UUID,
        "createdAt" TIMESTAMPTZ DEFAULT now (),
        "updatedAt" TIMESTAMPTZ DEFAULT now (),
        CONSTRAINT "FK_Ticket_Priority" FOREIGN KEY ("priorityId") REFERENCES "Priority" ("id"),
        CONSTRAINT "FK_Ticket_Status" FOREIGN KEY ("statusId") REFERENCES "Status" ("id"),
        CONSTRAINT "FK_Ticket_CreatedBy" FOREIGN KEY ("createdById") REFERENCES "User" ("id"),
        CONSTRAINT "FK_Ticket_AssignedBy" FOREIGN KEY ("assignedById") REFERENCES "User" ("id"),
        CONSTRAINT "FK_Ticket_Category" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id")
    );

-- Create table for TicketAssignee
CREATE TABLE
    "TicketAssignee" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "ticketId" UUID NOT NULL,
        "userId" UUID NOT NULL,
        "assignedAt" TIMESTAMPTZ DEFAULT now (),
        CONSTRAINT "FK_TicketAssignee_Ticket" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id"),
        CONSTRAINT "FK_TicketAssignee_User" FOREIGN KEY ("userId") REFERENCES "User" ("id"),
        CONSTRAINT "Unique_TicketAssignee" UNIQUE ("ticketId", "userId")
    );

-- Create table for TicketHistory
CREATE TABLE
    "TicketHistory" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "ticketId" UUID NOT NULL,
        "changedById" UUID,
        "oldStatus" VARCHAR(20) NOT NULL,
        "newStatus" VARCHAR(20) NOT NULL,
        "changeNotes" TEXT,
        "changedAt" TIMESTAMPTZ DEFAULT now (),
        CONSTRAINT "FK_TicketHistory_Ticket" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id"),
        CONSTRAINT "FK_TicketHistory_ChangedBy" FOREIGN KEY ("changedById") REFERENCES "User" ("id")
    );

-- Create table for TicketComment
CREATE TABLE
    "TicketComment" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "ticketId" UUID NOT NULL,
        "userId" UUID NOT NULL,
        "comment" TEXT NOT NULL,
        "imageUrl" VARCHAR(255),
        "createdAt" TIMESTAMPTZ DEFAULT now (),
        "parentCommentId" UUID,
        CONSTRAINT "FK_TicketComment_Ticket" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id"),
        CONSTRAINT "FK_TicketComment_User" FOREIGN KEY ("userId") REFERENCES "User" ("id"),
        CONSTRAINT "FK_TicketComment_Parent" FOREIGN KEY ("parentCommentId") REFERENCES "TicketComment" ("id")
    );