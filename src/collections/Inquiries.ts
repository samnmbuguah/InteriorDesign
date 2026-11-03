import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'clientPhone', 'projectType', 'budget', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // Allows public submission via website quote forms
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'reservationId',
      type: 'text',
      label: 'Dossier / Lead Ref ID',
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'clientName',
          type: 'text',
          required: true,
          label: 'Client Name',
        },
        {
          name: 'clientPhone',
          type: 'text',
          required: true,
          label: 'Client Phone / WhatsApp',
        },
        {
          name: 'clientEmail',
          type: 'email',
          label: 'Client Email',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'projectType',
          type: 'text',
          label: 'Requested Service / Discipline',
        },
        {
          name: 'location',
          type: 'text',
          label: 'Site Location',
        },
        {
          name: 'budget',
          type: 'text',
          label: 'Estimated Budget Range',
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Client Requirements / Design Notes',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'NEW_LEAD',
      label: 'Consultation & Lead Status',
      options: [
        { label: '🟡 New Inbound Lead', value: 'NEW_LEAD' },
        { label: '📞 Contacted / WhatsApp Chat Initiated', value: 'CONTACTED' },
        { label: '📐 Site Visit & Measurement Booked', value: 'SITE_VISIT_BOOKED' },
        { label: '🪵 Workshop Milling / In Production', value: 'IN_PRODUCTION' },
        { label: '✅ Installation Complete', value: 'COMPLETED' },
        { label: '📁 Archived / Closed', value: 'ARCHIVED' },
      ],
    },
  ],
}
