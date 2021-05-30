export default async function checkEmail(client, req, res) {
    try {
        const query = await client.query({
            text: "SELECT DISTINCT email FROM accounts WHERE email = $1;",
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
