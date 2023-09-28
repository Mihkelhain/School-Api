const app = require('express')()
const port = 8080
const yamljs = require("yamljs")
const swaggerui = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json')
import { users } from './Users/data'
app.use('/docs', swaggerui.serve, swaggerui.setup(swaggerDocument))

app.get("/users",(req, res) => {
    res.send(users.getAll())
})

app.get("/users/:id",(req, res) => {
    const foundthing = users.getById(req.params.id)
    if (foundthing == undefined)
     {
        return res.status(404).send({error:"not found"})
    }
    res.send(foundthing)
})

app.listen(port, () => {
    console.log(`API up at: Http://Localhost:${port}`)
})