"use client";

import { ProjectType } from "@/@types/project";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { format } from "date-fns";

// Definisi kolom untuk tabel users
export const columns: ColumnDef<ProjectType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      format(row.original.createdAt, "MMM d, yyyy")
    ),
  },
  {
    accessorKey: "imageUrl",
    header: "Avatar",
    cell: ({ row }) => (
      <Image
        src={row.original.imageUrl || ""}
        alt={row.original.name}
        width={20}
        height={20}
        className="rounded-full"
      />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    /* eslint-disable @typescript-eslint/no-unused-vars */
    cell: ({ row }) => (
       <div>
              {/* <Link href={`${CONSOLE_PROJECTS_ROUTE}/${row.original.id}/edit` }>
                <Pen className="w-4 h-4"/>
              </Link> */}
            </div>
    ) // Bisa diganti dengan tombol edit/delete
  },
];
