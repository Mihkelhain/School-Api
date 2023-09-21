const app = require('express')()
const port = 8080
const swaggerui = require('swagger-ui-express')
const swaggerDocument = require('./Docs/swagger.json')

app.use('/Docs'. swaggerui.Serve, swaggerui.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: Hppt://Localhost:${port}`)
})