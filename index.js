const express = require('express')
const multer  = require('multer')
const mkdirp = require('mkdirp');

const app = express()

app.use(express.static(__dirname))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Сервер работает')
})

app.get('/', (req, res) => res.sendFile('index.html'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = 'requests'
    mkdirp(dest, (err) => {
        if (err) cb(err, dest)
        else cb(null, dest)
    })
  },
  filename: (req, file, cb) => cb(null, file.originalname)
})

app.post('/requests', multer({ storage: storage }).any(), (req , res) => {
    res.send(req.files)
    // TODO Допилить автоматический редирект на главную страницу
})

app.get('/some', (req, res) => {
    const test = require('./requests/test.json')
    res.json(test)
})