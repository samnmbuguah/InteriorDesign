import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure working directory is the application root (cPanel Passenger defaults cwd to /home/treepass)
process.chdir(__dirname)
process.env.ROOT_DIR = __dirname
process.env.DATABASE_URI = process.env.DATABASE_URI || `file:${path.resolve(__dirname, 'data/payload.db')}`
process.env.PAYLOAD_SECRET = process.env.PAYLOAD_SECRET || 'austine-interior-atelier-payload-secret-key-2026'

import { createServer } from 'http'
import next from 'next'

const dev = false
const hostname = '0.0.0.0'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      await handle(req, res)
    } catch (err) {
      console.error('Error handling request:', err)
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on port ${port} in ${__dirname}`)
    })
})
