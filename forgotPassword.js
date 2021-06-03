import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'turn666to999@gmail.com',
        pass: 'reset'
    }
})

export default async function checkLogin(client, req, res) {
    try {
        const query = await client.query("SELECT * FROM accounts WHERE email = $1;", [req.body.email])

        if (query.rows.length) {
            const mailOptions = {
                from: 'turn666to999@gmail.com',
                to: req.body.email,
                subject: 'JuiceWRLD.com password reset',
                text: `Hello ${query.rows[0].username}. You can reset your password by filling out this form: http://localhost:3000/resetPassword/index.html?username=${query.rows[0].username}&key=${query.rows[0].reset_key}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) console.log(error)
                else console.log('Email sent: ' + info.response);
            });
            res.send(query.rows[0].salt)
        }
        else res.send('Email not found')
    }
    catch (error) {
        console.error(error)
        res.send(error)
    }
    finally {
        client.release()
    }
}