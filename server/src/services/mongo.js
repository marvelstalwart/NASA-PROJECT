require('dotenv').config()

const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL


mongoose.connection.once('open', ()=> {
    console.log('MongoDb connection ready!')
})
mongoose.connection.on('error', (err)=> {
    console.error(err)
}) 


 function mongoConnect(){

    mongoose.connect(MONGO_URL, {

        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

function mongoDisconnect() {
    mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}