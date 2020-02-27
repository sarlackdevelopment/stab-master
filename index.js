const express = require('express')
const multer  = require('multer')
const mkdirp = require('mkdirp');
const bodyParser = require("body-parser");

const app = express()

//delete (app.cache)

app.use(express.static(__dirname))
//app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//console.log(__dirname)

const PORT = process.env.PORT || 8080

//const urlencodedParser = bodyParser.urlencoded({extended: false});

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

//app.get('/', (req, res) => {
  //res.sendFile('/login.html')
  //console.log('123123123')
  //response.send("<h2>Привет Express!</h2>");
//})

app.post('/login', (req, res) => {
  const user = users.find(({login, password}) => 
    login === req.body.login && password === req.body.password)

  if (user == undefined) {
    res.sendStatus(400)
  } else {
    res.sendFile('login.html', { root: __dirname })
  }

})

//app.get('/', (req, res) => res.sendFile('index.html'))

app.post('/requests', requestsUpload.any(), (req , res) => {
  res.redirect("/")
})

app.post('/responses', responsesUpload.any(), (req , res) => {
  res.redirect("/")
})

app.post('/configs', responsesСonfigs.any(), (req , res) => {
  res.redirect("/")
})

app.get('/some', (req, res) => {
    const test = require('./requests/test.json')
    res.json(test)
})