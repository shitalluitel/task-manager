const doWorkPromise = new Promise(
    (resolve, reject) => {
        setTimeout(
            () => {
                resolve([1, 2, 3, 4])
                // reject('This is my error')
            },
            2000
        )
    }
)

doWorkPromise
    .then(
        (result) => {
            console.log('Success', result)
        }
    )
    .catch(
        (error) => {
            console.log('Error', error)
        }
    )