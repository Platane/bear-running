const fs = require('fs')
const path = require('path')

const assetManifest = require('../dist/assetManifest.json')

const pathApp = assetManifest['app.js']
const pathSw = assetManifest['sw.js']
// const newPathSw = path.basename(pathSw)
const newPathSw = 'sw.js'

// replace filename in index.html
{
  const content = fs
    .readFileSync(path.resolve(__dirname, '../src/index.html'))
    .toString()
    .replace('/app.js', '/' + pathApp)

  fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), content)
  fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), content)
}

// replace filename in app.js
{
  const content = fs
    .readFileSync(path.resolve(__dirname, '../dist/' + pathApp))
    .toString()
    .replace('/sw.js', '/' + newPathSw)

  fs.writeFileSync(path.resolve(__dirname, '../dist/' + pathApp), content)
}

// // replace filename in sw.js
// {
//   const content = fs
//     .readFileSync(path.resolve(__dirname, '../dist/' + pathSw))
//     .toString()
//     .replace('/index.js', '/' + pathApp)
//
//   fs.writeFileSync(path.resolve(__dirname, '../dist/' + newPathSw), content)
// }
