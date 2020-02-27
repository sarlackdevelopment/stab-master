const express = require('express')
const multer  = require('multer')
const mkdirp = require('mkdirp');

const app = express()

app.use(express.static(__dirname))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Сервер работает')
})

const createStorage = (destanation) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const dest = destanation
      mkdirp(dest, (err) => {
          if (err) cb(err, dest)
          else cb(null, dest)
      })
    },
    filename: (req, file, cb) => cb(null, file.originalname)
  })
}

/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = 'requests'
    mkdirp(dest, (err) => {
        if (err) cb(err, dest)
        else cb(null, dest)
    })
  },
  filename: (req, file, cb) => cb(null, file.originalname)
}) */

requestsUpload = multer({ storage: createStorage('requests') })
responsesUpload = multer({ storage: createStorage('responses') })

app.get('/', (req, res) => res.sendFile('index.html'))

app.post('/requests', requestsUpload.any(), (req , res) => {
  res.redirect("/")
})

app.post('/responses', responsesUpload.any(), (req , res) => {
  res.redirect("/")
})

app.get('/some', (req, res) => {
    const test = require('./requests/test.json')
    res.json(test)
})