require('../src/db/mongoose')
const Task = require('../src/models/task')
const User = require('../src/models/user')

// Task.findByIdAndRemove('60bdb97b2e243a9a46dd38d1')
//     .then(
//         (task) => {
//             console.log(task)
//             return Task.countDocuments({completed: false})
//         }
//     )
//     .then(
//         (count) => {
//             console.log(count)
//         }
//     )
//     .catch(
//         (error) => {
//             console.log(error)
//         }
//     )


const deleteTaskAndCount = async (id, is_completed) => {
    const task = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({completed: is_completed})
    return count
}

deleteTaskAndCount('60bdb9872e243a9a46dd38d4', false)
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

// User.findByIdAndUpdate('', {age: 1})
//     .then(
//         (user) => {
//             return User.countDocuments({age: 1})
//         }
//     )
//     .then(
//         (count) => {
//             console.log(count)
//         }
//     )
//     .catch(
//         (error) => {
//             console.log(error)
//         }
//     )

// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, {age: age})
//     const count = await User.countDocuments({age: age})
//
//     return count
// }
//
// updateAgeAndCount('60bcb7d12efa755eedc120fa', 1)
//     .then(
//         (count) => {
//             console.log(count)
//         }
//     )
//     .catch(
//         (error) => {
//             console.log(error)
//         }
//     )