import createHash from './createHash.js'

export default async function checkLogin(client, req, res) {
    try {
        const query = await client.query("SELECT * FROM accounts WHERE username = $1;", [req.body.username])
        if (createHash(req.body.password, query.rows[0].salt).password != query.rows[0].password) res.send('Incorrect Password')
    }
    catch (error) {
        console.error(error)
        res.send(error)
    }
    finally {
        client.release()
        res.end()
    }
}