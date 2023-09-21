const app = require('express')()
const port = 8080
const swaggerui = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json')

app.use('/docs', swaggerui.serve, swaggerui.setup(swaggerDocument))

app.get("/user",(req, res) => {
    res.send([
        {id:1,name:'Bob',password:'1234',group:'GALpe20'},
        {id:2,name:'jebediah',password:'0987654321',group:'MELpe22'},
        {id:3,name:'martin',password:'b_phi<ibh',group:'TARpe21'},
        {id:4,name:'Hannes',password:'säsn',group:'TARpe21'}
    ])
}
)

app.listen(port, () => {
    console.log(`API up at: Http://Localhost:${port}`)
})