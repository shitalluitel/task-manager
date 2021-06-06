const router = require('express').Router()
const User = require('../models/user')


router.route('')
    .post(
        (request, response) => {
            const user = new User(request.body)
            user.save()
                .then(
                    (result) => {
                        response.send(user)
                    }
                )
                .catch(
                    (error) => {
                        response.status(400)
                        response.send(
                            error
                        )
                    }
                )
        }
    )

module.exports = router