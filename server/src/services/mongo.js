const mongoose = require('mongoose')

const MONGO_URL = 'mongodb+srv://Marvel1206:wVgyE8Ur3MJsBtVu@cluster0.u81cr5p.mongodb.net/nasa?retryWrites=true&w=majority'


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