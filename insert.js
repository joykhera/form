import createHash from './createHash.js'

export default async function insert(client, req, res) {
    try {
        const hash = createHash(req.body.data.password)
        await client.query("insert into accounts (username, email, password, created_on, salt) values ($1, $2, $3, $4, $5);", [req.body.data.username, req.body.data.email, hash.password, new Date().toISOString(), hash.salt])
    }
    catch (error) {
        console.error(error)
        res.send(error.message)
    }
    finally {
        client.release()
    }
}