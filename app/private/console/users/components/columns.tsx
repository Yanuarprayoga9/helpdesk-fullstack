"use client";

import {  UserType } from "@/@types/user";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import CellAction from "./cell-action";

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
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div>
        {row.original.role.name}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    /* eslint-disable @typescript-eslint/no-unused-vars */
    cell: ({ row }) => <CellAction userId={row.original.id}/>, // Bisa diganti dengan tombol edit/delete
  },
];
