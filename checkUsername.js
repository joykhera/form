export default async function checkUsername(client, req, res) {
    try {
        const query = await client.query("SELECT username FROM accounts WHERE username = $1;", [req.body.data.username])
        res.send(`${query.rowCount}`)
    }
    catch (error) {
        console.error(error)
        res.send(error.message)
    }
}
