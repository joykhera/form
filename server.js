import express from 'express'
import pg from 'pg'
import checkDistinct from './checkDistinct.js'
import insert from './insert.js'
import checkLogin from './checkLogin.js'
import forgotPassword from './forgotPassword.js'
import resetPassword from './resetPassword.js'

const app = express()
const port = process.env.PORT || 3000
const pool = new pg.Pool({ database: "formUsers" })
app.use(express.static('./public'))
app.use(express.json())
app.listen(port)

app.post('/signUp', async (req, res) => {
    switch (req.body.check) {
        case 'username':
            checkDistinct(await pool.connect(), req, res, 'username')
            break;

        case 'email':
            checkDistinct(await pool.connect(), req, res, 'email')
            break;

        case 'submit':
            insert(await pool.connect(), req, res)
            break;
    }
})

app.post('/logIn', async (req, res) => checkLogin(await pool.connect(), req, res))
app.post('/forgotPassword', async (req, res) => forgotPassword(await pool.connect(), req, res))
app.post('/resetPassword', async (req, res) => resetPassword(await pool.connect(), req, res))