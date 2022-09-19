const http = require('http')
const fs = require('fs')
const OUT_DIR = process.argv[2]

const server = http.createServer((request, response) => {
  let filePath
  let contentType

  if(request.url === '/data.geojson') {
    filePath = `${OUT_DIR}/data.geojson`
    contentType = 'application/json'
  } else if (request.url.match(/^\/tiles\/[0-9]+\/[0-9]+\/[0-9]+\.mvt$/)) {
    filePath = `${OUT_DIR}/${request.url}`
    contentType = 'application/vnd.mapbox-vector-tile'
  } else {
    filePath = `${OUT_DIR}/index.html`
    contentType = 'text/html'
  }

  if(fs.existsSync(filePath)) {
    response.writeHead(200, { 'Content-Type': contentType })
    fs.createReadStream(filePath).pipe(response)
  } else {
    response.writeHead(204, { 'Content-Type': contentType })
    response.end()
  }
})

console.log('listening with port 3000...')
server.listen(3000)
