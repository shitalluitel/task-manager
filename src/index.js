const express = require('express')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/api/v1', require('./routers'))

app.listen(
    port,
    () => {
        console.log('Server is up and running at port ' + port)
    }
)