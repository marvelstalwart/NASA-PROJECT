const http = require("http");
const app = require("./app")
const {mongoConnect} = require('./services/mongo')
const planetsRouter = require("./routes/planets/planets.router")
const {loadPlanetsData} = require("./models/planets.model")
const server = http.createServer(app)
const PORT= process.env.PORT || 8000;



async function startServer() {
    mongoConnect()
    await loadPlanetsData()
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    server.listen(PORT, ()=> {
        console.log(`Listening on port ${PORT}`)
    })

}
startServer()
console.log(PORT)