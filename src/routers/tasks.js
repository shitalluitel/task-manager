const router = require('express').Router()
const Task = require('../models/task')

router.route('')
    .post(
        (req, res) => {
            Task.create(req.body)
                .then(
                    (result) => {
                        console.log(result)
                        res.send(result)
                    }
                )
                .catch(
                    (error) => {
                        res.status(400)
                        res.send(error)
                    }
                )
        }
    )
    .get(
        (req, res) => {
            Task.find()
                .then(
                    (results) => {
                        res.send(results)
                    }
                )
                .catch(
                    (error) => {
                        res.status(400)
                        res.send(error)
                    }
                )
        }
    )

router.route('/:id')
    .get(
        (request, response) => {
            const _id = request.params.id
            Task.findById(_id)
                .then(
                    (task) => {
                        if (!task) {
                            return response.status(404).send({
                                message: 'No data found.'
                            })
                        }
                        response.send(task)
                    }
                )
                .catch(
                    (error) => {
                        response.status(500).send()
                    }
                )
        }
    )


module.exports = router