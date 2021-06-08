const router = require('express').Router()
const User = require('../models/user')


router.route('')
    .post(
        async (request, response) => {
            try {
                const user = await User.create(request.body)
                const token = await user.generateAuthToken()
                response.status(201).send({user, token})
            } catch (e) {
                response.status(400).send(e)
            }
        }
    )
    .get(
        async (request, response) => {
            try {
                const users = await User.find({})
                response.status(200).send(users)
            } catch (e) {
                response.status(500).send(e)
            }
        }
    )

router.route('/login')
    .post(
        async (request, response) => {
            try {
                const user = await User.findByCredentials(
                    request.body.email,
                    request.body.password
                )

                const token = await user.generateAuthToken()
                response.send({user, token})
            } catch (e) {
                console.log(e)
                response.status(400).send(e)
            }
        }
    )

router.route('/:id')
    .get(
        async (request, response) => {
            try {
                const _id = request.params.id
                const user = await User.findById(_id)
                if (!user) {
                    return response.status(404).send(
                        {
                            message: 'No data found.'
                        }
                    )
                }
                response.status(200).send(user)
            } catch (e) {
                response.status(500).send(e)
            }
        }
    )
    .patch(
        async (request, response) => {
            const updates = Object.keys(request.body)
            const allowedUpdates = ['name', 'email', 'password', 'age']
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

            if (!isValidOperation) {
                return response.status(400).send(
                    {
                        'error': 'Invalid update fields.'
                    }
                )
            }

            try {
                const _id = request.params.id
                const data = request.body

                const user = await User.findById(_id)
                if (user) {
                    updates.forEach(
                        (update) => user[update] = data[update]
                    )
                    await user.save()
                    return response.send(user)
                }

                response.status(404).send(
                    {
                        "message": "No data found."
                    }
                )
            } catch (e) {
                response.status(400).send(e)
            }
        }
    )
    .delete(
        async (request, response) => {
            try {
                const _id = request.params.id
                const user = await User.findByIdAndRemove(_id)
                if (!user) {
                    return response.status(404).send()
                }
                response.send({
                    'message': 'Successfully deleted the user with id "' + _id + '".'
                })


            } catch (e) {
                response.status(500).send()
            }
        }
    )


module.exports = router