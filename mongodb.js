const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(
    connectionURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (error, client) => {
        if (error) {
            return console.log('Unable to connect')
        }

        const db = client.db(databaseName)

        // insert one document into collection
        // db.collection('users').insertOne(
        //     {
        //         name: 'Meera Luitel',
        //         age: 25
        //     },
        //     (error, result) => {
        //         if (error){
        //             return console.log('Unable to insert user.')
        //         }
        //         console.log(result.ops)
        //     }
        // )

        // insert many documents into collection at once
        // db.collection('users').insertMany(
        //     [
        //         {
        //             name: 'Hari Maharjan',
        //             age: 25
        //         },
        //         {
        //             name: 'hari Khadka',
        //             age: 26
        //         }
        //     ],
        //     {},
        //     (error, result) => {
        //         if (error) {
        //             return console.log('Unable to insert user')
        //         }
        //         console.log(result.ops)
        //     }
        // )


        // read document from collection

    }
)