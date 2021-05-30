import createHash from './createHash.js'

export default async function insert(client, req, res) {
    try {
        const hash = createHash(req.body.data.password)
        await client.query({
            text: "insert into accounts (username, email, password, created_on, salt) values ($1, $2, $3, $4, $5);",
            values: [req.body.data.username, req.body.data.email, hash.password, new Date().toISOString(), hash.salt]
        })
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