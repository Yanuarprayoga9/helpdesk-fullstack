"use client";

import { CategoryType } from "@/@types/category";
import { ColumnDef } from "@tanstack/react-table";
import { CategoryForm } from "./category-modal";
import { CategoryDeleteForm } from "./category-delete";

// Definisi kolom untuk tabel users
export const columns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    id: "actions",
    header: "Actions",
    /* eslint-disable @typescript-eslint/no-unused-vars */
    cell: ({ row }) => (
      <div className="flex  space-x-2">
        <CategoryForm categoryId={row.original.id} defaultValues={row.original} />
        <CategoryDeleteForm categoryId={row.original.id} />
      </div>
    )
  },
];
