export default async function checkUsername(client, req, res) {
    try {
        const query = await client.query({
            text: "SELECT DISTINCT username FROM accounts WHERE username = $1;",
            values: [req.body.data]
        })
        res.send(`${query.rowCount}`)
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
