const express = require('express')
const multer  = require('multer')
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


app.get('/getToken', (req, res) => {
  jwt.sign({ secret: Symbol() }, 'secretkey', (err, token) => res.json({ token }))
})

app.post('/login', verifyToken, (req, res) => {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      const user = users.find(({login, password}) => 
        login === req.body.login && password === req.body.password)

      if (user == undefined) {
        res.redirect("/error.html")
      } else {
        res.redirect("/login.html")
      }
    }
  })

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

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
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










/* app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'brad',
    email: 'brad@gmail.com'
  }

  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
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

} */