import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'craftStage', 'location', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug identifier',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Core Service Category',
      options: [
        { label: '1. Wooden Staircase', value: 'staircases' },
        { label: '2. Gypsum Designing & Installation', value: 'gypsum' },
        { label: '3. Wooden Flooring', value: 'flooring' },
        { label: '4. Kitchen Cabinets & Wardrobes', value: 'cabinetry' },
        { label: '5. TV Stands & Media Consoles', value: 'tv_stands' },
        { label: '6. Door & Frame Fitting', value: 'doors' },
        { label: '7. Roofing & Home Renovation', value: 'renovation' },
      ],
    },
    {
      name: 'craftStage',
      type: 'select',
      defaultValue: 'Completed Work',
      label: 'Craftsmanship Stage',
      options: [
        { label: 'Completed Work', value: 'Completed Work' },
        { label: 'On-Site Installation', value: 'On-Site Installation' },
        { label: 'Workshop Milling', value: 'Workshop Milling' },
      ],
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Nairobi, Kenya',
      label: 'Project Location',
    },
    {
      name: 'year',
      type: 'text',
      defaultValue: '2026',
      label: 'Year Completed / Installed',
    },
    {
      name: 'duration',
      type: 'text',
      defaultValue: '2 - 3 Weeks',
      label: 'Project Duration / Lead Time',
    },
    {
      name: 'woodSpecies',
      type: 'text',
      label: 'Primary Timber / Material Grade',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Technical Craft Description',
    },
    {
      name: 'materials',
      type: 'array',
      label: 'Architectural Specs & Materials',
      fields: [
        {
          name: 'spec',
          type: 'text',
          label: 'Specification Detail',
        },
      ],
    },
    {
      name: 'imageMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Project Photo (Upload New or Choose from Media Library)',
      admin: {
        description: 'Recommended: Drag and drop or upload a photo directly here. This image will be automatically optimized and displayed on the website.',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Legacy Image Path / External URL (Optional)',
      admin: {
        description: 'Optional fallback: Used for pre-existing static assets (e.g. /portfolio/project-01.jpg). If you upload a Project Photo above, the uploaded photo will automatically take priority.',
      },
    },
    {
      name: 'isVideo',
      type: 'checkbox',
      defaultValue: false,
      label: 'Is Video Reel',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL (e.g. /portfolio/reel-01.mp4)',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured in Hero / Highlights Showcase',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 100,
      label: 'Display Sort Order',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
