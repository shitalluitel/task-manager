// const add = (a, b) => {
//     return new Promise(
//         (resolve, reject) => {
//             setTimeout(
//                 () => {
//                     if (a < 0 || b < 0) {
//                         return reject('Number must be non negative.')
//                     }
//                     resolve(a + b)
//                 },
//                 2000
//             )
//         }
//     )
// }
//
// const doWork = async () => {
//     const sum = await add(2, 3) // 5
//     const sum1 = await add(sum, 5) // 10
//     const sum2 = await add(sum1, 10) // 20
//     return sum2
// }
//
// doWork()
//     .then(
//         (result) => {
//             console.log('result: ', result)
//         }
//     )
//     .catch(
//         (e) => {
//             console.log('e', e)
//         }
//     )
//

const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = 'random123'
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('random1233', hashedPassword)
    console.log(isMatch)
}

myFunction()