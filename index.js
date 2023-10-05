const app = require('express')()
const port = 8080
const swaggerui = require('swagger-ui-express')
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml")
const users = require("./Users/data")
const schools = require("./Schools/data")
app.use('/docs', swaggerui.serve, swaggerui.setup(swaggerDocument))

require("./routes/userRoutes")(app)

app.get("/Schools",(req, res) => {
    res.send(schools.getAll())
})


app.get("/users/:id",(req, res) => {
    const foundthing = users.getById(req.params.id)
    if (foundthing == undefined)
     {
        return res.status(404).send({error:"not found"})
    }
    res.send(foundthing)
})
//update

//delete
app.delete('/users/:id',(req,res) => {
    if (games.delete(req.params-id) === "undefined") {
        return res.status(400).send({error:"The user is not found"})
    }
    res.status(204).send()
})


app.listen(port, () => {
    console.log(`API up at: Http://Localhost:${port}`)
})


