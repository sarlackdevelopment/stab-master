const express = require('express')
const multer  = require('multer')
const mkdirp = require('mkdirp');
const bodyParser = require("body-parser");

const app = express()

app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Сервер работает')
})

//users = [{login: 'Volodya', password: 'pK893zcDhMYM'}]
users = [{login: 'a', password: '1'}]

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

requestsUpload = multer({ storage: createStorage('requests') })
responsesUpload = multer({ storage: createStorage('responses') })
responsesСonfigs = multer({ storage: createStorage('configs') })

app.post('/login', (req, res) => {
  const user = users.find(({login, password}) => 
    login === req.body.login && password === req.body.password)

  if (user == undefined) {
    res.redirect("/error.html")
  } else {
    res.redirect("/login.html")
  }

})

app.post('/requests', requestsUpload.any(), (req , res) => {
  res.redirect("/login.html")
})

app.post('/responses', responsesUpload.any(), (req , res) => {
  res.redirect("/login.html")
})

app.post('/configs', responsesСonfigs.any(), (req , res) => {
  res.redirect("/login.html")
})

app.get('/some', (req, res) => {
    const test = require('./requests/test.json')
    res.json(test)
})