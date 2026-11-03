import { getPayload } from 'payload'
import config from '../payload.config'
import { PROJECTS } from '../data/projects'
import fs from 'fs'
import path from 'path'

async function seed() {
  console.log('[Payload Seed] Initializing Payload instance...')
  const payload = await getPayload({ config })

  // 1. Ensure Admin User exists
  const existingUsers = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'admin@eliteinteriors.co.ke',
      },
    },
    limit: 1,
  })

  if (existingUsers.totalDocs === 0) {
    console.log('[Payload Seed] Creating default Admin user...')
    await payload.create({
      collection: 'users',
      data: {
        name: 'Austine Administrator',
        email: 'admin@eliteinteriors.co.ke',
        password: 'AustineDesigns2026!',
        role: 'admin',
      },
    })
    console.log('[Payload Seed] Admin user created: admin@eliteinteriors.co.ke')
  } else {
    console.log('[Payload Seed] Admin user already exists.')
  }

  // 2. Seed Projects if empty
  const existingProjects = await payload.find({
    collection: 'projects',
    limit: 1,
  })

  if (existingProjects.totalDocs === 0) {
    console.log(`[Payload Seed] Seeding ${PROJECTS.length} atelier craft projects into database...`)
    let count = 0
    for (const p of PROJECTS) {
      await payload.create({
        collection: 'projects',
        data: {
          title: p.title,
          slug: p.id,
          category: p.category as any,
          craftStage: p.craftStage,
          location: p.location,
          year: p.year,
          duration: p.completionTime,
          woodSpecies: p.materials[0] || 'Selected Joinery Grade',
          description: p.description,
          materials: p.materials.map((m) => ({ spec: m })),
          imageUrl: p.image,
          isVideo: false,
          videoUrl: undefined,
          featured: Boolean(p.featured),
          displayOrder: count * 10,
        },
      })
      count++
    }
    console.log(`[Payload Seed] Successfully seeded ${count} projects.`)
  } else {
    console.log(`[Payload Seed] Projects already populated (${existingProjects.totalDocs} found).`)
  }

  // 3. Seed Initial Consultation Inquiries if file exists
  try {
    const leadsFile = path.resolve(process.cwd(), 'data/consultation_leads.json')
    if (fs.existsSync(leadsFile)) {
      const leads = JSON.parse(fs.readFileSync(leadsFile, 'utf-8'))
      const existingInquiries = await payload.find({
        collection: 'inquiries',
        limit: 1,
      })

      if (existingInquiries.totalDocs === 0 && Array.isArray(leads)) {
        console.log(`[Payload Seed] Migrating ${leads.length} consultation lead(s) into Inquiries collection...`)
        for (const lead of leads) {
          await payload.create({
            collection: 'inquiries',
            data: {
              reservationId: lead.reservationId,
              clientName: lead.client?.name || 'Prospective Client',
              clientPhone: lead.client?.phone || '0728 541 775',
              clientEmail: lead.client?.email || 'quotes@eliteinteriors.co.ke',
              location: lead.project?.location || 'Nairobi',
              projectType: lead.project?.projectType || 'General Consultation',
              budget: lead.project?.budget || 'Not specified',
              notes: lead.project?.notes || '',
              status: 'NEW_LEAD',
            },
          })
        }
        console.log('[Payload Seed] Consultation leads migrated successfully.')
      }
    }
  } catch (err) {
    console.warn('[Payload Seed] Notice during leads seed:', err)
  }

  console.log('[Payload Seed] Complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('[Payload Seed Error]:', err)
  process.exit(1)
})
