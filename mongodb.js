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
        // db.collection('tasks').insertMany(
        //     [
        //         {
        //             title: 'task 1',
        //             completed: true
        //         },
        //         {
        //             title: 'task 2',
        //             completed: false
        //         },
        //         {
        //             title: 'task 3',
        //             completed: false
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

        // db.collection('users').findOne(
        //     {
        //         // name: 'Shital Babu Luitel'
        //         // age: 25
        //         _id: ObjectID('60b9202bf3453c528be04c51')
        //     },
        //     {},
        //     (error, user) => {
        //         if (error){
        //             return console.log(error)
        //         }
        //
        //         console.log(user)
        //     }
        // )

        // db.collection('users').find({age: 25}).toArray(
        //     (error, users) => {
        //         console.log(users)
        //     }
        // )

        db.collection('tasks').findOne(
            {
                _id: new ObjectID('60bc479e09401334beb989ce')
            },
            (error, task) => {
                if (error) {
                    return console.log(error)
                }

                console.log(task)
            }
        )

        db.collection('tasks').find(
            {
                completed: false
            }
        ).toArray(
            (error, tasks) => {
                if (error) {
                    return console.log(error)
                }

                console.log(tasks)
            }
        )

    }
)