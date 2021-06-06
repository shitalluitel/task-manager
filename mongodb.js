const {MongoClient, ObjectID} = require('mongodb')

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

        // db.collection('users').updateOne(
        //     {
        //         _id: new ObjectID("60b9202bf3453c528be04c50")
        //     },
        //     {
        //         $set: {
        //             name: 'Harke'
        //         }
        //     }
        // ).then(
        //     (result) => {
        //         console.log(result)
        //     }
        // ).catch(
        //     (error) => {
        //         console.log(error)
        //     }
        // )

        // db.collection('tasks').updateMany(
        //     {
        //         completed: false
        //     },
        //     {
        //         $set: {
        //             completed: true
        //         }
        //     }
        // ).then(
        //     (result)=>{
        //         console.log(result.modifiedCount)
        //     }
        // ).catch(
        //     (error) => {
        //         console.log(error)
        //     }
        // )


    }
)