import { TableColumn } from "@nuxt/ui"

import { User } from '../../types'
import { h } from "vue";
import UserNameAvatar from "./components/UserNameAvatar.vue";
import SelectColumn from "./components/SelectColumn.vue";
import EmailHeader from "./components/EmailHeader.vue";
import NameHeader from "./components/NameHeader.vue";
import CompanyHeader from "./components/CompanyHeader.vue";


export function UserColumns() {
  const columns: TableColumn<User>[] = [
    {
      id: 'select',
      header: ({ table }) => h(SelectColumn, { table, isHeader: true }),
      cell: ({ row }) => h(SelectColumn, { row })
    },
    {
      accessorKey: "name",
      header: ({ column, table }) => {
        const isSortActive = table.getState().sorting.length > 0;
        return h(NameHeader, { column, isSortActive })
      },
      cell: ({ row }) => {
        return h(UserNameAvatar, { user: row.original })
      },
    },
    {
      accessorKey: "email",
      header: ({ column, table }) => {
        const isSortActive = table.getState().sorting.length > 0;
        return h(EmailHeader, { column, isSortActive })
      },
      cell: ({ row }) => row.original.email
    },
    {
      accessorKey: "company",
      header: ({ column, table }) => {
        const isSortActive = table.getState().sorting.length > 0;
        return h(CompanyHeader, { column, isSortActive })
      },
      cell: ({ row }) => row.original.company.name,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) =>
        `${row.original.address.street}, ${row.original.address.city}, ${row.original.address.zipcode}`,
    },
  ];

  return columns;
}
