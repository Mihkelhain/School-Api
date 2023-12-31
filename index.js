require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT
const swaggerui = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerDocument))
app.use("/client", express.static("frontend"))

require("./routes/LessonRoutes")(app)
require("./routes/GroupRoutes")(app)
require("./routes/GroupLessonsRoutes")(app)
require("./routes/userRoutes")(app)
require("./routes/SchoolRoutes")(app)
require("./routes/UserSchoolRoutes")(app)
app.listen(port, () => {
    require("./db").sync()
        .then(console.log("Synchronized"))
        .catch((error) => console.log("Error:", error))
    console.log(`API up at: http://localhost:${port}/docs`);
    console.log(`API up at: http://localhost:${port}/client`);
}) 



