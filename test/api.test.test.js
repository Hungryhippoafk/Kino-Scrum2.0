import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import initApp from '../src/server.js'

describe('/movies', () => {
  test('movies', async () => {
    const app = initApp()

    const response = await request(app).get('/movies').expect('Content-Type', /html/).expect(200)

    expect(response.text).toMatch('Encanto')
    expect(response.text).toMatch('Training Day')
    expect(response.text).toMatch('Fire Walk With Me')
  })
})

describe('/movies/id', () => {
  test('returns movie Encanto', async () => {
    const app = initApp()

    const response = await request(app).get('/movies/2').expect('Content-Type', /html/).expect(200)

    expect(response.text).toMatch('Encanto')
  })
})
