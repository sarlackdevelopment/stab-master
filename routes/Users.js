const { Router } = require('express')
const User = require('../models/User')

const router = Router()

router.get('/getUser', async (req, res) => {
  const user = await User.find({login: 'Xenomorf1988', password: '123'})
  res.json(user)
})

router.post('/createUser', async (req, res) => {

  const user = new User({
    login: req.body.login,
    password: req.body.password
  })

  await user.save()
  res.redirect('/')
})

module.exports = router