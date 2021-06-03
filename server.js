import express from 'express'
import pg from 'pg'
import checkDistinct from './checkDistinct.js'
import signUp from './signUp.js'
import checkLogin from './checkLogin.js'
import forgotPassword from './forgotPassword.js'
import resetPassword from './resetPassword.js'

const app = express()
const pool = new pg.Pool({ database: "formUsers" })
app.use(express.static('./public'))
app.use(express.json())
app.listen(process.env.PORT || 3000)

app.post('/signUp', async (req, res) => signUp(await pool.connect(), req, res))
app.post('/checkDistinct', async (req, res) => checkDistinct(await pool.connect(), req, res))
app.post('/logIn', async (req, res) => checkLogin(await pool.connect(), req, res))
app.post('/forgotPassword', async (req, res) => forgotPassword(await pool.connect(), req, res))
app.post('/resetPassword', async (req, res) => resetPassword(await pool.connect(), req, res))