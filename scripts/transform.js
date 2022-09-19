let exif = null
let lat = null
let lng = null


try {
  exif = JSON.parse(process.argv[2])[0]
} catch (error) {
  console.error(error)
  process.exit(0)
}

if(!exif.GPSPosition) process.exit(0)

try {
  [lat, lng] = exif.GPSPosition.split(',').map(x => {
    const [deg, _deg_unit, min, sec] = x.trim().split(' ').map(item => parseInt(item.replace(/'"/g, ''), 10))
    const unit = (x.trim().endsWith('S') || x.trim().endsWith('W')) ? -1 : 1
    return unit * (deg + min / 60 + sec / 3600)
  })
} catch (err) {
  console.error(err)
  process.exit(0)
}


if (typeof lat === 'number' && typeof lng === 'number' && !Number.isNaN(lat) && !Number.isNaN(lng)) {
  const feature = {
    type: 'Feature',
    properties: exif,
    geometry: {
      type: 'Point',
      coordinates: [lng, lat]
    }
  }
  process.stdout.write(JSON.stringify(feature) + '\n')
  process.exit(0)
} else {
  console.error(`Invalid Input: ${filename}`)
  process.exit(0)
}

