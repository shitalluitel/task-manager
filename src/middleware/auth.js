const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (request, response, next) => {
    try {
        const token = request.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, '1-l)r@jz4y3u@4%#q$f+pltz(w&_#+5@o4%1yzzb4h9f1g_kcz')
        const user = await User.findOne(
            {
                _id: decoded._id,
                'tokens.token': token
            }
        )

        if (!user ){
            throw new Error()
        }

        request.token = token
        request.user = user

        next()
    } catch (e) {
        response.status(401).send({error: "Unauthorized request."})
    }
}

module.exports = auth