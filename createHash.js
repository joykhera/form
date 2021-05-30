import crypto from 'crypto'

export default function createHash(password, givenSalt) {
    const salt = givenSalt ? givenSalt : crypto.randomBytes(32).toString('hex')
    const hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    return { salt, password: hash.digest('hex') }
}