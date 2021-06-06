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


module.exports = router