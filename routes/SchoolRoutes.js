const schoolController = require("../controller/schoolController.js")

module.exports = (app) =>{
app.route("/Schools")
.get(schoolController.getAll)
.post(schoolController.createNew) //create

app.route("/Schools/:id") 

.get(schoolController.getById) // read
.put(schoolController.editById) // post
.delete(schoolController.deleteById) // delete
}