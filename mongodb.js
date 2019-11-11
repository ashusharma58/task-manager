const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database');
        
    }
    const db = client.db(databaseName)
    
    // db.collection('users').insertOne({
    //     name: 'ashish',
    //     age: 24
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert document !');
    //     }
    //     console.log(result.ops);
  
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Deepak',
    //         age: 25
    //     },
    //     {
    //         name: 'Naveen',
    //         age: 26
    //     }
    // ], (error, result) => {
    //         if(error) return console.log('Unable to insert documents !');

    //         console.log(result.ops);
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Today I will finish Node Js mongo part',
    //         completed: false
    //     },
    //     {
    //         description: 'I need to sleep',
    //         completed: true
    //     }
    // ], (error, result) => {
    //         if(error) return console.log('Unable to insert documents!');

    //         console.log(result.ops);
            
            
    // })

    // db.collection('tasks').findMany({_id: new ObjectID("5da2476e580d2f1dd4d3401d")}).toArray( (error, users) => {
    //     if(error) return console.log('Unable to find user !');
        
    //     console.log(users);
    // })

    //**************** */ Update data*******************// 

    //  db.collection('users').updateOne(
    //     { _id: new ObjectID("5da2476e580d2f1dd4d3401d")
    // },
    // {
    //     // $set: {
    //     // name: 'Motu'
    //     // }
    //     $inc: {
    //         age: -5
    //     }
    // }).then((result) => {
    //     console.log(result);  
    // }).catch((error) => {
    //     console.log(error);
        
    // })
    // db.collection('users').updateMany({
    //     age: 24
    // }, {
    //     $inc: {
    //         age: 2
    //     }
    // }).then((result) => {
    //     console.log(result);
        
    // }).catch((error) => {
    //     console.log(error);
        
    // })

 //==============delete data=============//

 db.collection('tasks').deleteOne({
    description : "I need to sleep"
 }).then((result) => {
     console.log(result, result.deletedCount);
     
 }).catch((error) => {
     console.log(error);
     
 })
})

