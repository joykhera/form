import express from 'express'
import pg from 'pg'
import checkUsername from './checkUsername.js'
import checkEmail from './checkEmail.js'
import insert from './insert.js'
import checkLogin from './checkLogin.js'
import forgotPassword from './forgotPassword.js'
import resetPassword from './resetPassword.js'

const app = express()
const port = process.env.PORT || 3000
const pool = new pg.Pool({ database: "formUsers" })
app.use(express.static('./public'))
app.use(express.json())
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))

app.post('/', async (req, res) => {
    const client = await pool.connect()
    switch (req.body.state) {
        case 'signUp':
            switch (req.body.check) {
                case 'username':
                    checkUsername(client, req, res)
                    break;

                case 'email':
                    checkEmail(client, req, res)
                    break;

                case 'submit':
                    insert(client, req, res)
                    break;
            }
            break;

        case 'logIn':
            checkLogin(client, req, res)
            break;

        case 'forgotPassword':
            forgotPassword(client, req, res)
            break;

        case 'resetPassword':
            resetPassword(client, req, res)
            break;
    }
    client.release()
    res.end()
})