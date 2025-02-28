const express = require('express')
const router = express.Router()
const  {authenticateUser} = require('../middlewares/authentication')
const {register, login, DeletingAUser, createPost, createKyc} = require('../controllers/auth.controller')

router.post('/register', register)
router.post('/login', login)
router.delete('/delete', authenticateUser, DeletingAUser)
router.post('/post', authenticateUser, createPost)
router.post('/userkyc', authenticateUser, createKyc)

module.exports = router