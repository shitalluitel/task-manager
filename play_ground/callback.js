const doWorkCallBack = (callback) => {
    setTimeout(
        () => {
            // callback('This is error', undefined)
            callback(undefined, [1, 2, 3, 4])
        },
        2000
    )
}

doWorkCallBack(
    (error, result) => {
        if (error) {
            return console.log(error)
        }
        console.log(result)
    }
)