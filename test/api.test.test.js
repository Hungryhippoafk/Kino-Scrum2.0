import { expect, test, jest } from '@jest/globals'
import request from 'supertest'
import initApp from '../src/server.js'

jest.mock('../src/server.js')

test('Movies', async () => {
  const expectedMovies = [
    { id: 1, attributes: { title: 'Encanto' } },
    { id: 2, attributes: { title: 'Forrest Gump' } },
    { id: 3, attributes: { title: 'Training Day' } },
  ]

  const app = initApp()
  app.mockResolvedValue(expectedMovies)

  const response = await request(app)
    .get('https://plankton-app-xhkom.ondigitalocean.app/api/movies ')
    .expect('Content-Type', /html/)
    .expect(200)

  expectedMovies.forEach((movie) => {
    expect(response.text).toMatch(movie.attributes.title)
  })
})
