const express = require('express')
const app = express()

app.use(express.json())

const mongodb = require('mongodb').MongoClient

let db

mongodb.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected successfully');
        db = client.db('emp')
    }
})

app.get('/emp', (req, res) => {
    db.collection('empl').find().toArray((err, items) => {
        if (err) {
            res.status(404).send('Database not identified')
        }
        res.send(items)
    })
})

app.post('/empAdd', (req, res) => {
    db.collection('empl').insertOne(req.body)
    console.log('Inserted');
    res.end()
})

app.put('/empUpd/:id', (req, res) => {
    let id = req.params.id
    let name = req.body.name

    db.collection('empl').updateOne({ "_id": id }, { $set: { "name": name} })
    console.log('Updated');
    res.end()
})

app.delete('/empDel/:id', (req, res)=>{
    let id = req.params.id
    db.collection('empl').remove({"_id" : id})
    console.log('Deleted');
    res.end()
})

app.listen(4321, () => {
    console.log('Server listening at 1234');
})