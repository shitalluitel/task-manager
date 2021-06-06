const router = require('express').Router()
const Task = require('../models/task')

router.route('')
    .post(
        (req, res) => {
            const task = new Task(req.body)
            task.save()
                .then(
                    (result) => {
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


module.exports = router