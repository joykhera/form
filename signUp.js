import createHash from './createHash.js'

export default async function signUp(client, req, res) {
    try {
        const hash = createHash(req.body.password)
        await client.query("insert into accounts (username, email, password, created_on, salt, reset_key) values ($1, $2, $3, $4, $5, $6);", [req.body.username, req.body.email, hash.password, new Date().toISOString(), hash.salt, req.body.reset_key])
    }
    catch (error) {
        console.error(error)
        res.send(error.message)
    }
    finally {
        client.release()
        res.end()
    }
}