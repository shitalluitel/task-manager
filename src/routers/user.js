const router = require('express').Router()
const User = require('../models/user')
const auth = require("../middleware/auth");
const multer = require("multer");


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

router.route('/me')
    .get(
        auth,
        async (request, response) => {
            response.send(request.user)
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

router.route('/logout')
    .post(
        auth,
        async (request, response) => {
            try {
                request.user.tokens = request.user.tokens.filter(
                    (token) => {
                        return token.token !== request.token
                    }
                )

                await request.user.save()
                response.send()
            } catch (e) {
                response.status(500)
            }
        }
    )

router.route('/:id')
    .get(
        auth,
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
        auth,
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

router.route('/me')
    .delete(
        auth,
        async (request, response) => {
            try {
                // const _id = request.user._id
                // const user = await User.findByIdAndRemove(_id)
                // if (!user) {
                //     return response.status(404).send()
                // }
                await request.user.remove()
                response.send({
                    'message': 'Successfully deleted the user with id "' + request.user._id + '".'
                })


            } catch (e) {
                response.status(500).send()
            }
        }
    )

const upload = multer({
    // dest: 'media/',
    limits: {
        fileSize: 1000000
    },
    fileFilter(request, file, callback) {
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            return callback(new Error('Please upload an image.'))
        }
        callback(undefined, true)
    }
})

router.route('/me/avatar')
    .post(
        auth,
        upload.single('avatar'),
        async (request, response) => {
            try {
                request.user.avatar = request.file.buffer
                await request.user.save()
                response.send()
            } catch (e) {
               response.status(400).send()
            }
        },
        (error, request, response, next) => {
            response.status(400).send({error: error.message})
        }
    )
    .delete(
        auth,
        async (req, res) => {
            try {
                req.user.avatar = undefined
                await req.user.save()
                return res.send()
            }catch (e){
                res.status(400).send()
            }
        }
    )

router.route('/:id/avatar')
    .get(
        async (req, res) => {
            try{
                const user = await User.findById(req.params.id)
                if (!user || !user.avatar) {
                    throw new Error('unable to find avatar')
                }

                res.set('Content-Type', 'image/jpg')
                res.send(user.avatar)
            }catch (e){
                res.status(400).send({error: e})
            }
        }
    )

module.exports = router