import createHash from './createHash.js'
export default async function resetPassword(client, req, res) {
    try {
        const key = (await client.query("SELECT reset_key FROM accounts WHERE username = $1;", [req.body.formData.username])).rows[0].reset_key
        if (key == req.body.key) {
            const hash = createHash(req.body.formData.password)
            await client.query("update accounts set password = $1, salt = $2 where username = $3;", [hash.password, hash.salt, req.body.formData.username])
        }
        else res.send('Your password could not be reset because key is incorrect. Please try again')
    }
    catch (error) {
        console.error(error)
        res.send(error.message)
    }
    finally {
        await client.query("update accounts set reset_key = $1", [Math.random().toString(36).substring(2)])
        client.release()
        res.end()
    }
}