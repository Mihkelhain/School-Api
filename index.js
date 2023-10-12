const app = require('express')()
const port = 8080
const swaggerui = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = require("./docs/swagger.json");
let Timetables = require("./Timetables/data")

require("./routes/TimetableRoutes")(app)

app.get("/Schools",(req, res) => {
    res.send(schools.getAll())
})


app.get("/Timetables/:id",(req, res) => {
    const foundthing = users.getById(req.params.id)
    if (foundthing == undefined)
     {
        return res.status(404).send({error:"not found"})
    }
    res.send(foundthing)
})
//update

//delete
app.delete('/Timetables/:id',(req,res) => {
    if (games.delete(req.params-id) === "undefined") {
        return res.status(400).send({error:"The user is not found"})
    }
    res.status(204).send()
})


app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080`)
})