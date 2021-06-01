export default async function checkDistinct(client, req, res, property) {
    try {
        const query = await client.query(`SELECT ${property} FROM accounts WHERE email = $1;`, [req.body.data])
        res.send(`${query.rowCount}`)
    }
    catch (error) {
        console.error(error)
        res.send(error.message)
    }
    finally {
        client.release()
    }
}
