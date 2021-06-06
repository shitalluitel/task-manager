const router = require('express').Router()
const User = require('../models/user')


router.route('')
    .post(
        (request, response) => {
            User.create(request.body)
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
    .get(
        (request, response) => {
            User.find({})
                .then(
                    (result) => {
                        response.send(result)
                    }
                )
                .catch(
                    (error) => {
                        response.status(400)
                        response.send(error)
                    }
                )
        }
    )


router.route('/:userID')
    .get(
        (request, response) => {
            const _id = request.params.userID
            User.findById(_id)
                .then(
                    (user) => {
                        if (!user) {
                            return response.status(404).send(
                                {
                                    'message': 'No data found.'
                                }
                            )
                        }
                        response.send(user)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                        response.status(500).send()
                    }
                )
        }
    )

module.exports = router