import { getPayload } from 'payload'
import config from '@payload-config'
import { PROJECTS, Project, CATEGORIES } from '@/data/projects'

/**
 * Fetches all portfolio projects from Payload CMS with graceful fallback
 * to local architectural records (src/data/projects.ts).
 */
export async function getPayloadProjects(): Promise<Project[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'projects',
      sort: 'displayOrder',
      limit: 100,
      depth: 2,
    })

    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc, idx) => {
        const mediaUrl =
          doc.imageMedia && typeof doc.imageMedia === 'object' && 'url' in doc.imageMedia
            ? (doc.imageMedia as { url?: string }).url
            : undefined

        const cat = (doc.category as any) || 'staircases'
        const catObj = CATEGORIES.find((c) => c.id === cat)

        return {
          id: doc.slug || String(doc.id),
          number: String(idx + 1).padStart(2, '0'),
          title: doc.title,
          subtitle: `${doc.location || 'Nairobi'} · ${doc.craftStage || 'Completed Work'}`,
          category: cat,
          categoryLabel: catObj ? catObj.label : 'Joinery & Renovation',
          image: mediaUrl || doc.imageUrl || '/portfolio/project-01.jpg',
          location: doc.location || 'Nairobi, Kenya',
          year: doc.year || '2026',
          area: 'Custom Commission',
          scope: 'Design, Milling, & Installation',
          completionTime: doc.duration || '2 - 3 Weeks',
          aspectRatio: 'landscape' as const,
          craftStage: (doc.craftStage as any) || 'Completed Work',
          description: doc.description,
          highlights: ['Precision Joinery', 'Architectural Grade Finishing'],
          materials: Array.isArray(doc.materials)
            ? doc.materials.map((m: any) => m.spec || '').filter(Boolean)
            : [],
          palette: [
            { name: 'Warm Timber', hex: '#8B5A2B' },
            { name: 'Brass Accents', hex: '#D4AF37' },
          ],
          featured: Boolean(doc.featured),
        }
      })
    }
  } catch (err) {
    console.warn('[Payload CMS] Falling back to local projects dataset:', err)
  }
  return PROJECTS
}
