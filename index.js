const express = require('express')
const multer = require('multer')
const mkdirp = require('mkdirp')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log('Сервер работает')
})

//users = [{login: 'Volodya', password: 'pK893zcDhMYM'}]
users = [{ login: 'a', password: '1' }]

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

//1

requestsUpload = multer({ storage: createStorage('requests') })
responsesUpload = multer({ storage: createStorage('responses') })
responsesСonfigs = multer({ storage: createStorage('configs') })

app.get('/getToken', (req, res) => {
  jwt.sign({ secret: Symbol() }, 'secretkey', (err, token) => res.json({ token }))
})

app.post('/login', verifyToken, (req, res) => {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      const user = users.find(({ login, password }) =>
        login === req.body.login && password === req.body.password)

      if (user == undefined) {
        res.redirect("/error.html")
      } else {
        res.redirect("/login.html")
      }
    }
  })

})

app.post('/responses', responsesUpload.any(), (req, res) => {
  res.redirect("/login.html")
})

app.post('/configs', responsesСonfigs.any(), (req, res) => {
  res.redirect("/login.html")
})

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

app.get('/getResponses', (req, res) => {

  try {
    const requests = require('./responses/responses.json')
    const countQuery = Object.keys(req.query).length

    const targetRequest = requests.find(elem => {
      let currentIndex = 0
      for (let param in req.query) {
        currentIndex++

        if (elem[param] !== req.query[param]) {
          return false
        } else if (currentIndex == countQuery) {
          return true
        }
      }
    })

    if (targetRequest == undefined) {
      res.json({
        'success': false,
        'data': {
          'code': -1,
          'HTTP_Status': 200,
          'text': 'По указанным параметрам не найден клиент'
        }
      }
      );
    } else {
      res.json(targetRequest)
    }

  } catch (e) {
    res.json({
      'success': false,
      'data': {
        'code': 1,
        'HTTP_Status': 500,
        'text': e.message
      }
    });
  }

})

app.get('/getConfig', (req, res) => {
  res.json(require('./configs/custom.json'))
})