export default async function checkEmail(client, req, res) {
    try {
        const query = await client.query("SELECT email FROM accounts WHERE email = $1;", [req.body.data])
        res.send(`${query.rowCount}`)
    }
    catch (error) {
        console.error(error)
        res.send(error.message)
    }
}
