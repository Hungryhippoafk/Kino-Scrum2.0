import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const initApp = () => {
  const app = express()
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, '../views'))

  app.use(express.static(path.join(__dirname, '../public')))
  app.use(express.urlencoded({ extended: true }))

  app.get('/', async (req, res) => {
    try {
      const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies')
      const payload = await response.json()
      const movies = payload.data

      res.render('index', { title: 'Home Page', movies })
    } catch (error) {
      console.error('Error fetching movies:', error)
      res.status(500).send('Error fetching movie data')
    }
  })

  app.get('/movies', async (req, res) => {
    try {
      const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies')
      const payload = await response.json()
      const movies = payload.data

      res.render('movies', { title: 'Movies List', movies })
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

      res.render('movie-details', { title: 'Movie Details', movie })
    } catch (error) {
      console.error('Error fetching movie details:', error)
      res.status(500).send('Error fetching movie details')
    }
  })

  app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found', message: 'Sidan hittades inte' })
  })

  return app
}

export default initApp
