require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndRemove('60bdb97b2e243a9a46dd38d1')
    .then(
        (task) => {
            console.log(task)
            return Task.countDocuments({completed: false})
        }
    )
    .then(
        (count) => {
            console.log(count)
        }
    )
    .catch(
        (error) => {
            console.log(error)
        }
    )