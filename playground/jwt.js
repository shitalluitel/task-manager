const jwt = require('jsonwebtoken')

const myJWTFunction = async () => {
    const token = jwt.sign(
        {
            _id: 'asdf1234'
        },
        'this is a secret key',
        {
            expiresIn: '1 days'
        }
    )

    console.log(token)

    const data = jwt.verify(token, 'this is a secret key')
    console.log(data)
}

myJWTFunction()