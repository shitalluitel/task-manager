const router = require('express').Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.route('')
    .post(
        auth,
        async (req, res) => {
            try {
                const task = await Task.create({
                    ...req.body,
                    owner: req.user._id
                })
                res.status(201).send(task)
            } catch (e) {
                res.status(400).send(e)
            }
        }
    )
    .get(
        // GET /tasks?completed=(true|false)
        auth,
        async (req, res) => {
            const {completed} = req.query
            let match = {}

            if (completed) {
                match.completed = completed === 'true'
            }

            try {
                // const tasks = await Task.find({owner: req.user._id})
                await req.user.populate(
                    {
                        path: 'tasks',
                        match
                    }
                ).execPopulate() // by relationship
                res.send(req.user.tasks)
            } catch (e) {
                res.status(500).send(e)
            }
        }
    )

router.route('/:id')
    .get(
        auth,
        async (request, response) => {
            try {
                const _id = request.params.id
                const task = await Task.findOne({_id, owner: request.user._id})
                if (!task) {
                    return response.status(404).send(
                        {
                            message: 'No data found.'
                        }
                    )
                }
                response.send(task)
            } catch (e) {
                response.status(500).send(e)
            }


        }
    )
    .patch(
        auth,
        async (request, response) => {
            const updates = Object.keys(request.body)
            const availableUpdates = ['description', 'completed']
            const isAvailable = updates.every((update) => availableUpdates.includes(update))

            if (!isAvailable) {
                return response.status(400).send(
                    {
                        error: 'Invalid update fields.'
                    }
                )
            }

            try {
                const _id = request.params.id
                const task = await Task.findOne({_id, owner: request.user._id})
                if (task) {
                    updates.forEach(
                        (update) => task[update] = request.body[update]
                    )
                    await task.save()
                    return response.send(task)
                }

                return response.send(404).send(
                    {message: 'No data found.'}
                )
            } catch (e) {
                response.status(400).send(e)
            }
        }
    )
    .delete(
        auth,
        async (request, response) => {
            const _id = request.params.id
            try {
                const task = await Task.findOneAndDelete({_id, owner: request.user._id})
                if (!task) {
                    return response.status(404).send({
                        message: 'No data found.'
                    })
                }
                response.send({
                    message: 'Successfully deleted task with id \"' + _id + '\".'
                })
            } catch (e) {
                response.status(500).send()
            }
        }
    )

module.exports = router