import createHash from './createHash.js'

export default async function resetPassword(client, req, res) {
    try {
        const hash = createHash(req.body.data.password)
        await client.query({
            text: "update accounts set password = $1, salt = $2 where username = $3;",
            values: [hash.password, hash.salt, req.body.data.username]
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