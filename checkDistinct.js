export default async function checkDistinct(client, req, res) {
    try {
        const query = await client.query(`SELECT ${req.body.check} FROM accounts WHERE email = $1;`, [req.body.data])
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
