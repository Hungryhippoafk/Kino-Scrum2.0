import initApp from './src/server.js'

const app = initApp()

app.listen(5080, () => {
  console.log('Server is running on http://localhost:5080')
})
