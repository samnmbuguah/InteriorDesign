import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'createdAt'],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Austine Admin',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'admin',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Craftsman / Editor', value: 'editor' },
      ],
    },
  ],
}
