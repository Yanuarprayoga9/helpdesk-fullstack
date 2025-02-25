"use client";

import { RoleType, UserType } from "@/@types/user";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

// Definisi kolom untuk tabel users
export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "imageUrl",
    header: "Avatar",
    cell: ({ row }) => (
      <Image
        src={row.original.imageUrl}
        alt={row.original.name}
        width={40}
        height={40}
        className="rounded-full"
      />
    ),
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => (
      <div>
        {row.original.roles.map((role:RoleType) => (
          <span key={role.id} className="px-2 py-1 text-xs bg-gray-200 rounded">
            {role.name}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <div>...</div>, // Bisa diganti dengan tombol edit/delete
  },
];
