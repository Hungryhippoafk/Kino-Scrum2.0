import request from 'supertest'
import { initApp } from '../src/server.js'
const app = initApp()

describe('API Movies Tests', () => {
  it('should fetch movies successfully', async () => {
    const response = await request(app).get('/movies')
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('Encanto')
    expect(response.text).toContain('The Muppets')
    expect(response.text).toContain('Training Day')
  })

  it('should return 404 for non-existing movie endpoint', async () => {
    const response = await request(app).get('/non-existing-movies')
    expect(response.statusCode).toBe(404)
  })

  it('should handle server errors gracefully', async () => {
    const response = await request(app).get('/error-movies')
    expect(response.statusCode).toBe(500)
    expect(response.text).toContain('Error fetching movie data')
  })

  it('should fetch a specific movie by ID', async () => {
    const movieId = 1
    const response = await request(app).get(`/movies/${movieId}`)
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('Encanto')
  })

  it('should return 404 for non-existing movie ID', async () => {
    const nonExistingMovieId = 9999
    const response = await request(app).get(`/movies/${nonExistingMovieId}`)
    expect(response.statusCode).toBe(404)
  })
})

/*In this test file, we import the  initApp  function from  src/server.js  and use it to initialize the app for testing. We then write five tests: 
  
  The first test checks if the  /movies  endpoint returns a successful response with the expected movie data. 
  The second test checks if the app returns a 404 status code for a non-existing movie endpoint. 
  The third test checks if the app handles server errors gracefully. 
  The fourth test checks if the app fetches a specific movie by ID. 
  The fifth test checks if the app returns a 404 status code for a non-existing movie ID. 
  
  To run the tests, execute the following command in your terminal: 
  npm test 
  */
