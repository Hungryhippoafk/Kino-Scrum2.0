import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default function initApp() {
  const app = express()
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, '../views'))
  app.use(express.static(path.join(__dirname, '../public')))
  app.use(express.urlencoded({ extended: true }))

  app.get('/', (req, res) => {
    res.render('index')
  })

  app.get('/movies', async (req, res) => {
    try {
      const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies')
      const payload = await response.json()
      const movies = payload.data

      res.render('movies', { movies })
    } catch (error) {
      console.error('Error fetching movies:', error)
      res.status(500).send('Error fetching movie data')
    }
  })

  app.get('/movies/:id', async (req, res) => {
    const movieId = req.params.id

    try {
      const response = await fetch(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${movieId}`)
      const payload = await response.json()
      const movie = payload.data

      res.render('movie-details', { movie })
    } catch (error) {
      console.error('Error fetching movie details:', error)
      res.status(500).send('Error fetching movie details')
    }
  })

  app.use((req, res) => {
    res.status(404).render('404', { message: 'Sidan hittades inte' })
  })

  return app
}
